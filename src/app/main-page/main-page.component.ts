import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  importProvidersFrom,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../services/language.service';
import { AuthService } from '../services/auth.service';
import { ProjectList } from '../models/project/return/project-list-data';
import { ProjectService } from '../services/project.service';
import { UserInfo, UserService } from '../services/user.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-main-page',
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
    HeaderComponent,
    FooterComponent
],

  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})

export class MainPageComponent 
{
  public projectsInactiveList: ProjectList[] = [];
  public projectsListLastThree: ProjectList[] = [];
  public hotProjects: ProjectList[] = [];
  public userInfo: UserInfo;
  public statusjwt: boolean = false;

  public hasThree: boolean = false;

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

    this.projectService.hasLessThanThreeProjects().subscribe({
      next: (result) => {
        this.hasThree = result;
        console.log('Меньше трёх проектов:', result);
      },
      error: (err) => {
        console.error('Ошибка при проверке количества проектов', err);
      }
    });

    // Вызовем updateSidebarVisibility, чтобы учесть текущее положение скролла
    this.updateSidebarVisibility();

    this.getInactiveProjects();



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

    this.GetLastThreeProjectById();

    this.checkScreenSize();    
    this.likedProjects = new Array(this.filteredItems.length).fill(false);
    this.totalSlides = this.filteredItems.length; // Инициализация общего количества слайдов

    this.projectService.getTopFundedActualProject().subscribe({
      next: (project) => {
        this.hotProjects = [project]; // ✅ безопаснее, чем push
        if (this.hotProjects[0]?.categoryPhotoUrl) {
          this.hotProjects[0].categoryPhotoUrl = 'assets/images/' + this.hotProjects[0].categoryPhotoUrl;
        }
        console.log('Проект для баннера:', this.hotProjects[0]);
      },
      error: (err) => {
        console.error('Ошибка при загрузке проекта:', err);
      },
    });
    
  
  }

  GetLastThreeProjectById(): void {
    this.projectService.getLastThreeProjectById().subscribe(
      (data: ProjectList[]) => {
        this.projectsListLastThree = data;
        for (let i = 0; i < this.projectsListLastThree.length; i++) {
          this.projectsListLastThree[i].categoryPhotoUrl = 'assets/images/' + this.projectsListLastThree[i].categoryPhotoUrl;
        }
        console.log(this.projectsListLastThree);
        this.likedProjects = data.map(data => data.favorite); // предполагается, что сервер отдает поле isLiked
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

  dropdownOpen: boolean = false;

toggleDropdown2() {
  this.dropdownOpen = !this.dropdownOpen;
}

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

@ViewChild('carouselTrack') carouselTrackRef!: ElementRef;

isDragging = false;
startX = 0;
currentTranslate = 0;
prevTranslate = 0;
dragMoved = false;

onDragStart(event: MouseEvent) {
  this.isDragging = true;
  this.dragMoved = false;
  this.startX = event.clientX;
  this.prevTranslate = this.currentTranslate;
}

onDragMove(event: MouseEvent) {
  if (!this.isDragging) return;

  const dx = event.clientX - this.startX;
  this.currentTranslate = this.prevTranslate + dx;
  this.dragMoved = Math.abs(dx) > 5;

  const track = this.carouselTrackRef.nativeElement as HTMLElement;

  // Ограничения по краям
  const maxTranslate = 0;
  const minTranslate = -(
    track.scrollWidth - track.parentElement!.clientWidth
  );

  this.currentTranslate = Math.min(maxTranslate, Math.max(minTranslate, this.currentTranslate));
  track.style.transition = 'none';
  track.style.transform = `translateX(${this.currentTranslate}px)`;
}

onDragEnd() {
  this.isDragging = false;
}

onClick(event: MouseEvent) {
  if (this.dragMoved) {
    event.preventDefault(); // Блокируем переход по ссылке
    event.stopImmediatePropagation();
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


  investors = [
    { rank: 1, name: 'Прізвище Ім’я', photo: 'assets/images/investor1.png' },
    { rank: 2, name: 'Прізвище Ім’я', photo: 'assets/images/investor2.png' },
    { rank: 3, name: 'Прізвище Ім’я', photo: 'assets/images/investor3.png' },
    { rank: 4, name: 'Прізвище Ім’я', photo: 'assets/images/investor4.png' },
    { rank: 5, name: 'Прізвище Ім’я', photo: 'assets/images/investor5.webp' },
    { rank: 6, name: 'Прізвище Ім’я', photo: 'assets/images/investor6.png' },
    { rank: 7, name: 'Прізвище Ім’я', photo: 'assets/images/investor7.jpeg' },
    { rank: 8, name: 'Прізвище Ім’я', photo: 'assets/images/investor8.png' },
    { rank: 9, name: 'Прізвище Ім’я', photo: 'assets/images/investor9.png' },
    { rank: 10, name: 'Прізвище Ім’я', photo: 'assets/images/investor10.jpeg' },
  ];

  blogPosts = [
    {
      title: 'Кредит чи лізинг',
      image: 'assets/images/credit.png',
      description:
        'Вибір між кредитом і лізингом залежить від вашої фінансової ситуації, потреб і планів на майбутнє...',
    },
    {
      title: 'Інвестиційні можливості в Україні сьогодні',
      image: 'assets/images/investments.png',
      description:
        'Вибір між кредитом і лізингом залежить від вашої фінансової ситуації, потреб і планів на майбутнє...',
    },
    {
      title: 'Жінки в бізнесі в країнах Середньої Азії',
      image: 'assets/images/womenBusiness.png',
      description:
        'Жінки у бізнесі в Середній Азії стикаються як з можливостями, так і з викликами...',
    },
    {
      title: 'Стартапи України',
      image: 'assets/images/startups.png',
      description:
        'Вибір між кредитом і лізингом залежить від вашої фінансової ситуації, потреб і планів на майбутнє...',
    },
    {
      title: 'Карпатський ліс',
      image: 'assets/images/forest.png',
      description:
        'Карпатський ліс - це важлива природна система, яка охоплює величезні території в горах Карпат, які розташовані в кількох...',
    },
    {
      title: 'Венчурний капітал',
      image: 'assets/images/ventureCapital.png',
      description:
        'Реалізація венчурного капіталу - це складний процес, який включає кілька етапів, від збору коштів до оцінки...',
    },
  ];

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
  

  

  likedProjects: boolean[] = new Array(this.projectsListLastThree .length).fill(false);


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
}
