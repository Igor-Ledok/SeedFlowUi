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
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-shop-main-page',
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
    MatCheckboxModule
  ],
  templateUrl: './shop-main-page.component.html',
  styleUrl: './shop-main-page.component.scss'
})
export class ShopMainPageComponent {
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
              private languageService: LanguageService
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

            categories = [
              "Дім", "Здоров'я", "Харчування", "Транспорт", "Аудіо / Відео",
              "Книги / Ігри", "Діти", "Технології", "Мистецтво", "Екологія"
            ];

            categories2 = [
              "Товар тижня", "В наявності", "Знижка", "Закінчується"
            ];

            minValue: number = 0;
            maxValue: number = 2500;
            progressValue: number = 0; // Начальное значение 0
          
            updateProgress() {
              console.log('Current Progress:', this.progressValue);
            } 

            images = [
              {
                src: 'assets/images/ShopTovar1.png',
                title: 'Чашка Seed Flow',
                description: '450 мл',
                amount: '450 грн',
              },
              {
                src: 'assets/images/ShopTovar2.png',
                title: 'Толстовка Seed Flow',
                description: 'S, M, L, XL',
                amount: '1289 грн',
              },
              {
                src: 'assets/images/ShopTovar4.png',
                title: 'Чашка Seed Flow',
                description: '450 мл',
                amount: '300 грн',
              }
            ];

            images2 = [
              {
                src: 'assets/images/ShopTovar2.png',
                title: 'Толстовка Seed Flow',
                description: 'S, M, L, XL',
                amount: '1289 грн',
              },
              {
                src: 'assets/images/ShopTovar4.png',
                title: 'Чашка Seed Flow',
                description: '450 мл',
                amount: '300 грн',
              },
              {
                src: 'assets/images/ShopTovar1.png',
                title: 'Чашка Seed Flow',
                description: '450 мл',
                amount: '450 грн',
              }
            ];
          
            currentIndex = 0;
            currentIndex2 = 0;
          
            changeImage(direction: string) {
              if (direction === 'left') {
                this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
              } else {
                this.currentIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
              }
            }

            changeImage2(direction: string) {
              if (direction === 'left') {
                this.currentIndex2 = this.currentIndex2 === 0 ? this.images2.length - 1 : this.currentIndex2 - 1;
              } else {
                this.currentIndex2 = this.currentIndex2 === this.images2.length - 1 ? 0 : this.currentIndex2 + 1;
              }
            }
          
            get currentImage() {
              return this.images[this.currentIndex];
            }

            get currentImage2() 
            {
              return this.images2[this.currentIndex2];
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

            isLiked: boolean = false;

            toggleLikeFirst() {
              this.isLiked = !this.isLiked;
            }


            
  };


