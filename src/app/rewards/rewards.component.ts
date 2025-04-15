import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { MatSelectModule } from '@angular/material/select';
import { LanguageService } from '../services/language.service';
import { ProjectService } from '../services/project.service';
import { Reward } from '../models/project/reward.interface';
import { UserInfo } from 'os';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: 
  [
    CommonModule, 
    FormsModule, 
    RouterModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent {
  
  previewURLs: string[] = []; // Список загруженных фото
    activeButtonIndex: number = -1;
    activeStartupButtonIndex: number = -1;
    activeSocialButtonIndex: number = -1;
    activeHumanitarianButtonIndex: number = -1;
    activeCategoryIndex: number = -1;

    sizeReward: number = 0;
    public projectData: Reward[] = [];

    public filebase64: string = '';
    public statusjwt: boolean = false;

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
      private userService: UserService) 
    {

    }
  
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
  
    @HostListener('document:keydown.escape', ['$event'])
    onEscape(event: KeyboardEvent) 
    {
      this.showDropdown = false;
    }

  
  rewards = [
    { amount: 0, limit: 0, description: '', month: '', year: '', isUnlimited: false, imageUrl: '', imageName: '' }
  ];

  months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
  years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

  addReward(): void{
    this.projectData.push({ Amount: 0, Limit: 0, Description: '', PhotoUrl: '', ImageName: '', Collection: 1 });
    this.sizeReward++;
  }

  uploadImage(event: any, index: number): void {
    const file = event.target.files[0];
    
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg']; // Разрешенные форматы
  

      if (!validTypes.includes(file.type)) {
        event.target.value = '';
        this.projectData[index].PhotoUrl = null;
  
        const photoInput = this.photoInputs.get(index);
        if (photoInput) {
          photoInput.control.markAsTouched();
          photoInput.control.setValue(null); // сброс значения в форме
        }
  
        return;
      }
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.projectData[index].PhotoUrl = e.target.result; // Сохраняем base64 строку
      };
      reader.readAsDataURL(file); // Преобразуем файл в base64
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (typeof window !== 'undefined') {
      this.isGridView = window.innerWidth > 1350;
    } else {
      // Можно задать значение по умолчанию, если это выполняется на сервере
      this.isGridView = false;
    }
  }

  ngOnInit() 
  {
    this.sizeReward = this.projectService.getProjectDataRewardsSize();
    for (let i = 0; i < this.sizeReward; i++) {
      this.projectData.push(this.projectService.returnProjectDataRewards(i));
    }

    this.checkScreenSize();    
    this.likedProjects = new Array(this.filteredItems.length).fill(false);
    this.totalSlides = this.filteredItems.length; // Инициализация общего количества слайдов

    this.statusjwt = !this.authService.isTokenExpired();
    console.log(this.statusjwt);
    this.userService.getUserInfo().subscribe(
      (response: { user: {
        name: string;
        description: string;
        email: string;
        date: string;
        photo: string;
      } }) => {
        this.filebase64 = response.user.photo;

      },
      (error: any) => {
        console.error('Ошибка загрузки информации о пользователе', error);    
      }
  );
  }

  countCharacters() 
  {
    
  }
  
  isPopupOpen: boolean = false;

    closePopup() {
      this.isPopupOpen = false;  // Закрытие попапа
    }

  saveGeneralData(): void {
    // this.sizeReward = this.projectDataOld.length;
    // for (let i = this.sizeRewardOld; i < this.sizeReward; i++) {
    //   this.projectData.push(this.projectDataOld[i]); 
    // }

    this.projectService.clearProjectDataRewards();
    for (let i = 0; i < this.sizeReward; i++) {
      console.log(this.projectData[i]);
      this.projectService.getProjectDataRewards(this.projectData[i]);
    }

    this.isPopupOpen = true;
  }

  @ViewChildren('limitInput') limitInputs!: QueryList<NgModel>;
  @ViewChildren('sumInput') sumInputs!: QueryList<NgModel>;
  @ViewChildren('opisInput') opisInputs!: QueryList<NgModel>;
  @ViewChildren('photoInput') photoInputs!: QueryList<NgModel>;
  
  submitProject(): void {
    this.limitInputs.forEach(input => input.control.markAsTouched());
    this.sumInputs.forEach(input => input.control.markAsTouched());
    this.opisInputs.forEach(input => input.control.markAsTouched());
    this.photoInputs.forEach(input => input.control.markAsTouched());

    const invalidInput = this.limitInputs.find(input => input.invalid);
    const invalidSumInput = this.sumInputs.find(input => input.invalid);
    const invalidOpisInput = this.opisInputs.find(input => input.invalid);
    const invalidPhotoInput = this.photoInputs.find(input => input.invalid);

    if (invalidInput || invalidSumInput || invalidOpisInput || invalidPhotoInput) {
      console.log("Некорректно введені дані");
      return;
    }

    this.router.navigate(['/requisites-page']);
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

  
  onImageClick(link: string): void 
  {
    this.router.navigate([link]);
  }

  changeImage(index: number): void 
  {
    this.activeIndex = index;
  }









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
