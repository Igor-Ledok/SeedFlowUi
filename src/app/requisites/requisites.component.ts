import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { LanguageService } from '../services/language.service';
import { ProjectService } from '../services/project.service';
import { requisites } from '../models/project/send/requisites.interface';
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
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

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
    MatCheckboxModule,
    HeaderComponent,
    FooterComponent
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
      
      if (searchContainer && !searchContainer.contains(event.target)) {
        this.showDropdown = false;
        searchInput?.blur();
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

      this.projectData = this.projectService.returnProjectDataRequisites();
      this.agreement = this.projectService.returnAgreement();

      // if (this.projectData) {
      //   this.projectForm.patchValue({
      //     organizationName: this.projectData.OrganizationName,
      //     edrpou: this.projectData.Edrpou,
      //     fullAddress: this.projectData.FullAddress,
      //     city: this.projectData.City,
      //     iban: this.projectData.Iban,
      //     bankName: this.projectData.BankName,
      //     mfo: this.projectData.Mfo,
      //     signatory: this.projectData.Signatory,
      //     contactNumber: this.projectData.Contactnumber,
      //     contract: this.projectData.Contract
      //   });
      // }
      
      

      console.log(this.projectData);
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
      this.projectService.getProjectDataRequisites(this.projectData); // сохраняеться коретно
      this.projectService.getAgreement(this.agreement);

      this.isPopupOpen = true;
    }
    // submitProject(): void {
    //   console.log('submitProject');
    // }

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

    //   projectForm = new FormGroup({
    //   organizationName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    //   edrpou: new FormControl('', [Validators.required, edrpouOrIpnValidator()]),
    //   fullAddress: new FormControl('', [Validators.required, fullAddressValidator()]),
    //   city: new FormControl('', [Validators.required, cityNameValidator()]),
    //   iban: new FormControl('', [Validators.required, ibanValidator()]), 
    //   bankName: new FormControl('', [Validators.required, bankNameValidator()]),      
    //   mfo: new FormControl('', [Validators.required, mfoValidator()]),      
    //   signatory: new FormControl('', [Validators.required, signatoryValidator()]),      
    //   contactNumber: new FormControl('', [Validators.required, contactPhoneValidator()]), 
    //   contract: new FormControl('', [Validators.required, Validators.email]),
    //   agreement: new FormControl(false, [Validators.requiredTrue])
    // });
  
    // get organizationName() { return this.projectForm.get('organizationName'); }
    organizationName: string = ''; 
    edrpou: string = ''; 
    fullAddress: string = '';
    city: string = '';
    iban: string = '';
    bankName: string = '';
    mfo: string = '';
    signatory: string = '';
    contactNumber: string = '';
    contract: string = '';
    agreementMesege: string = '';
    agreement: boolean = false;
    validboolean: boolean = false;

  


    ValidOrganizationName() {
      if (!this.projectData.OrganizationName || this.projectData.OrganizationName.length < 3) {
        this.organizationName = "Мінімальна довжина 3 символи";
        this.validboolean = false;
      } else {
        this.organizationName = '';
      }
    }
    

    ValidEdrpou() {
      const edrpouValue = this.projectData.Edrpou?.trim();
      this.validboolean = false; // Всегда сбрасываем перед валидацией
    
      const isValidEdrpou = /^[0-9]{8,10}$/.test(edrpouValue); // ЄДРПОУ
      const isValidIpn = /^[0-9]{10}$/.test(edrpouValue); // ІПН
    
      if (!edrpouValue || (!isValidEdrpou && !isValidIpn)) {
        this.edrpou = "Невірний формат ЄДРПОУ або ІПН";
      } else {
        this.edrpou = '';
        this.validboolean = true;
      }
    }

    ValidAddress(){
      const addressValue = this.projectData.FullAddress?.trim();
      const addressPattern = /^([А-ЯA-ZІЇЄҐ][а-яa-zіїєґ']+\s){0,2}[А-ЯA-ZІЇЄҐ][а-яa-zіїєґ']+\s\d{1,5},\s?\d+$/;
      if (!this.projectData.FullAddress || addressValue && !addressPattern.test(addressValue)) {
        this.fullAddress = "Помилка (Улица з великої букви, номер будинку і поштовий індекс)";
        this.validboolean = false;
      }
      else 
        this.fullAddress = '';
    }

    ValidCity(){
      const cityValue = this.projectData.City;
      const cityPattern = /^[A-Za-zА-Яа-яІіЇїЄєҐґ\s]+$/;
      if (!this.projectData.City || cityValue && !cityPattern.test(cityValue)) {
        this.city = "Невірний формат назви міста";
        this.validboolean = false;
      }
      else 
        this.city = '';
    }

    ValidIban() {
      const ibanValue = this.projectData.Iban?.trim();
    
      // Если значение пустое, сразу возвращаем ошибку
      if (!ibanValue) {
        this.iban = "IBAN не може бути порожнім";
        this.validboolean = false;
        return;
      } else {
        this.iban = '';
      }
    
      const countryPatterns: { [key: string]: RegExp } = {
        'DE': /^DE\d{20}$/, // Германия (22 символа)
        'FR': /^FR\d{2}[0-9A-Z]{23}$/, // Франция (27 символов)
        'GB': /^GB\d{2}[0-9]{18}$/, // Великобритания (22 символа)
        'ES': /^ES\d{2}[0-9A-Z]{20}$/, // Испания (24 символа)
        'IT': /^IT\d{2}[0-9A-Z]{23}$/, // Италия (27 символов)
        'NL': /^NL\d{2}\d{16}$/, // Нидерланды (18 символов)
        'PL': /^PL\d{2}\d{24}$/, // Польша (28 символов)
        'BE': /^BE\d{2}\d{12}$/, // Бельгия (16 символов)
        'CH': /^CH\d{2}\d{17}$/, // Швейцария (21 символ)
        'AT': /^AT\d{2}\d{16}$/, // Австрия (20 символов)
        'UA': /^UA\d{25}$/, // Украина (27 символов: 2 буквы + 25 цифр)
      };
    
      // Получаем код страны
      const countryCode = ibanValue.substring(0, 2); // Первые два символа — это код страны
    
      // Проверка IBAN на соответствие шаблону для страны
      if (countryPatterns[countryCode] && !countryPatterns[countryCode].test(ibanValue)) {
        this.iban = "Невірний формат IBAN для цієї країни";
        this.validboolean = false;
        return;
      }
    
      // 3. Общий формат для международных IBAN
      const internationalIbanPattern = /^[A-Z]{2}\d{2}[A-Z0-9]{4,30}$/;
      if (!internationalIbanPattern.test(ibanValue)) {
        this.iban = "Невірний формат IBAN";
        this.validboolean = false;
        return;
      }
    
      // Если все проверки прошли успешно
      this.iban = '';
      this.validboolean = true;
    }
    

    ValidBankName(){
      const bankNameValue = this.projectData.BankName?.trim();

      const validBankNamePattern = /^[A-Za-zА-Яа-яЁёіІїЇєЄґҐєҐ\-\s']+$/;
      if (!this.projectData.BankName || bankNameValue && !validBankNamePattern.test(bankNameValue)) {
        this.bankName = "Назва банку може містити лише літери, пробіли, дефіси або апострофи";
        this.validboolean = false;
      } else {
        this.bankName = ''; // Если все прошло успешно
      }
    }

    ValidMfo() {
      const mfoValue = this.projectData.Mfo?.trim();
      if (!mfoValue || !/^\d{5}$/.test(mfoValue)) {
        this.mfo = "МФО має складатися з 5 цифр";
        this.validboolean = false;
      } else {
        this.mfo = '';
        this.validboolean = true;
      }
    }
    

    ValidSignatory(){
      const signatoryValue = this.projectData.Signatory?.trim();
      const signatoryPattern = /^[А-ЯA-Zа-яa-zіІїЇєЄґҐ'’ʼ`\s-]+,\s?[А-ЯA-Zа-яa-zіІїЇєЄґҐ'’ʼ`\s-]+\s[А-ЯA-Zа-яa-zіІїЇєЄґҐ'’ʼ`\s-]+\s[А-ЯA-Zа-яa-zіІїЇєЄґҐ'’ʼ`\s-]+$/u;
      if (!this.projectData.Signatory || signatoryValue && !signatoryPattern.test(signatoryValue)){
        this.signatory = "Підписант має бути в форматі: 'Прізвище, Ім'я По-батькові'";
        this.validboolean = false;
      } else 
        this.signatory = '';
    }

    validPhone(){
      const phoneValue = this.projectData.Contactnumber?.trim();

      const phonePatterns: { [key: string]: RegExp } = {
        'UA': /^\+380\d{9}$/,   // Украина (пример)
        'US': /^\+1\d{10}$/,    // США
        'IT': /^\+39\d{10}$/,   // Италия
        'DE': /^\+49\d{10,11}$/, // Германия
        'FR': /^\+33\d{9}$/,    // Франция
        'ES': /^\+34\d{9}$/,    // Испания
      };

      // Проверка на обязательность значения
      let isValidPhone = false;

      // Проверка на корректность номера телефона по паттернам
      for (let country in phonePatterns) {
        const pattern = phonePatterns[country];
        if (pattern.test(phoneValue)) {
          isValidPhone = true;
          break;
        }
      }

      if (!this.projectData.Contactnumber || !isValidPhone) {
        this.contactNumber = "Невірний формат номера телефону";
        this.validboolean = false;
      } else {
        this.contactNumber = '';
      }
    }

    ValidContract(){
      const emailControl = new FormControl(this.projectData.Contract?.trim(), Validators.email);
      if (!this.projectData.Contract || emailControl.invalid) {
        this.contract = "Невірний формат email";
        this.validboolean = false;
      } else {
        this.contract = '';
      }
    }

    ValidAgreement(){
      if (!this.agreement) {
        this.agreementMesege = "Вам потрібно прийняти угоду";
        this.validboolean = false;
      } else
        this.agreementMesege = '';
    }

    nextStep() 
    {
      this.projectService.getProjectDataRequisites(this.projectData);
      this.projectService.getAgreement(this.agreement);

      // Изначально ставим validboolean в true
      this.validboolean = true;
    
      this.ValidOrganizationName();
      this.ValidEdrpou();
      this.ValidAddress();
      this.ValidCity();
      this.ValidIban();
      this.ValidBankName();
      this.ValidMfo();
      this.ValidSignatory();
      this.validPhone();
      this.ValidContract();
      this.ValidAgreement();


      // Если все поля прошли валидацию, выполняем переход
      if (this.validboolean) {
        this.router.navigate(['/uploads-page']);
      }
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

