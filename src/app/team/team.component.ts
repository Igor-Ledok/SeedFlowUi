import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LanguageService } from '../services/language.service';
import { MatSelectModule } from '@angular/material/select';
import { TeamMember } from '../models/project/send/team-member.interface';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';
import { UserInfo, UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: 
  [
    CommonModule, 
    FormsModule, 
    RouterModule,
    TranslocoModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
  public userInfo: UserInfo;
  public statusjwt: boolean = false;

  sizeTeam: number = 0;
  public projectData: TeamMember[] = [];


  defaultPhoto = 'assets/images/user.png';
  
  teamMembers = [
    { photo: 'assets/images/user.png', name: '', role: '', phone: '', viber: '', telegram: '', email: '' }
  ];

  addMember(): void {
    this.projectData.push({name: '', role: '', phone: '', viber: '', telegram: '', email: '', UrlPhoto: 'assets/images/user.png'});
    this.sizeTeam++;
  }

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

    constructor(
      private eRef: ElementRef,
      private languageService: LanguageService,
      private projectService: ProjectService, 
      private router: Router,
      private authService: AuthService, 
      private userService: UserService)
    {

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
      this.sizeTeam = this.projectService.getProjectDataTeamSize();
      for (let i = 0; i < this.sizeTeam; i++) 
      {
        this.projectData.push(this.projectService.returnProjectDataTeam(i));
      }

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

      this.checkScreenSize();    
      this.likedProjects = new Array(this.filteredItems.length).fill(false);
      this.totalSlides = this.filteredItems.length;

      if (this.projectData.length === 0){
        this.addMember();
      }
    }

    isPopupOpen: boolean = false;

    closePopup() {
      this.isPopupOpen = false; 
    }

    saveGeneralData(): void {


      // this.sizeTeam = this.projectDataOld.length;
      // for (let i = this.sizeTeamOld; i < this.sizeTeam; i++) {
      //   this.projectData.push(this.projectDataOld[i]); 
      // }

      this.projectService.clearProjectDataTeam(); // Очищаем старые данные

      for (let i = 0; i < this.sizeTeam; i++) {
        console.log(this.projectData[i]);
        this.projectService.getProjectDataTeam(this.projectData[i]);
      }

      this.isPopupOpen = true;
    }
    

    uploadImage(event: any, index: number): void {
      const file = event.target.files[0];
      
      // Проверяем, что файл выбран и его тип является изображением (png, jpg, jpeg)
      if (file) {
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        
        if (!validTypes.includes(file.type)) {
          event.target.value = ''; 
          this.projectData[index].UrlPhoto = null; 
          return;
        }
    
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.projectData[index].UrlPhoto = e.target.result; // Сохраняем base64 строку
        };
        reader.readAsDataURL(file); // Преобразуем файл в base64
      }
    }

    member = { name: '', role: '', phone: '', email: '' };

    nameError = '';
    roleError = '';
    phoneError = '';
    emailError = '';
    contactError = '';


    @ViewChildren('photoInput') photoInputs!: QueryList<any>;
    @ViewChildren('nameInput') nameInputs!: QueryList<any>;
    @ViewChildren('roleInput') roleInputs!: QueryList<any>;
    @ViewChildren('phoneInput') phoneInputs!: QueryList<any>;
    @ViewChildren('emailInput') emailInputs!: QueryList<any>;
    
    submitProject() 
    {
      this.projectService.clearProjectDataTeam(); // Очищаем старые данные
      for (let i = 0; i < this.sizeTeam; i++) {
        console.log(this.projectData[i]);
        this.projectService.getProjectDataTeam(this.projectData[i]);
      }

    this.photoInputs.forEach(input => input.control.markAsTouched());
    this.nameInputs.forEach(input => input.control.markAsTouched());
    this.roleInputs.forEach(input => input.control.markAsTouched());
    this.phoneInputs.forEach(input => input.control.markAsTouched());
    this.emailInputs.forEach(input => input.control.markAsTouched());

    const invalidPhoto = this.photoInputs.find(input => input.invalid);
    const invalidName = this.nameInputs.find(input => input.invalid);
    const invalidRole = this.roleInputs.find(input => input.invalid);
    const invalidPhone = this.phoneInputs.find(input => input.invalid);
    const invalidEmail = this.emailInputs.find(input => input.invalid);

    if (invalidPhoto || invalidName || invalidRole || invalidPhone || invalidEmail) 
    {
      console.log("Некорректно введені дані");
      return;
    }


    this.router.navigate(['/rewards-page']);
  }

    scrollToTop(): void 
    {
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
