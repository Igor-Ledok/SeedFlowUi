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
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../services/auth.service';
import { ProjectList } from '../../models/project/return/project-list-data';
import { ProjectService } from '../../services/project.service';
import { UserInfo, UserService } from '../../services/user.service';
import { TopicDto } from '../../models/project/topic.interface';

@Component({
  selector: 'app-header',
  imports: 
  [
    MatSelectModule,
    FormsModule,
    CommonModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    NgFor,
    ReactiveFormsModule,
    RouterModule,
    TranslocoModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public projectsList: ProjectList[] = [];
  public userInfo: UserInfo;
  public statusjwt: boolean = false;
  public topics: TopicDto[] = [];

  public hasThree: boolean = false;

  activeTopicIndex: number = -1; // Инициализация переменной активной темы
  activeCategoryIndex: number = -1;

  onKvadratClick(event: Event)
  {
    const clickedElement = event.target as HTMLElement;
  
    // Убираем класс "highlighted" с всех изображений
    const allKvadratImages = document.querySelectorAll('img[src="assets/images/Kvadrat.png"]');
    allKvadratImages.forEach((img: any) => img.classList.remove('highlighted'));
  
    // Добавляем класс "highlighted" к текущему изображению
    clickedElement.classList.add('highlighted');
  }

  onAccountClick(): void {
    const role = this.userService.getUserRole();

    if(!this.statusjwt) {
      return; // Если статус jwt не валиден, ничего не делаем
    }
      
    if (!role) {
      this.router.navigate(['/login-page']); // Перенаправление на страницу логина
    } else {
      this.router.navigate(['/profile-page']); // Перенаправление на страницу аккаунта, если роль есть
    }
  }

  
  

  private hideHeight = 900;

  someString:string = 'UA';

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

  selectedLanguage = new FormControl('ua');

  ngOnInit() 
  {
    this.onLanguageChange({ value: this.selectedLanguage.value });

     // Скрыть элементы сразу при загрузке страницы, независимо от скролла
    const sidebar = this.elRef.nativeElement.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.add('hidden');
    }

  // Вызовем updateSidebarVisibility, чтобы учесть текущее положение скролла
    this.updateSidebarVisibility();

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
    this.totalSlides = this.filteredItems.length; // Инициализация общего количества слайдов


    this.loadCategories();

    this.projectService.hasLessThanThreeProjects().subscribe({
      next: (result) => {
        this.hasThree = result;
        console.log('Меньше трёх проектов:', result);
      },
      error: (err) => {
        console.error('Ошибка при проверке количества проектов', err);
      }
    });
  }

  showPopup = false;
  isWindowOpen2 = false;

  openPopup() 
  {
    this.showPopup = true;
    this.isWindowOpen2 = true;
  }
  
  closePopup() 
  {
    this.showPopup = false;
    this.isWindowOpen2 = false;
  }

  closeWindow2() {
    this.closePopup();
  }

  createProject(){
    const isAuthenticated = this.authService.isAuthenticated();
    if(this.hasThree){
      this.router.navigate(['/general-page']);
    } else if (!isAuthenticated) {
      this.router.navigate(['/login-page']);
    } else {
      this.router.navigate(['/max-projects-page']);
    }
  }

  exitAcaunt(){
    this.authService.logout();
  }

  loadCategories() {
    this.projectService.getTopics().subscribe((topics: TopicDto[]) => {
      this.topics = topics;
    });
  }
  
  onCategoryButtonPress(index: number) {
    this.activeCategoryIndex = index;
    this.activeSubCategoryIndex = null; // Сбросить выбранную категорию при изменении темы
  }
  
  // Обработчик для выбора категории
  onButtonPress(type: string, index: number) {
    if (type === 'category') {
      this.activeSubCategoryIndex = index; // Устанавливаем выбранную категорию
    }
  }

  selectCategory(j: number) {
    this.activeCategoryIndex = j;
    const categoryId = this.topics[this.activeTopicIndex].categories[j].id;

    // Запрос на получение проектов по выбранной категории
    this.projectService.getProjectByCategory(categoryId).subscribe(
      (data: ProjectList[]) => {
        this.projectsList = data; // Сохраняем проекты в массив
        console.log('Проекты по категории:', this.projects);
        for (let i = 0; i < this.projectsList.length; i++) {
          this.projectsList[i].categoryPhotoUrl = 'assets/images/' + this.projectsList[i].categoryPhotoUrl;
        }
        this.filteredItems = this.projectsList; 
        this.likedProjects = data.map(data => data.favorite);
      },
      (error) => {
        console.error('Ошибка при получении проектов:', error);
      }
    );
  }

  selectTopic(i: number) {
    this.activeTopicIndex = i;
    this.activeCategoryIndex = -1; // Сбросить активную категорию при выборе темы
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isGridView = window.innerWidth > 1350;
  }



  MATHPercentageOfMoney(collected: number, total: number): string {
    if (!total || total === 0) return '0%';
    const percent = (collected / total) * 100;
    return `${Math.min(percent, 100)}%`; // ограничим до 100%
  }

  constructor(
    private languageService: LanguageService, 
    private elRef: ElementRef,
    private authService: AuthService, 
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService) 
    {
      
    }

  @HostListener('window:scroll', [])
  onWindowScroll() 
  {
    this.updateSidebarVisibility();
  }

  private updateSidebarVisibility() {
    const sidebar = this.elRef.nativeElement.querySelector('.sidebar');

    if (sidebar) 
      {
      const scrollY = window.scrollY;

      if (scrollY < this.hideHeight) 
        {
        sidebar.classList.add('hidden'); // Добавляем класс для скрытия
      } else {
        sidebar.classList.remove('hidden'); // Убираем класс, если поднялись выше
      }
    }
  }

  switchLanguage(language: string) 
  {
    this.languageService.switchLanguage(language);
  }

  languages = [
    { code: 'en', name: 'EN' },
    { code: 'ua', name: 'UA' },
  ];

  submitProject() {
    alert('Форма подачи проекта открыта!');
  }

  images: string[] = [
    'assets/images/photo1.png',
    'assets/images/photo2.png',
    'assets/images/photo3.jpg',
  ];

  currentIndex: number = 0;

  collectedMoney: number = 135420;
  targetMoney: number = 500000;

  description: string =
    'Багато людей сьогодні потерпають від наслідків війни. Ця ініціатива покликана допомогти людям із ПТСР, військовим та їхнім родинам, або будь-кому, хто потребує тиші та миру. Хатинка на березі гірського озера саме те місце, де можна віднайти себе.';

  get progressPercentage(): number {
    return (this.collectedMoney / this.targetMoney) * 100;
  }

  previousImage() {
    this.currentIndex =
      this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
  }

  nextImage() {
    this.currentIndex =
      this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
  }

  supportProject() {
    console.log('Проект поддержан!');
  }

  partnerLogos = [
    { src: 'assets/images/workua.png', alt: 'WORK.ua' },
    { src: 'assets/images/psbusinessparks.png', alt: 'PS Business Parks' },
    { src: 'assets/images/monobank.png', alt: 'Monobank' },
    { src: 'assets/images/forbes.png', alt: 'Forbes' },
    { src: 'assets/images/linkedin.png', alt: 'LinkedIn' },
    { src: 'assets/images/sportmaster.png', alt: 'Спортмастер' },
  ];

  previewURLs: string[] = []; // Список загруженных фото
  activeButtonIndex: number = -1;
  activeStartupButtonIndex: number = -1;
  activeSocialButtonIndex: number = -1;
  activeHumanitarianButtonIndex: number = -1;
  activeSubCategoryIndex: number | null = null;

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

  dropdownOpen: boolean = false;

toggleDropdown2() {
  this.dropdownOpen = !this.dropdownOpen;
}

  socialRows = [this.socialButtons];

  activeTab: string = '';

  humanitarianRows = [this.humanitarianButtons]; 


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
  },
  { 
    title: 'фывфывфывфыв «Гуцульськ»', 
    description: 'Розвиток творчих майстерень', 
    image: 'assets/images/ventureCapital.png',
    topLeftImage: 'assets/images/HumanitarianBig.png', 
    progress: 45,
    value1: 25, 
    value2: 36, 
    value3: 25 
  }
];

filteredItems = this.projectsList;

  // filterResults() {
  //   if (this.searchText.trim() === '') {
  //     this.filteredItems = this.items;
  //   } else {
  //     this.filteredItems = this.items.filter(item =>
  //       item.title.toLowerCase().includes(this.searchText.toLowerCase())
  //     );
  //   }
  // }

  filterResults() {
    if (this.searchText.trim() === '') {
      this.filteredItems = this.projectsList;  // Если строка поиска пуста, показываем все проекты
    } else {
      this.filteredItems = this.projectsList.filter(item =>
        item.title.toLowerCase().includes(this.searchText.toLowerCase())  // Фильтруем только по названию
      );
    }
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const searchContainer = this.elRef.nativeElement.querySelector('.search-container');
    const searchInput = this.elRef.nativeElement.querySelector('.search-input');
    
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
    },
  ];

  currentInd = 0;
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

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isLiked: boolean = false;

  toggleLikeFirst() {
    this.isLiked = !this.isLiked;
  }

  goToImage(index: number) {
    this.currentIndex = index;
  }

  projects2 = [
    {
      title: 'Кафе «Коло мене»',
      image: 'assets/images/ventureCapital.png',  // Основное изображение для карточки
      topLeftImage: 'assets/images/rocketBig.png',  // Изображение для верхнего левого угла
      amountRaised: 135420,
      goal: 500000,
      progress: this.getProgress,
    },
    {
      title: 'Врятуймо степову лисицю',
      image: 'assets/images/womenBusiness.png',
      topLeftImage: 'assets/images/HumanitarianBig.png',  // Изображение для верхнего левого угла
      amountRaised: 135420,
      goal: 500000,
      progress: this.getProgress,
    },
    {
      title: 'Зливи не вщухають',
      image: 'assets/images/startups.png',
      topLeftImage: 'assets/images/socialBig.png',  // Изображение для верхнего левого угла
      amountRaised: 135420,
      goal: 500000,
      progress: this.getProgress,
    },
    {
      title: 'Майстерня «Ґудзик»',
      image: 'assets/images/ventureCapital.png',
      topLeftImage: 'assets/images/HumanitarianBig.png',  // Изображение для верхнего левого угла
      amountRaised: 135420,
      goal: 500000,
      progress: this.getProgress,
    },
    {
      title: 'Зливи не вщухають',
      image: 'assets/images/womenBusiness.png',
      topLeftImage: 'assets/images/rocketBig.png',  // Изображение для верхнего левого угла
      amountRaised: 135420,
      goal: 500000,
      progress: this.getProgress,
    },
    {
      title: 'Пекарня «Пампушка»',
      image: 'assets/images/startups.png',
      topLeftImage: 'assets/images/socialBig.png',  // Изображение для верхнего левого угла
      amountRaised: 135420,
      goal: 500000,
      progress: this.getProgress,
    },
  ];
  
  scrollTo(targetId: string) {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
  

  

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
    return (project.amountRaised / project.goal) * 100;
  }

  scrollToSection() {
    const element = document.getElementById('targetSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToSection2() {
    const element = document.getElementById('targetSection2');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToSection3() {
    const element = document.getElementById('targetSection3');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  


PercentageOfMoney(num1: number,num2: number): number {
return Math.round((num1 / num2) * 100);
}

  onButtonClick(buttonName: string) 
  {
    console.log(`Клик по кнопке: ${buttonName}`);
  }

  isWindowOpen: boolean = false;

  closeWindow() 
  {
    this.isWindowOpen = false;
  }

  openWindow() {
    this.isWindowOpen = true;
  }

  isGridView = true;
  currentIndex2 = 0;
  totalSlides = 0;

  prevSlide2() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    else {
      this.currentIndex = this.totalSlides - 1;
    }
  }

  nextSlide2() 
  {
    if (this.currentIndex < this.filteredItems.length - 1) 
    {
      this.currentIndex++;
    }
    else {
      this.currentIndex = 0;
    }
  }

  isSocialMediaListVisible: boolean[] = [];

  toggleSocialMediaList(index: number) {
    this.isSocialMediaListVisible[index] = !this.isSocialMediaListVisible[index];
  }

  isHoveredArray: boolean[] = new Array(this.filteredItems.length).fill(false);
  likedProjects2: boolean[] = new Array(this.filteredItems.length).fill(false);


  toggleLike2(index: number, projectId: string): void {
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

    // Закрытие выпадающего меню
    closeDropdown() {
      this.showDropdown = false;
    }

    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    }
}
