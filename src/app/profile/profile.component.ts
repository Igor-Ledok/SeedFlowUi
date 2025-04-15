import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../services/language.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UserInfo, UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ProjectData } from '../models/project/project-data.interface';
import { ProjectList } from '../models/project/project-list-data';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-profile',
  imports: 
  [
    CommonModule, 
    RouterModule,
    TranslocoModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    NgxChartsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  encapsulation: ViewEncapsulation.None 
})
export class ProfileComponent 
{ 
  view: [number, number] = [1190, 600]; // Размер графика

  public name: string;
  public description: string;
  public date: string;
  public rule: string;
  public photo: string;

  public userProjectList: ProjectList[] = [];
  public LikeProjectList: ProjectList[] = [];

  data = [
    { name: 'Лютий', value: 10 },
    { name: 'Березень', value: 20 },
    { name: 'Квітень', value: 30 },
    { name: 'Травень', value: 40 },
    { name: 'Червень', value: 60 },
    { name: 'Липень', value: 80 },
    { name: 'Серпень', value: 80 },
    { name: 'Вересень', value: 60 },
    { name: 'Жовтень', value: 100 },
    { name: 'Листопад', value: 100 }
  ];
  

  
  colorScheme: any = {
    domain: ['#247a60']
  };

  selectedReplyId: number | null = null;

onReplyClick(index: number): void {
  if (this.selectedReplyId === index) {
    this.selectedReplyId = null; // скрываем, если повторно нажали
  } else {
    this.selectedReplyId = index;
  }
}

  customXAxisFormat(value: string): string {
    return value ? value.toUpperCase() : value; // Преобразуем строку в верхний регистр
  }  

  yAxisTicks = [10, 20, 30, 40, 50, 60, 80, 100]; // Массив для оси Y

  // Функция форматирования, просто возвращает число как строку
  customYAxisFormat(value: number): string {
    return `₴ ${value.toString()}`; // Добавляем ₴ перед числом
  }
  

    previewURLs: string[] = []; // Список загруженных фото
    activeButtonIndex: number = -1;
    activeStartupButtonIndex: number = -1;
    activeSocialButtonIndex: number = -1;
    activeHumanitarianButtonIndex: number = -1;
    activeCategoryIndex: number = -1;
    showUserProject: boolean = false;

      public userInfo: UserInfo;
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

        comments = [
          {
            name: "Анна Лісовська",
            date: "15 лютого о 14:51",
            text: "Дуже важливо підтримувати такі ініціативи! Ці тварини заслуговують на безпечне майбутнє. Дякую команді за вашу роботу!",
            image: "assets/images/investor1.png"
          },
          {
            name: "Ігор Коваль",
            date: "16 лютого о 09:12",
            text: "Гарна ідея! Підтримую на всі 100%.",
            image: "assets/images/investor2.png"
          },
          {
            name: "Марія Петренко",
            date: "16 лютого о 17:45",
            text: "Бажаю вам успіху! Це справді варто уваги.",
            image: "assets/images/investor3.png"
          },
          {
            name: "Олексій Бондар",
            date: "17 лютого о 10:05",
            text: "Долучився! Робіть добру справу!",
            image: "assets/images/investor4.png"
          }
        ];
        
      
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
            
        likedProjects: boolean[] = new Array(this.userProjectList.length).fill(false);


        toggleLike(index: number, projectId: string): void {
          this.likedProjects[index] = !this.likedProjects[index];
          this.projectService.LikeProject(projectId).subscribe({
            next: () => {
              this.likedProjects[index] = !this.likedProjects[index]; // меняем состояние
            },
            error: (err) => {
              console.error('Ошибка при лайке:', err);
            }
          });
        }

        getProgress(project: any) {
          return (project.amountRaised / project.goal) * 100 + '%';
        }
      
        constructor(
          private route: ActivatedRoute,
          private eRef: ElementRef,
          private languageService: LanguageService,
          private userService: UserService,
          private authService: AuthService,
          private projectService: ProjectService,
         ) 
         {

         }
      
        ngOnInit() 
        {
          this.route.url.subscribe(urlSegments => {
            this.activeTab = urlSegments.length > 1 ? urlSegments[1].path : 'general';
          });
      
          this.userService.getUserInfo().subscribe(response => {
            this.name = response.user.name;
            this.description = response.user.description;
            this.date = response.user.date;
            this.photo = response.user.photo;
          });

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

          this.rule = this.authService.getUserRole();

          if (this.rule === 'Autor') {
            this.getUserProjects();
            this.showUserProject = true;
          }

          this.geLikeProjects();

          const savedLanguage = localStorage.getItem('selectedLanguage') ||'ua'; 
          this.selectedLanguage.setValue(savedLanguage);
          this.onLanguageChange({ value: savedLanguage });

          this.checkScreenSize();
          this.likedProjects = new Array(this.filteredItems.length).fill(false);
          this.totalSlides = this.filteredItems.length; 
        }

        getUserProjects(): void{
          this.projectService.getUserProjects().subscribe(
            (data: ProjectList[]) => {
              this.userProjectList = data;
              for (let i = 0; i < this.userProjectList.length; i++) {
                this.userProjectList[i].categoryPhotoUrl = 'assets/images/' + this.userProjectList[i].categoryPhotoUrl;
              }
            },
            (error: any) => {
              console.error('Ошибка загрузки проектов', error);
            }
          );
        }

        

        geLikeProjects(): void{
          this.projectService.getLikeProjects().subscribe(
            (data: ProjectList[]) => {
              this.LikeProjectList = data;
              for (let i = 0; i < this.LikeProjectList.length; i++) {
                this.LikeProjectList[i].categoryPhotoUrl = 'assets/images/' + this.LikeProjectList[i].categoryPhotoUrl;
              }
            },
            (error: any) => {
              console.error('Ошибка загрузки проектов', error);
            }
          );
        }

        PercentageOfMoney(num1: number,num2: number): number {
          return Math.round((num1 / num2) * 100);
        }

        @HostListener('window:resize', ['$event'])
        onResize() {
          this.checkScreenSize();
        }
      
        checkScreenSize() 
        {
          this.isGridView = window.innerWidth > 1350;
        }

        onButtonClick(buttonName: string) 
        {
          console.log(`Клик по кнопке: ${buttonName}`);
          // Здесь можете добавить логику для каждой кнопки
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

        
        showDropdown2 = false;

        toggleDropdown2() {
          this.showDropdown2 = !this.showDropdown2;
        }
      
        isSocialMediaListVisible: boolean[] = []; // Массив для отслеживания видимости списка  

        toggleSocialMediaList(index: number) {
          this.isSocialMediaListVisible[index] = !this.isSocialMediaListVisible[index];
        }
      
        isHoveredArray: boolean[] = new Array(this.filteredItems.length).fill(false);
        likedProjects2: boolean[] = new Array(this.filteredItems.length).fill(false);
      
      
        toggleLike2(index: number): void {
          this.likedProjects[index] = !this.likedProjects[index];
        }
      
          // Закрытие выпадающего меню
          closeDropdown() {
            this.showDropdown = false;
          }
      
          toggleDropdown() {
            this.showDropdown = !this.showDropdown;
          }
        
          MATHPercentageOfMoney(collected: number, total: number): string {
            if (!total || total === 0) return '0%';
            const percent = (collected / total) * 100;
            return `${Math.min(percent, 100)}%`; // ограничим до 100%
          }
         
}
