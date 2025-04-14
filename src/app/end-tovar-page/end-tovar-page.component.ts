import { Component, ElementRef, HostListener } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { LanguageService } from '../services/language.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Reward } from '../models/project/reward.interface';
import { ProjectData } from '../models/project/project-data.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-end-tovar-page',
  imports: 
  [
    CommonModule, 
    RouterModule,
    TranslocoModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './end-tovar-page.component.html',
  styleUrl: './end-tovar-page.component.scss'
})
export class EndTovarPageComponent {
  public projectData: ProjectData = {} as ProjectData;
  public rewardsList: Reward[] = [];
  private sizeReward: number = 0;
  private image: string = 'assets/images/photo2.png'; // временое решение

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
    private projectService: ProjectService)
  {

  }

  ngOnInit(): void {
    //Reward
    this.sizeReward = this.projectService.getProjectDataRewardsSize();
    for (let i = 0; i < this.sizeReward; i++) {
      this.rewardsList.push(this.projectService.returnProjectDataRewards(i));
    }

    //Project
    this.projectData = this.projectService.returnProjectDataUploads();
  }
  public getImage(): string {
    return this.image;
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
  

    submitProject(): void {
      console.log('submitProject');
      this.projectService.sendProjectData().subscribe({
        next: (response) => {
          console.log(response);
         
        },
        error: (e: any) => {
          console.log(e);
        }
      });;
    }

    quantity: number = 1; // Начальное значение
    maxQuantity: number = 100;


    increaseQuantity() {
      if (this.quantity < this.maxQuantity) {
        this.quantity++;
      }
    }

    decreaseQuantity() 
    {
    if (this.quantity > 1) 
    {   
      this.quantity--;
    }
  }

  isLiked: boolean = false;

  toggleLikeFirst() {
    this.isLiked = !this.isLiked;
  }

  colors: string[] = ['#EC0F10', '#394938', '#4C6396', '#213849'];
selectedColorIndex: number | null = null;

selectColor(index: number) {
  this.selectedColorIndex = index;
}

isPurchased: boolean = false;  // Убедитесь, что это свойство существует
  showModal: boolean = false;    // Статус модального окна

  // Метод для переключения состояния покупки
  togglePurchase(): void 
  {
    if (!this.isPurchased) {
      this.isPurchased = true;  // При первом клике меняем состояние
    } else {
      this.showModal = true;    // При втором клике показываем модальное окно
    }
  }

  // Метод для закрытия модального окна
  closeModal(): void {
    this.showModal = false;
  }

  // Метод для перехода в корзину
  goToCart(): void {
    // Логика для перехода в корзину
    console.log("Перехожу в корзину...");
  }

  // Метод для продолжения покупок
  continueShopping(): void {
    // Логика для продолжения покупок
    console.log("Продолжаю покупки...");
  }

}
