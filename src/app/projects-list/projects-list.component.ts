import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  importProvidersFrom,
  OnInit,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../services/language.service';
import { ProjectList } from '../models/project/project-list-data';
import { ProjectService } from '../services/project.service';
import { CategoryDto, TopicDto } from '../models/project/topic.interface';
import { FilterRequestDto } from '../models/request/filter-request-dto';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [
    MatSelectModule,
    FormsModule,
    CommonModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    NgFor,
    ReactiveFormsModule,
    RouterModule,
    TranslocoModule,
  ],

  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})

export class ProjectsListComponent 
{
  previewURLs: string[] = []; // Список загруженных фото
  activeButtonIndex: number = -1;
  activeStartupButtonIndex: number = -1;
  activeSocialButtonIndex: number = -1;
  activeHumanitarianButtonIndex: number = -1;
  activeCategoryIndex: number = -1;
  public projectsList: ProjectList[] = [];
  public projectsInactiveList: ProjectList[] = [];
  
  public maxSum: number = 0;
  public topics: TopicDto[] = [];
  public filterRequest: FilterRequestDto = {
    startSum: 0,
    endSum: 0,
    categories: []
  };

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

  constructor(
  private route: ActivatedRoute,
  private eRef: ElementRef,
  private languageService: LanguageService,
  private projectService: ProjectService
  ) 
  {

  }
        




  ngOnInit() 
  {
    this.route.url.subscribe(urlSegments => {
      this.activeTab = urlSegments.length > 1 ? urlSegments[1].path : 'general';
    });

    this.getActiveProjects();
    this.getInactiveProjects();
    
    const savedLanguage = localStorage.getItem('selectedLanguage') ||'ua'; 
    this.selectedLanguage.setValue(savedLanguage);
    this.onLanguageChange({ value: savedLanguage });

    this.checkScreenSize();
    this.likedProjects = new Array(this.filteredItems.length).fill(false);
    this.totalSlides = this.filteredItems.length;

    this.loadTopics();
  }

  // loadTopics(): void {
  //   this.projectService.getTopics().subscribe((data: TopicDto[]) => {
  //     this.topics = data;
  //     console.log('Полученные темы:', this.topics);
  //   });
  // }
  loadTopics(): void {
    this.projectService.getTopics().subscribe((data: TopicDto[]) => {
      this.topics = data.map(topic => ({
        ...topic,
        categories: topic.categories.map(category => ({
          ...category,
          checked: false
        }))
      }));
      console.log('Полученные темы:', this.topics);
    });
  }

  buildFilterRequest(): void {
    const selectedCategories: CategoryDto[] = [];
    for (const topic of this.topics) {
      for (const category of topic.categories) {
        if (category.checked) {
          selectedCategories.push({
            id: category.id,
            name: category.name,
            topicId: category.topicId,
            photo: category.photo
          });
        }
      }
    }
  
    this.filterRequest = {
      startSum: this.startLabel,
      endSum: this.endLabel,
      categories: selectedCategories
    };
  
    console.log('Сформирован фильтр:', this.filterRequest);
  }


  filter(): void {
    const selected = this.topics
      .flatMap(topic => topic.categories)
      .filter(cat => cat.checked);
  
    this.filterRequest = {
      startSum: this.startLabel,
      endSum: this.endLabel,
      categories: selected
    };
    console.log('Фильтр:', this.filterRequest);

    this.projectService.filterProjects(this.filterRequest).subscribe( 
      (data: ProjectList[]) => {
        this.projectsList = data;
        for (let i = 0; i < this.projectsList.length; i++) {
          this.projectsList[i].categoryPhotoUrl = 'assets/images/' + this.projectsList[i].categoryPhotoUrl;
        }
        this.totalSlides = this.projectsList.length; // если надо
        this.likedProjects = this.projectsList.map(project => project.favorite);
      },
      (error: any) => {
        console.error('Ошибка загрузки проектов', error);
      }
    );
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isGridView = window.innerWidth > 1350;
  }

  getActiveProjects(): void {
    this.projectService.getActiveProjects().subscribe(
      (data: ProjectList[]) => {
        this.projectsList = data;
        for (let i = 0; i < this.projectsList.length; i++) {
          this.projectsList[i].categoryPhotoUrl = 'assets/images/' + this.projectsList[i].categoryPhotoUrl;
        }
        this.totalSlides = this.projectsList.length; // если надо
        this.likedProjects = this.projectsList.map(project => project.favorite);
      },
      (error: any) => {
        console.error('Ошибка загрузки проектов', error);
      }
    );
  }
  getInactiveProjects(): void{
    this.projectService.getInactiveProjects().subscribe(
      (data: ProjectList[]) => {
        this.projectsInactiveList = data;
        for (let i = 0; i < this.projectsInactiveList.length; i++) {
          this.projectsInactiveList[i].categoryPhotoUrl = 'assets/images/' + this.projectsInactiveList[i].categoryPhotoUrl;
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





  // Актуальные - Завершенные

  showActive = true;

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
    },
    {
      title: 'Кафе «Коло мене»',
      image: 'assets/images/ventureCapital.png',
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
      title: 'Кафе «Коло мене»',
      image: 'assets/images/ventureCapital.png',
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
    }
  ];

      
  likedProjects: boolean[] = new Array(this.projectsList.length).fill(false);


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


  setActiveTab(isActive: boolean) {
    this.showActive = isActive;
  }


  projects = [
    {
      title: 'ПЕКАРНЯ «НА РОЗІ»',
      image: 'assets/images/credit.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: '«ЗЕРНО НАДІЇ»',
      image: 'assets/images/investments.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: 'ШКОЛА ТАНЦІВ',
      image: 'assets/images/womenBusiness.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: 'НОВИЙ ПРОЄКТ',
      image: 'assets/images/startups.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: 'РЕСТОРАН',
      image: 'assets/images/ventureCapital.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },{
      title: 'ШКОЛА ТАНЦІВ',
      image: 'assets/images/womenBusiness.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: 'НОВИЙ ПРОЄКТ',
      image: 'assets/images/startups.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: 'РЕСТОРАН',
      image: 'assets/images/ventureCapital.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: 'ШКОЛА ТАНЦІВ',
      image: 'assets/images/womenBusiness.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: 'НОВИЙ ПРОЄКТ',
      image: 'assets/images/startups.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: 'РЕСТОРАН',
      image: 'assets/images/ventureCapital.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: 'РЕСТОРАН',
      image: 'assets/images/ventureCapital.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: 'НОВИЙ ПРОЄКТ',
      image: 'assets/images/startups.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: 'РЕСТОРАН',
      image: 'assets/images/ventureCapital.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    },
    {
      title: 'РЕСТОРАН',
      image: 'assets/images/ventureCapital.png',
      closingDate: '21.01.2025',
      participants: 187,
      amount: 508251,
      percentage: 103,
    }
  ];

  currentIndex: number = 0;
  visibleItems = 3;

  nextSlide() {
    if (this.currentIndex < this.projects.length - this.visibleItems) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.projects.length - this.visibleItems;
    }
  }

  isFilterModalOpen: boolean = false;
  isFilterActive: boolean = false; // Для отслеживания активного состояния фильтра

  toggleFilterModal(): void {
    this.isFilterModalOpen = !this.isFilterModalOpen;
    this.isFilterActive = !this.isFilterActive; // Меняем состояние фильтра
  }

          progress: number = 0;  // Начальный прогресс в процентах
  startLabel: number = 0;  // Начальная сумма
  endLabel: number = 700000;  // Конечная сумма
  isMoving: boolean = false;  // Флаг для отслеживания, двигается ли ползунок
  startX: number = 0;  // Начальная позиция мыши
  startProgress: number = 0;  // Начальный прогресс

  // Метод для вычисления текущей суммы на прогресс-баре
  updateStartLabel(): void {
    const range = this.endLabel - this.startLabel;  // Диапазон от 0 до конечной суммы
    this.startLabel = Math.round((this.progress / 100) * range);  // Вычисляем текущую сумму на прогресс-бара
  }

  // Начинаем движение ползунка
  startMove(event: MouseEvent): void {
    this.isMoving = true;
    this.startX = event.clientX;
    this.startProgress = this.progress;
    event.preventDefault();
  }

  // Двигаем ползунок
  move(event: MouseEvent): void {
    if (this.isMoving) {
      const delta = event.clientX - this.startX; // Разница между текущим положением мыши и начальным
      const progressBarWidth = document.querySelector('.progress-bar-container')?.clientWidth || 0;
      let newProgress = this.startProgress + (delta / progressBarWidth) * 100; // Новое значение прогресса

      if (newProgress < 0) newProgress = 0; // Ограничиваем минимальное значение
      if (newProgress > 100) newProgress = 100; // Ограничиваем максимальное значение

      this.progress = newProgress; // Обновляем прогресс
      this.updateStartLabel(); // Обновляем метку на начале
    }
  }

  // Останавливаем движение ползунка
  stopMove(): void {
    this.isMoving = false;
  }

  get dynamicStartLabel(): number {
    return Math.round((this.progress / 100) * this.endLabel);  // Динамическое вычисление метки
  } 







  
  // Переменная для отслеживания видимости модального окна
  isSortModalVisible = false;

  // Метод для переключения видимости модального окна
  toggleSortModal() {
    console.log('toggleSortModal вызван'); // Для отладки
    this.isSortModalVisible = !this.isSortModalVisible;
  }

  // Метод для закрытия модального окна
  closeSortModal() {
    console.log('closeSortModal вызван'); // Для отладки
    this.isSortModalVisible = false;
  }





   // Массив с текстами ссылок
   links = [
    'За датою (спочатку нові)',
    'За датою (спочатку старі)',
    'За сумою збору (спочатку вища)',
    'За сумою збору (спочатку нижча)',
    'За % зібнаної суми (спочатку найвищий)',
    'За % зібраної суми (спочатку найнижчий)'
  ];

  // Индекс выбранной ссылки
  selectedLinkIndex: number | null = null;

  // Метод для изменения цвета при клике
  changeColor(index: number) {
    this.selectedLinkIndex = index;
    if (this.selectedLinkIndex == 0)[ // 1
      this.projectService.GetProjectsFirstDate().subscribe( // метод  меняеться
        (data: ProjectList[]) => {
          this.projectsList = data;
          for (let i = 0; i < this.projectsList.length; i++) {
            this.projectsList[i].categoryPhotoUrl = 'assets/images/' + this.projectsList[i].categoryPhotoUrl;
          }
          this.totalSlides = this.projectsList.length; // если надо
          this.likedProjects = this.projectsList.map(project => project.favorite);
        },
        (error: any) => {
          console.error('Ошибка загрузки проектов', error);
        }
      )
    ] 
    if (this.selectedLinkIndex == 1){ // 1
      this.projectService.GetProjectsLastDate().subscribe( // метод  меняеться
        (data: ProjectList[]) => {
          this.projectsList = data;
          for (let i = 0; i < this.projectsList.length; i++) {
            this.projectsList[i].categoryPhotoUrl = 'assets/images/' + this.projectsList[i].categoryPhotoUrl;
          }
          this.totalSlides = this.projectsList.length; // если надо
          this.likedProjects = this.projectsList.map(project => project.favorite);
        },
        (error: any) => {
          console.error('Ошибка загрузки проектов', error);
        }
      )
    }
    if (this.selectedLinkIndex == 2){ // 2
      this.projectService.GetProjectsMaxCollection().subscribe( // метод  меняеться
        (data: ProjectList[]) => {
          this.projectsList = data;
          for (let i = 0; i < this.projectsList.length; i++) {
            this.projectsList[i].categoryPhotoUrl = 'assets/images/' + this.projectsList[i].categoryPhotoUrl;
          }
          this.totalSlides = this.projectsList.length; // если надо
          this.likedProjects = this.projectsList.map(project => project.favorite);
        },
        (error: any) => {
          console.error('Ошибка загрузки проектов', error);
        }
      )
    }
    if (this.selectedLinkIndex == 3){ // 3
      this.projectService.GetProjectsMinCollection().subscribe( // метод  меняеться
        (data: ProjectList[]) => {
          this.projectsList = data;
          for (let i = 0; i < this.projectsList.length; i++) {
            this.projectsList[i].categoryPhotoUrl = 'assets/images/' + this.projectsList[i].categoryPhotoUrl;
          }
          this.totalSlides = this.projectsList.length; // если надо
          this.likedProjects = this.projectsList.map(project => project.favorite);
        },
        (error: any) => {
          console.error('Ошибка загрузки проектов', error);
        }
      )
    }
    if (this.selectedLinkIndex == 4){ // 4
      this.projectService.GetProjectsByMaxPercentage().subscribe( // метод  меняеться
        (data: ProjectList[]) => {
          this.projectsList = data;
          for (let i = 0; i < this.projectsList.length; i++) {
            this.projectsList[i].categoryPhotoUrl = 'assets/images/' + this.projectsList[i].categoryPhotoUrl;
          }
          this.totalSlides = this.projectsList.length; // если надо
          this.likedProjects = this.projectsList.map(project => project.favorite);
        },
        (error: any) => {
          console.error('Ошибка загрузки проектов', error);
        }
      )
    }
    if (this.selectedLinkIndex == 5){ // 5
      this.projectService.GetProjectsByMinPercentage().subscribe( // метод  меняеться
        (data: ProjectList[]) => {
          this.projectsList = data;
          for (let i = 0; i < this.projectsList.length; i++) {
            this.projectsList[i].categoryPhotoUrl = 'assets/images/' + this.projectsList[i].categoryPhotoUrl;
          }
          this.totalSlides = this.projectsList.length; // если надо
          this.likedProjects = this.projectsList.map(project => project.favorite);
        },
        (error: any) => {
          console.error('Ошибка загрузки проектов', error);
        }
      )
    }
  }




  
  completedProjects = [
    { title: 'Медицина', amountRaised: 10000, goal: 10000, image: 'assets/images/investments.png' },
    { title: 'Екологія', amountRaised: 7000, goal: 7000, image: 'assets/images/investments.png' },
  ];

  // Пример метода для обработки клика по кнопке
  onButtonClick(buttonName: string) {
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
  currentIndex2 = 0;
  totalSlides = 0;

  prevSlide2() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    else {
      this.currentIndex = this.totalSlides - 1; // Переход на последний слайд
    }
  }

  nextSlide2() {
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



