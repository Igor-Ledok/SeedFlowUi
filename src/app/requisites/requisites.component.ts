import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { LanguageService } from '../services/language.service';
import { ProjectService } from '../services/project.service';
import { requisites } from '../models/project/requisites.interface';
import { edrpouOrIpnValidator } from '../validators';
import { cityNameValidator } from '../validator2';
import { ibanValidator } from '../validator3';
import { bankNameValidator } from '../validator4';
import { mfoValidator } from '../validator5';
import { signatoryValidator } from '../validator6';
import { contactPhoneValidator } from '../validator7';
import { fullAddressValidator } from '../validator8';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { UserInfo, UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-requisites',
  standalone: true,
  imports: 
  [
    CommonModule, 
    RouterModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule
  ], 
  templateUrl: './requisites.component.html',
  styleUrls: ['./requisites.component.scss']
})
export class RequisitesComponent {
   previewURLs: string[] = []; // Список загруженных фото
    activeButtonIndex: number = -1;
    activeStartupButtonIndex: number = -1;
    activeSocialButtonIndex: number = -1;
    activeHumanitarianButtonIndex: number = -1;
    activeCategoryIndex: number = -1;

      public userInfo: UserInfo;
      public statusjwt: boolean = false;

    projectData: requisites = {} as requisites; // Ініціалізація даних проекту
    
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
  
    constructor(
      private eRef: ElementRef,
      private languageService: LanguageService,
      private projectService: ProjectService,
      private router: Router,
      private authService: AuthService, 
      private userService: UserService
    )
    {}

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

    @HostListener('window:resize', ['$event'])
    onResize() {
      this.checkScreenSize();
    }
  
    checkScreenSize() {
      this.isGridView = window.innerWidth > 1350;
    }
  
    
    ngOnInit() 
    {
      this.projectData = this.projectService.returnProjectDataRequisites();

      this.checkScreenSize();    
      this.likedProjects = new Array(this.filteredItems.length).fill(false);
      this.totalSlides = this.filteredItems.length; // Инициализация общего количества слайдов

      this.statusjwt = !this.authService.isTokenExpired();
      console.log(this.statusjwt);
      this.userService.getUserInfo().subscribe(
        (response: { user: UserInfo }) => {
          this.userInfo = response.user;
          console.log(this.userInfo);
        },
        (error: any) => {
          console.error('Ошибка загрузки информации о пользователе', error);    
        }
      );
    }
  
    @HostListener('document:keydown.escape', ['$event'])
    onEscape(event: KeyboardEvent) 
    {
      this.showDropdown = false;
    }

    isPopupOpen: boolean = false;

    closePopup() {
      this.isPopupOpen = false;  // Закрытие попапа
    }

    saveGeneralData(): void {
      this.projectService.getProjectDataRequisites(this.projectData);

      this.isPopupOpen = true;
    }
    submitProject(): void {
      console.log('submitProject');
    }

    scrollToTop(): void {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  
    activeIndex: number | null = null;
  
    images = [
      { gray: 'assets/images/projects.png', active: 'assets/images/projectsGray.png', link: '/projects-list-page' },
      { gray: 'assets/images/aboutUs.png', active: 'assets/images/infoGray.png', link: '/about-us-page' },
      { gray: 'assets/images/account.png', active: 'assets/images/accountGray.png', link: '/profile-page' },
      { gray: 'assets/images/help.png', active: 'assets/images/helpGray.png', link: '/support-page' },
      { gray: 'assets/images/shop.png', active: 'assets/images/shopGray.png', link: '/shop-main-page-page' }
    ];

    onImageClick(link: string): void {
      this.router.navigate([link]);
    }
  
    changeImage(index: number): void 
    {
      this.activeIndex = index;
    }

      projectForm = new FormGroup({
      organizationName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      edrpou: new FormControl('', [Validators.required, edrpouOrIpnValidator()]),
      fullAddress: new FormControl('', [Validators.required, fullAddressValidator()]),
      city: new FormControl('', [Validators.required, cityNameValidator()]),
      iban: new FormControl('', [Validators.required, ibanValidator()]), 
      bankName: new FormControl('', [Validators.required, bankNameValidator()]),      
      mfo: new FormControl('', [Validators.required, mfoValidator()]),      
      signatory: new FormControl('', [Validators.required, signatoryValidator()]),      
      contactNumber: new FormControl('', [Validators.required, contactPhoneValidator()]), 
      contract: new FormControl('', [Validators.required, Validators.email]),
      agreement: new FormControl(false, [Validators.requiredTrue])
    });
  
    get organizationName() { return this.projectForm.get('organizationName'); }
    get edrpou() { return this.projectForm.get('edrpou'); }
    get fullAddress() { return this.projectForm.get('fullAddress'); }
    get city() { return this.projectForm.get('city'); }
    get iban() { return this.projectForm.get('iban'); }
    get bankName() { return this.projectForm.get('bankName'); }
    get mfo() { return this.projectForm.get('mfo'); }
    get signatory() { return this.projectForm.get('signatory'); }
    get contactNumber() { return this.projectForm.get('contactNumber'); }
    get contract() { return this.projectForm.get('contract'); }
    get agreement() { return this.projectForm.get('agreement'); }

  
    nextStep() 
    {
      if (this.projectForm.invalid) 
      {
        this.projectForm.markAllAsTouched();
        return;
      }

      this.projectService.getProjectDataRequisites(this.projectData);

      this.router.navigate(['/uploads-page']);
  
    }

    selectedPaymentMethod: string = '';
  










    onButtonClick(buttonName: string) 
    {
      console.log(`Клик по кнопке: ${buttonName}`);
    }
  
    isWindowOpen: boolean = false; // Флаг для управления состоянием окна
  
    closeWindow() {
      this.isWindowOpen = false; // Закрытие окна
    }
  
    openWindow() {
      this.isWindowOpen = true; // Открытие окна
    }
  
    isGridView = true;
    currentIndex = 0;
    totalSlides = 0;
  
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
  
    isSocialMediaListVisible: boolean[] = []; // Массив для отслеживания видимости списка
  
    toggleSocialMediaList(index: number) {
      this.isSocialMediaListVisible[index] = !this.isSocialMediaListVisible[index];
    }
  
    isHoveredArray: boolean[] = new Array(this.filteredItems.length).fill(false);
    likedProjects: boolean[] = new Array(this.filteredItems.length).fill(false);
  
  
    toggleLike(index: number): void {
      this.likedProjects[index] = !this.likedProjects[index];
    }
  
      // Закрытие выпадающего меню
      closeDropdown() {
        this.showDropdown = false;
      }
  
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      }






} 

