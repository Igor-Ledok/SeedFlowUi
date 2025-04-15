import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../services/language.service';
import {MatRadioModule} from '@angular/material/radio';
import { ProjectList } from '../models/project/project-list-data';
import { ProjectService } from '../services/project.service';
import { UserInfo, UserService } from '../services/user.service';

@Component({
  selector: 'app-donation',
  imports: [
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    NgFor,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslocoModule,
    MatRadioModule
],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.scss'
})
export class DonationComponent 
{
  selectedAmount: number | null = null;
  customAmount: number | null = null;
  selectedPaymentMethod: string = '';
  isButtonActive = false;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  cardNumber: string = '';
  expiry: string = '';
  cvv: string = ''

  acaunt: UserInfo = null;
  
  amount: number = 0;
  paymentMethod: string = 'gpay';
  hideName: boolean = false;
  subscribe: boolean = false;

  project: ProjectList = null;

  selectedLanguage = new FormControl('ua');

  someString:string = 'UA';

  languages = [
    {code: 'en', name: "EN"},
    {code: 'ua', name: "UA"}
  ];

  payButtonText: string;
  
  constructor(
    private languageService: LanguageService, 
    private cdr: ChangeDetectorRef,
    private eRef: ElementRef,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService
  )
  {

  }

  previewURLs: string[] = []; // Список загруженных фото
    activeButtonIndex: number = -1;
    activeStartupButtonIndex: number = -1;
    activeSocialButtonIndex: number = -1;
    activeHumanitarianButtonIndex: number = -1;
    activeCategoryIndex: number = -1;
  
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
    
    isButtonActive2: boolean[] = [false, false, false];
  
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
    { 
      title: 'Врятуймо степового лисицю', 
      description: 'Збір на порятунок лисиці', 
      image: 'assets/images/photo1.png',
      topLeftImage: 'assets/images/rocketBig.png', 
      progress: 45, 
      value1: 25,
      value2: 36, 
      value3: 25 
    },
    { 
      title: 'Зливи не вщухають', 
      description: 'Допомога постраждалим', 
      image: 'assets/images/startups.png',
      topLeftImage: 'assets/images/socialBig.png', 
      progress: 45, 
      value1: 25, 
      value2: 36, 
      value3: 25 
    },
    { 
      title: 'Майстерня «Гуцульськ»', 
      description: 'Розвиток творчих майстерень', 
      image: 'assets/images/ventureCapital.png',
      topLeftImage: 'assets/images/HumanitarianBig.png', 
      progress: 45,
      value1: 25, 
      value2: 36, 
      value3: 25 
    }
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
  

  onSubmit(form: any): void 
  {
    if (form.valid) 
    {
      console.log('Форма отправлена!', form.value);
    } 
    else 
    {
      console.log('Форма невалидна');
    }
  }

  get isAmountSelected(): boolean 
  {
    return this.selectedAmount !== null || !!this.customAmount;
  }

  get isCardFormValid(): boolean 
  {
    return this.firstName && this.firstName.length >= 2 && this.lastName && this.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) && this.cardNumber && this.expiry && this.cvv && 
           /^[\d]{16}$/.test(this.cardNumber) && 
           /^\d{2}\/\d{2}$/.test(this.expiry) && 
           /^[\d]{3}$/.test(this.cvv);
  }

   get isPayButtonEnabled(): boolean 
   {
    if (!this.isAmountSelected) return false;
    if (this.selectedPaymentMethod === '1') return true;
    if (this.selectedPaymentMethod === '2') return this.isCardFormValid;
    return false;
  }

   setAmount(amount: number) 
   {
    this.selectedAmount = amount;
    this.customAmount = null;
    this.updateButtonState();
   }

  onCustomAmountChange(event: any) 
  {
    this.customAmount = event.target.value ? parseFloat(event.target.value) : null;
    this.selectedAmount = null; 
    console.log('Custom amount:', this.customAmount);
    this.checkButtonStatus();
  }

  checkButtonStatus()
  {
    this.isButtonActive = !!(this.selectedAmount || this.customAmount) && !!this.selectedPaymentMethod;
  }

  onPaymentMethodChange(event: any) 
  { 
    setTimeout(() => {
      this.selectedPaymentMethod = event.value;
    }, 0);  

    this.selectedPaymentMethod = event.value;
    console.log('Selected payment method:', this.selectedPaymentMethod);
    this.cdr.detectChanges();
    this.updateButtonState();
  }

  updateButtonState() 
  {
    this.isButtonActive = this.isPayButtonEnabled;
    this.cdr.detectChanges();
  }

  isPayDisabled(): boolean 
  {
    return !this.selectedAmount || !this.selectedPaymentMethod;  
  }

  onPayClick() 
  {
    console.log('Pay clicked');
    if (!this.selectedAmount) 
    {
      console.log('Amount not selected');
    }
  }

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

  isGridView = true;
  currentIndex = 0;
  totalSlides = 0;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const projectId = params['projectId'];
      if (projectId) {
        this.projectService.getProjectById(projectId).subscribe(project => {
          this.project = project;
        });
      }
    });

  this.userService.getUserInfo().subscribe(response => {
    this.acaunt = response.user;
    console.log(this.acaunt);
  });
  
    this.checkScreenSize();
    this.likedProjects = new Array(this.filteredItems.length).fill(false);
    this.totalSlides = this.filteredItems.length; // Инициализация общего количества слайдов
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isGridView = window.innerWidth > 1350;
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    else {
      this.currentIndex = this.totalSlides - 1; // Переход на последний слайд
    }
  }

  nextSlide() {
    if (this.currentIndex < this.filteredItems.length - 1) {
      this.currentIndex++;
    }
    else {
      this.currentIndex = 0; // Возвращаемся к первому слайду
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  isWindowOpen: boolean = false; // Флаг для управления состоянием окна
  
  openWindow() {
    this.isWindowOpen = true; // Открытие окна
  }

  closeWindow() {
    this.isWindowOpen = false; // Закрытие окна
  }

   // Пример метода для обработки клика по кнопке
   onButtonClick(buttonName: string) {
    console.log(`Клик по кнопке: ${buttonName}`);
    // Здесь можете добавить логику для каждой кнопки
  }

  // Открытие выпадающего меню
  openDropdown() {
    this.showDropdown = true;
  }

  // Закрытие выпадающего меню
  closeDropdown() {
    this.showDropdown = false;
  }


  likedProjects: boolean[] = new Array(this.filteredItems.length).fill(false);
  isHoveredArray: boolean[] = new Array(this.filteredItems.length).fill(false);

  isSocialMediaListVisible: boolean[] = []; // Массив для отслеживания видимости списка

  toggleSocialMediaList(index: number) {
    this.isSocialMediaListVisible[index] = !this.isSocialMediaListVisible[index];
  }

  toggleLike(index: number): void {
    this.likedProjects[index] = !this.likedProjects[index];
  }
}