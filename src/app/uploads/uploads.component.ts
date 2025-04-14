import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { LanguageService } from '../services/language.service';
import { ProjectService } from '../services/project.service';
import { ProjectData } from '../models/project/project-data.interface';
import { Reward } from '../models/project/reward.interface';
import { TeamMember } from '../models/project/team-member.interface';
import { detailsdescription } from '../models/project/datailsDescription.interface';
import { CategoryDto } from '../models/project/topic.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploads',
  standalone: true,
  imports: 
  [
    CommonModule, 
    RouterModule,
    TranslocoModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule
  ], 
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent {
  public projectData: ProjectData = {} as ProjectData;
  public rewardsList: Reward[] = [];
  public TeamList: TeamMember[] = [];
  private TeamSize: number = 0;
  private sizeReward: number = 0;
  public image: string = 'assets/images/photo2.png';
  public secondaryPhotos: string[] = []; // Массив для второстепенных фото
  public secondaryPhotosSize: number;
  public detailsDescriptionSize: number = 0;
  public detailsDescription: detailsdescription[] = [];
  public category: CategoryDto | undefined;
  public categoryPhoto: string = ''; 

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
    private projectService: ProjectService,
    private router: Router)
  {

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

  ngOnInit(): void 
  {
    this.projectService.getCategory().subscribe((data: CategoryDto) => {
      this.category = data;  // Получаем категорию из сервиса
  
      // Убедитесь, что category существует и фото есть
      if (this.category?.photo) {
        this.categoryPhoto = 'assets/images/' + this.category.photo; // Установка значения по умолчанию
      }
  
      console.log(this.category?.id); // Access properties safely
    });
    
    // Reward
    this.sizeReward = this.projectService.getProjectDataRewardsSize();
    for (let i = 0; i < this.sizeReward; i++) {
      this.rewardsList.push(this.projectService.returnProjectDataRewards(i));
    }
    // Team
    this.TeamSize = this.projectService.getProjectDataTeamSize();
    for (let i = 0; i < this.TeamSize; i++) {
      this.TeamList.push(this.projectService.returnProjectDataTeam(i));
    }

    //DetailsDescription
    this.detailsDescriptionSize = this.projectService.getProjectDataDetailsProjectDescriptionSize();
    for (let i = 0; i < this.detailsDescriptionSize; i++) {
      this.detailsDescription.push(this.projectService.returnProjectDataDetailsProjectDescription(i));
    }

    //Project
    this.projectData = this.projectService.returnProjectDataUploads();

    if (this.projectData.MainPhotoUrl) {
      this.convertBase64ToImage(this.projectData.MainPhotoUrl);
    }

    //Photos
    this.secondaryPhotosSize = this.projectService.getProjectDataDetailsProjectPhotosSize();
    for (let i = 0; i < this.secondaryPhotosSize; i++) {
      this.secondaryPhotos.push(this.projectService.returnProjectDataDetailsProjectPhotos(i));
    }

    this.checkScreenSize();    
    this.likedProjects = new Array(this.filteredItems.length).fill(false);
    this.totalSlides = this.filteredItems.length; 
  }

  public getImage(): string {
    return this.image;
}
convertBase64ToImage(base64String: string): void {
  this.image = base64String;
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
  

    submitProject(): void {
      console.log('submitProject');
      this.projectService.sendProjectData().subscribe({ 
        next: (response) => {
          console.log(response);
          this.router.navigate(['/uploads-access-page ']);
        },
        error: (e: any) => {
          console.log(e);
        }
      });;
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