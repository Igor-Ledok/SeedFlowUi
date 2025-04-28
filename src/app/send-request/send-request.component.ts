import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LanguageService } from '../services/language.service';
import { UserInfo, UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { HelpDataService } from '../services/helpData.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-request',
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
    NgxChartsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './send-request.component.html',
  styleUrl: './send-request.component.scss'
})
export class SendRequestComponent {

    public userInfo: UserInfo;
    public statusjwt: boolean = false;

  view: [number, number] = [1190, 600]; // Размер графика
  
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
              
          likedProjects: boolean[] = new Array(this.projects2.length).fill(false);
  
          toggleLike(index: number): void {
            this.likedProjects[index] = !this.likedProjects[index];
          }
  
          getProgress(project: any) {
            return (project.amountRaised / project.goal) * 100 + '%';
          }

          helpData2: any[] = [];
          searchText2: string = ''; 
        
          constructor(
            private route: ActivatedRoute,
            private eRef: ElementRef,
            private languageService: LanguageService,
            private authService: AuthService, 
            private userService: UserService,
            private helpDataService: HelpDataService,
            private router: Router
           ) 
           {
  
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
            this.route.url.subscribe(urlSegments => {
              this.activeTab = urlSegments.length > 1 ? urlSegments[1].path : 'general';
            });
        
            const savedLanguage = localStorage.getItem('selectedLanguage') ||'ua'; 
            this.selectedLanguage.setValue(savedLanguage);
            this.onLanguageChange({ value: savedLanguage });

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

            this.helpDataService.getHelpData().subscribe(
              data => {
                console.log('Загруженные данные:', data); // Логирование полученных данных
                this.helpData2 = data;
              },
              error => {
                console.error('Ошибка загрузки данных:', error);
              }
            );
          }

          filterQuestions() {
            const filtered = this.helpData2.filter(item =>
              item.question.toLowerCase().includes(this.searchText2.toLowerCase())
            );
            console.log('Отфильтрованные вопросы:', filtered);  // Логируем отфильтрованные вопросы
            return filtered;
          }
          
  
          onQuestionClick(url: string) {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigateByUrl(url);
            });
          }
  
          onEnter() {
            const search = this.searchText2.trim().toLowerCase();
          
            const match = this.helpData2.find(item =>
              item.question.toLowerCase() === search
            );
          
            if (match) {
              this.router.navigateByUrl(match.url);
            } else {
              this.router.navigateByUrl('/search-result-page');
            }
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
          likedProjects2: boolean[] = new Array(this.filteredItems.length).fill(false);
        
        
          toggleLike2(index: number): void {
            this.likedProjects2[index] = !this.likedProjects2[index];
          }
        
            // Закрытие выпадающего меню
            closeDropdown() {
              this.showDropdown = false;
            }
        
            toggleDropdown() {
              this.showDropdown = !this.showDropdown;
            }
}
