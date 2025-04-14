import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-collection-closed-nice',
  imports: 
  [
    CommonModule, 
    RouterModule,
    TranslocoModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './collection-closed-nice.component.html',
  styleUrl: './collection-closed-nice.component.scss'
})
export class CollectionClosedNiceComponent {
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

   rewards = [
      {
        image: 'assets/images/photo2.png',
        tag: 'Знижка 20%',
        price: '300',
        limit: 200,
        investors: 50,
        description: '20% знижки на перше замовлення'
      },
      {
        image: 'assets/images/photo2.png',
        tag: 'Знижка 40%',
        price: '500',
        limit: 100,
        investors: 26,
        description: '40% знижки на перше замовлення'
      },
      {
        image: 'assets/images/photo2.png',
        tag: 'Світшот',
        price: '2000',
        limit: 50,
        investors: 4,
        description: 'Пошив світшота за індивідуальними мірками'
      }
    ];
  
    constructor(
      private eRef: ElementRef,
      private languageService: LanguageService)
    {
  
    }
  
    previewURLs: string[] = []; // Список загруженных фото
      activeButtonIndex: number = -1;
      activeStartupButtonIndex: number = -1;
      activeSocialButtonIndex: number = -1;
      activeHumanitarianButtonIndex: number = -1;
      activeCategoryIndex: number = -1;

      commentText: string = '';
    
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
        this.isGridView = window.innerWidth > 1350;
      }
    
      
      ngOnInit() 
      {  
        this.checkScreenSize();    
        this.likedProjects = new Array(this.filteredItems.length).fill(false);
        this.totalSlides = this.filteredItems.length; // Инициализация общего количества слайдов
      }

      projects = [
        {
          title: 'ПЕКАРНЯ «НА РОЗІ»',
          image: 'assets/images/credit.png',
          closingDate: '135 472',
          participants: 187,
          amount: 508251,
          percentage: 103,
        },
        {
          title: '«ЗЕРНО НАДІЇ»',
          image: 'assets/images/investments.png',
          closingDate: '135 472',
          participants: 187,
          amount: 508251,
          percentage: 103,
        },
        {
          title: 'ШКОЛА ТАНЦІВ',
          image: 'assets/images/womenBusiness.png',
          closingDate: '135 472',
          participants: 187,
          amount: 508251,
          percentage: 103,
        },
        {
          title: 'НОВИЙ ПРОЄКТ',
          image: 'assets/images/startups.png',
          closingDate: '135 472',
          participants: 187,
          amount: 508251,
          percentage: 103,
        },
        {
          title: 'РЕСТОРАН',
          image: 'assets/images/ventureCapital.png',
          closingDate: '135 472',
          participants: 187,
          amount: 508251,
          percentage: 103,
        },
      ];

      currentIndex: number = 0;
      visibleItems = 3;

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
