import { CommonModule, NgFor } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../services/language.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { UserInfo, UserService } from '../services/user.service';
import { ShopService } from '../services/shop.service';
import { ReturnProductDto } from '../models/shop/return/return-product-dto';
import { ReturnProductListDto } from '../models/shop/return/return-product-list-dto';

@Component({
  selector: 'app-basket',
  imports: 
  [
    MatSelectModule,
    FormsModule,
    CommonModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    NgFor,
    ReactiveFormsModule,
    RouterModule,
    TranslocoModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  previewURLs: string[] = []; 
  activeButtonIndex: number = -1;
  activeStartupButtonIndex: number = -1;
  activeSocialButtonIndex: number = -1;
  activeHumanitarianButtonIndex: number = -1;
  activeCategoryIndex: number = -1;
  
  public userInfo: UserInfo; // информацыя человека для бонусов
  public sum: number; // общяя сума
  public products: ReturnProductListDto[] = []; // список покупок
  public cartItems: { product: ReturnProductDto; quantity: number }[] = [];
  public totalSum: number = 0;
  public useBonuses: boolean = false;
  useBonus: boolean = false;
  finalAmount: number = 0;
        
  someString:string = 'UA';

  selectedLanguage = new FormControl('ua');
  
  languages = [
    {code: 'en', name: "EN"},
    {code: 'ua', name: "UA"}
  ];

  onLanguageChange(event: any) 
  {
    const selectedLang = event.value;
    if (selectedLang === 'ua') 
    {
      this.switchLanguage('en');
      this.someString = 'EN';
    } 
    else if (selectedLang === 'en') 
    {
      this.switchLanguage('uk');
      this.someString = 'UA';
    }
  }

  switchLanguage(language: string) 
  {
    this.languageService.switchLanguage(language);
  }

 
  activeTab: string = '';
  
  isButtonActive: boolean[] = [false, false, false];

  getDropdownHeight() 
  {
    if (this.activeButtonIndex === 1) 
      {
      return '680px';
    }
    else if(this.activeButtonIndex === 2)
    {
      return '680px';
    }
    
    return 'auto';
  }
  
  showDropdown = false;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const searchContainer = this.eRef.nativeElement.querySelector('.search-container');
    const searchInput = this.eRef.nativeElement.querySelector('.search-input');
    
    if (!searchContainer.contains(event.target)) 
    {
      this.showDropdown = false;
      searchInput.blur();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) 
  {
    this.showDropdown = false;
  }


  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private eRef: ElementRef,
    private languageService: LanguageService,
    private userService: UserService,
    private router: Router
  ) {}
        
  ngOnInit() 
  {
    this.userService.getUserInfo().subscribe(
      (response: { user: UserInfo }) => {
        this.userInfo = response.user;
        console.log(this.userInfo);
      },
      (error: any) => {
        console.error('Ошибка загрузки информации о пользователе', error);    
      }
    );

    this.route.url.subscribe(urlSegments => {
      this.activeTab = urlSegments.length > 1 ? urlSegments[1].path : 'general';
    });

    const savedLanguage = localStorage.getItem('selectedLanguage') ||'ua'; 
    this.selectedLanguage.setValue(savedLanguage);
    this.onLanguageChange({ value: savedLanguage });

    this.loadCart();

    
  }

  loadCart(): void {
    const items = this.shopService.getCart(); // получаем корзину из localStorage
  
    this.cartItems = [];
    this.totalSum = 0;
  
    if (!items || items.length === 0) {
      return;
    }
  
    const requests = items.map(item =>
      this.shopService.getProductById(item.productId).toPromise()
        .then(product => {
          this.cartItems.push({ product, quantity: item.quantity });
          this.totalSum += product.price * item.quantity;
          this.updateSum();
          this.updatePayment();
        })
        .catch(err => {
          console.error(`Ошибка загрузки товара с id ${item.productId}`, err);
        })
    );
  
    Promise.all(requests).then(() => {
      // Можешь сюда вставить обновление UI, если потребуется
    });
  }

  updateSum(): void {
    this.sum = this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }
  
  
  updateQuantity(productId: string, newQuantity: number): void {
    const item = this.cartItems.find(i => i.product.id === productId);
  
    if (item) {
      // Получаем максимальное количество из товара
      const maxQuantity = item.product.quantity;
  
      // Проверяем, чтобы новое количество было валидным
      if (newQuantity < 1 || newQuantity > maxQuantity) return;
  
      // Обновляем количество товара в корзине
      item.quantity = newQuantity;
  
      // Обновляем корзину
      this.shopService.addToCart(productId, newQuantity);
      
      // Перерасчитываем итоговую сумму
      
      this.updateSum();
      this.updatePayment();
      this.calculateTotal();
    }
  }
  
  removeItem(productId: string): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.shopService.removeFromCart(productId);
    this.updateSum();
    this.updatePayment();
    this.calculateTotal();
  }
  
  calculateTotal(): void {
    this.totalSum = this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }
  
          
  quantity: number = 1; 
  maxQuantity: number = 100;


  increaseQuantity() {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
    }
  }

  decreaseQuantity() 
  {
    if (this.quantity > 1) 
    {   
      this.quantity--;
    }
  }

  currentIndex3 = 0;

  images3 = [
    {
      src: 'assets/images/ShopTovar4.png',
      title: 'Чашка Seed Flow',
      description: '450 мл',
      amount: '300 грн',
    },
    {
      src: 'assets/images/ShopTovar5.png',
      title: 'Чашка Seed Flow',
      description: '550 мл',
      amount: '550 грн',
    }
  ];

  get currentImage3() 
  {
    return this.images3[this.currentIndex3];
  }

  changeImage3(direction: string) {
    if (direction === 'left') {
      this.currentIndex3 = this.currentIndex3 === 0 ? this.images3.length - 1 : this.currentIndex3 - 1;
    } else {
      this.currentIndex3 = this.currentIndex3 === this.images3.length - 1 ? 0 : this.currentIndex3 + 1;
    }
  }

  setImage3(index: number) {
    this.currentIndex3 = index;
  }


  totalAmount: number = 1719;  
  inputAmount: number = 0; 

  updatePayment(): void {
    this.shopService.setUseBonus(this.useBonus);

    const discount = this.useBonus ? this.userInfo?.bonusCoin || 0 : 0;
    this.finalAmount = Math.max(0, this.sum - discount);
  }


toggleBonuses(): void {
  this.inputAmount = this.useBonuses ? this.sum : 0;
  this.updatePayment();
}

goToCart(): void 
{
  this.shopService.setUseBonus(this.useBonus);
  this.shopService.setTotalPrice(this.totalSum);
  this.router.navigate(['/product-registration-page']);
}

continueShopping(): void 
{

  this.router.navigate(['/shop-main-page-page']);
}

scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

activeIndex: number | null = null;

images4 = [
  { gray: 'assets/images/projects.png', active: 'assets/images/projectsGray.png', link: '/projects-list-page' },
  { gray: 'assets/images/aboutUs.png', active: 'assets/images/infoGray.png', link: '/about-us-page' },
  { gray: 'assets/images/account.png', active: 'assets/images/accountGray.png', link: '/profile-page' },
  { gray: 'assets/images/help.png', active: 'assets/images/helpGray.png', link: '/support-page' },
  { gray: 'assets/images/shop.png', active: 'assets/images/shopGray.png', link: '/shop-main-page-page' }
];

onImageClick(link: string): void {
  this.router.navigate([link]);
}

}
