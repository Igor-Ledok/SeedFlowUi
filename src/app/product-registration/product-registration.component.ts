import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../services/language.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { CreatePurchasedOrderDto } from '../models/shop/create/create-purchased-order-dto';
import { ShopService } from '../services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-registration',
  imports: 
  [
    CommonModule, 
    RouterModule,
    TranslocoModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    // ReactiveFormsModule,
    MatSlideToggleModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './product-registration.component.html',
  styleUrl: './product-registration.component.scss'
})
export class ProductRegistrationComponent {
  public name: string = '';
  public lastName: string = '';
  public phoneNumber: string;
  public email: string;
  public consent: string;

  public deliveryCountry: string;
  public deliveryLocation: string;
  public deliveryMethod: string;
  public deliveryInformation: string;
  public paymentMethod: string;

  public nameError: string;
  public lastNameError: string;
  public phoneNumberError: string;
  public emailError: string;
  public consentError: string;

  public deliveryCountryError: string;
  public deliveryLocationError: string;
  public deliveryMethodError: string;
  public deliveryInformationError: string;
  public paymentMethodError: string;


  public cardNumber: string;
  public cardNumberError: string;
  
  public expiry: string;
  public expiryError: string;
  
  public cvv: string;
  public cvvError: string;


  selectedDeliveryOption: number;
  selectedPaymentOption: number | null = null;
  paymentOptions = [
    { name: 'Карткою на сайті' },
    { name: 'Післяплата' },
    { name: 'Pay' }
  ];

  // Опции доставки
  deliveryOptions = [
    { name: 'Відділення Нова Пошта', placeholder: 'Введіть відділення' },
    { name: 'Поштомат Нова Пошта', placeholder: 'Введіть поштомат' },
    { name: 'Відділення Укрпошта', placeholder: 'Введіть відділення' },
    { name: 'Відділення Meest ПОШТА', placeholder: 'Введіть відділення' },
    { name: 'Кур\'єр Нова Пошта', placeholder: 'Введіть адресу' },
    { name: 'Кур\'єр Укрпошта', placeholder: 'Введіть адресу' },
    { name: 'Кур\'єр Meest ПОШТА', placeholder: 'Введіть адресу' }
  ];

  

previewURLs: string[] = []; // Список загруженных фото
    activeButtonIndex: number = -1;
    activeStartupButtonIndex: number = -1;
    activeSocialButtonIndex: number = -1;
    activeHumanitarianButtonIndex: number = -1;
    activeCategoryIndex: number = -1;
      
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
      
        startupButtons = [
          { label: 'Освіта', index: 0 },
          { label: 'Культура', index: 1 },
          { label: 'Медицина', index: 2 },
          { label: 'Харчування', index: 3 },
          { label: 'Транспорт', index: 4 },
          { label: 'Музика', index: 5 },
          { label: 'Література', index: 6 },
          { label: 'Кіно', index: 7 },
          { label: 'Дизайн', index: 8 },
          { label: 'Медіа', index: 9 },
          { label: 'Діти', index: 10 },
          { label: 'Технології', index: 11 }
        ];
      
        socialButtons = [
          { label: 'Музика', index: 0 },
          { label: 'Література', index: 1 },
          { label: 'Кіно', index: 2 },
          { label: 'Дизайн', index: 3 },
          { label: 'Медіа', index: 4 }
        ];
      
        humanitarianButtons = [
          { label: 'Діти', index: 0 },
          { label: 'Технології', index: 1 },
          { label: 'Наука', index: 2 },
          { label: 'Медицина', index: 3 }
        ];
      
        startupRows = [
          this.startupButtons.slice(0, 5),
          this.startupButtons.slice(5, 9),
          this.startupButtons.slice(9, 12),
        ];
      
        tabs = [
          { key: 'general', label: 'ЗАГАЛЬНЕ' },
          { key: 'details', label: 'ДЕТАЛІ' },
          { key: 'team', label: 'КОМАНДА' },
          { key: 'rewards', label: 'ВИНАГОРОДИ' },
          { key: 'requisites', label: 'РЕКВІЗИТИ' },
          { key: 'uploads', label: 'ВИКЛАСТИ' }
        ];
      
        socialRows = [this.socialButtons];
      
        activeTab: string = '';
      
        humanitarianRows = [this.humanitarianButtons]; 
      
        onCategoryButtonPress(index: number): void {
          this.activeCategoryIndex = index;
          this.activeStartupButtonIndex = -1;
          this.activeSocialButtonIndex = -1;
          this.activeHumanitarianButtonIndex = -1;
        }
        
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
      
        onButtonPress(category: string, index: number): void 
        {
          if (category === 'startup') 
          {
            this.activeStartupButtonIndex = index;
          } 
          else if (category === 'social') 
          {
            this.activeSocialButtonIndex = index;
          } 
          else if (category === 'humanitarian') 
          {
            this.activeHumanitarianButtonIndex = index;
          }
      }
      
      searchText = '';
      showDropdown = false;
      
      items = [
        { title: 'Врятуймо степового лисицю', description: 'Збір на порятунок лисиці', image: 'assets/images/photo1.png', progress: 45, value1: 25, value2: 36, value3: 25 },
        { title: 'Зливи не вщухають', description: 'Допомога постраждалим', image: 'assets/images/startups.png', progress: 45, value1: 25, value2: 36, value3: 25 },
        { title: 'Майстерня "Гуцульськ"', description: 'Розвиток творчих майстерень', image: 'assets/images/ventureCapital.png', progress: 45, value1: 25, value2: 36, value3: 25 }
      ];
      
      filteredItems = this.items;
      
        filterResults() {
          if (this.searchText.trim() === '') {
            this.filteredItems = this.items;
          } else {
            this.filteredItems = this.items.filter(item =>
              item.title.toLowerCase().includes(this.searchText.toLowerCase())
            );
          }
        }
      
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

        partnerLogos = [
          { src: 'assets/images/workua.png', alt: 'WORK.ua' },
          { src: 'assets/images/psbusinessparks.png', alt: 'PS Business Parks' },
          { src: 'assets/images/monobank.png', alt: 'Monobank' },
          { src: 'assets/images/forbes.png', alt: 'Forbes' },
          { src: 'assets/images/linkedin.png', alt: 'LinkedIn' },
          { src: 'assets/images/sportmaster.png', alt: 'Спортмастер' },
        ];

        projects2 = [
          {
            title: 'Кафе «Коло мене»',
            image: 'assets/images/ventureCapital.png',
            amountRaised: 135420,
            goal: 500000,
            progress: this.getProgress,
          },
          {
            title: 'Врятуймо степову лисицю',
            image: 'assets/images/womenBusiness.png',
            amountRaised: 135420,
            goal: 500000,
            progress: this.getProgress,
          },
          {
            title: 'Зливи не вщухають',
            image: 'assets/images/startups.png',
            amountRaised: 135420,
            goal: 500000,
            progress: this.getProgress,
          },
          {
            title: 'Кафе «Коло мене»',
            image: 'assets/images/ventureCapital.png',
            amountRaised: 135420,
            goal: 500000,
            progress: this.getProgress,
          },
          {
            title: 'Врятуймо степову лисицю',
            image: 'assets/images/womenBusiness.png',
            amountRaised: 135420,
            goal: 500000,
            progress: this.getProgress,
          }
        ];

        projects3 = [
          {
            title: 'Кафе «Коло мене»',
            image: 'assets/images/ventureCapital.png',
            amountRaised: 135420,
            goal: 500000,
            progress: this.getProgress,
          },
          {
            title: 'Врятуймо степову лисицю',
            image: 'assets/images/womenBusiness.png',
            amountRaised: 135420,
            goal: 500000,
            progress: this.getProgress,
          }
        ];
            
        likedProjects: boolean[] = new Array(this.projects2.length).fill(false);

        toggleLike(index: number): void {
          this.likedProjects[index] = !this.likedProjects[index];
        }

        getProgress(project: any) {
          return (project.amountRaised / project.goal) * 100 + '%';
        }
      
        constructor(
          private route: ActivatedRoute,
          private eRef: ElementRef,
          private languageService: LanguageService,
          private shopService: ShopService,
          private router: Router
         ) 
         {

         }
      
        ngOnInit() 
        {
          this.route.url.subscribe(urlSegments => {
            this.activeTab = urlSegments.length > 1 ? urlSegments[1].path : 'general';
          });
      
          const savedLanguage = localStorage.getItem('selectedLanguage') ||'ua'; 
          this.selectedLanguage.setValue(savedLanguage);
          this.onLanguageChange({ value: savedLanguage });
        }

        selectedDeliveryMethod: string | null = null; // Изначально ничего не выбрано 

        selectedPaymentMethod: string = '';

        totalAmount: number = 1719;  // Это значение "Всього"
        inputAmount: number = 0;  // Значение, которое вводится
        finalAmount: number = this.totalAmount;  // Начальный расчет "До сплати"
      
        // Метод для вычисления разницы
        updatePayment(): void {
          this.finalAmount = this.totalAmount - this.inputAmount;
        }

  sendForm() {
    console.log('Имя в форме:', this.name);  // Это нужно для диагностики 

    let isCorect: boolean = true;

    if (!this.name) {         // name
      this.nameError = "Обов'язкове поле";
      isCorect = false;
    } else {  this.nameError = ""; }

    if (!this.lastName) {     // lastName
      this.lastNameError = "Обов'язкове поле"
      isCorect = false;
    }else { this.lastNameError = ""; }

    if (!this.phoneNumber) {  // phoneNumber
      this.phoneNumberError = "Обов'язкове поле";
      isCorect = false;
    } else { this.phoneNumberError = ""; }

    if (!this.email) {        // email
      this.emailError = "Обов'язкове поле"
      isCorect = false;
    }else { this.emailError = ""; }

    if (!this.consent) {      // consent
      this.consentError = "Обов'язкове поле"
      isCorect = false;
    }else { this.consentError = ""; }



    if (!this.deliveryCountry){
      this.deliveryCountryError = "Обов'язкове поле";
      isCorect = false;
    } else { this.deliveryCountryError = "";}

    if (!this.deliveryLocation){
      this.deliveryLocationError = "Обов'язкове поле";
      isCorect = false;
    } else { this.deliveryLocationError = "";}

    if (!this.deliveryCountry){
      this.deliveryCountryError = "Обов'язкове поле";
      isCorect = false;
    } else { this.deliveryCountryError = "";}

    if (!this.deliveryCountry){
      this.deliveryCountryError = "Обов'язкове поле";
      isCorect = false;
    } else { this.deliveryCountryError = "";}



    if (!this.deliveryCountry){
      this.deliveryCountryError = "Обов'язкове поле";
      isCorect = false;
    } else { this.deliveryCountryError = "";}

    if (!this.deliveryLocation){
      this.deliveryLocationError = "Обов'язкове поле";
      isCorect = false;
    } else { this.deliveryLocationError = "";}

    if (!this.deliveryInformation)  {
      this.deliveryMethodError = "Виберіть спосіб доставки";
      isCorect = false;
    } else if (!this.deliveryMethod ) {
      this.deliveryMethodError = "Обов'язкове поле";
      isCorect = false;
    } else {  this.deliveryMethodError = ""; }

    

    if (!this.paymentMethod) {
      this.paymentMethodError = "Оберіть спосіб оплати";
      isCorect = false;
    } else {
      this.paymentMethodError = "";
    }
  
    // Если выбрана "Картой на сайте", проверяем карточку
    if (this.paymentMethod === 'Карткою на сайті') {
      if (!this.cardNumber) {
        this.cardNumberError = "Вкажіть номер картки";
        isCorect = false;
      } else {
        this.cardNumberError = "";
      }
  
      if (!this.expiry) {
        this.expiryError = "Вкажіть срок дії";
        isCorect = false;
      } else {
        this.expiryError = "";
      }
  
      if (!this.cvv) {
        this.cvvError = "Введіть CVV код";
        isCorect = false;
      } else {
        this.cvvError = "";
      }
    } else {
      this.cardNumberError = "";
      this.expiryError = "";
      this.cvvError = "";
    }

    if( isCorect){
      const data: CreatePurchasedOrderDto = {
        buyerId: "",
        firstName: this.name,
        totalPrice: 0,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        deliveryCountry: this.deliveryCountry,
        paymentMethod: this.paymentMethod,
        deliveryMethod: this.deliveryMethod,
        deliveryInformation: this.deliveryInformation,
        paymentType: this.paymentMethod,
        useBonus: false,
        purchasedProducts: [] 
      };
      console.log('Данные для отправки на сервер:', data);
      
      this.shopService.createPurchaseFromLocalStorage(data).subscribe({
        next: (orderId) => {
          console.log('Заказ успешно создан! ID заказа:', orderId);
          this.router.navigate(['/shop-success-page']);
        },
        error: (error) => {
          console.error('Ошибка при создании заказа:', error);
        }
      });
    }
  }

  validName(){
    if (!this.name) {         // name
      this.nameError = "Обов'язкове поле";
    } else {  this.nameError = ""; }
  }
  validLastName(){
        if (!this.lastName) {     // lastName
      this.lastNameError = "Обов'язкове поле"
    }else { this.lastNameError = ""; }
  }
  validPhoneNumber(){
        if (!this.phoneNumber) {  // phoneNumber
      this.phoneNumberError = "Обов'язкове поле";
    } else { this.phoneNumberError = ""; }
  }
  validEmail(){
        if (!this.email) {        // email
      this.emailError = "Обов'язкове поле"
    }else { this.emailError = ""; }
  }
  validConsent(){
        if (!this.consent) {      // consent
      this.consentError = "Обов'язкове поле"
    }else { this.consentError = ""; }
  }
  
  validDeliveryCountry(){
    if (!this.deliveryCountry){
      this.deliveryCountryError = "Обов'язкове поле";
    } else { this.deliveryCountryError = "";}
  }
  validDeliveryLocation(){
    if (!this.deliveryLocation){
      this.deliveryLocationError = "Обов'язкове поле";
    } else { this.deliveryLocationError = "";}
  }
  validDeliveryInformation(){
    if (!this.deliveryMethod )  {
      this.deliveryMethodError = "Виберіть спосіб доставки";
    } else if (!this.deliveryInformation ) {
      this.deliveryMethodError = "Обов'язкове поле";
    } else {  this.deliveryMethodError = ""; }

  }
  validPaymentMethod(){
    if (!this.paymentMethod) {
      this.paymentMethodError = "Оберіть спосіб оплати";
    } else {
      this.paymentMethodError = "";
    }
  }
  validPaymentMethod2(){
    if (this.paymentMethod === 'Карткою на сайті') {
      if (!this.cardNumber) {
        this.cardNumberError = "Вкажіть номер картки";
      } else {
        this.cardNumberError = "";
      }
    } else {
      this.cardNumberError = "";
      this.expiryError = "";
      this.cvvError = "";
    }
  }

  validPaymentMethod3(){
    if (this.paymentMethod === 'Карткою на сайті') {
      if (!this.expiry) {
        this.expiryError = "Вкажіть срок дії";
      } else {
        this.expiryError = "";
      }
    } else {
      this.cardNumberError = "";
      this.expiryError = "";
      this.cvvError = "";
    }
  }

  validPaymentMethod4(){
    if (this.paymentMethod === 'Карткою на сайті') {
      if (!this.cvv) {
        this.cvvError = "Введіть CVV код";
      } else {
        this.cvvError = "";
      }
    } else {
      this.cardNumberError = "";
      this.expiryError = "";
      this.cvvError = "";
    }
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
