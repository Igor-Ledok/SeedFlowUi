import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { LanguageService } from '../services/language.service';
import { general } from '../models/project/general.interface';
import { ProjectService } from '../services/project.service';
import { TopicDto } from '../models/project/topic.interface';
import { UserInfo, UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-general',
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
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent 
{
  activeButtonIndex: number = -1;
  activeStartupButtonIndex: number = -1;
  activeSocialButtonIndex: number = -1;
  activeHumanitarianButtonIndex: number = -1;
  activeCategoryIndex: number = null;
  activeCategoryId: string | null = null;
  selectedCategoryName: string | null = null; // Название выбранной категории
  topics: TopicDto[] = []; // Массив с тегами

  public userInfo: UserInfo;
  public statusjwt: boolean = false;

  projectData: general = {} as general; // Ініціалізація даних проекту

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

  socialRows = [this.socialButtons];

  humanitarianRows = [this.humanitarianButtons]; 

  onCategoryButtonPress2(index: number): void {
    this.activeCategoryIndex = index;
    this.activeStartupButtonIndex = -1;
    this.activeSocialButtonIndex = -1;
    this.activeHumanitarianButtonIndex = -1;
  }

  onCategoryButtonPress(index: string): void {
    this.projectData.SelectedCategoryId = index;
    this.activeCategoryId = this.projectData.SelectedCategoryId;
    this.activeStartupButtonIndex = -1;
    this.activeSocialButtonIndex = -1;
    this.activeHumanitarianButtonIndex = -1;

    if (!this.activeCategoryId) 
      {
        this.errorMessages['categories'] = 'Будь ласка, виберіть хоча б одну категорію. Це обов\'язково!';
      } 
      else 
      {
        delete this.errorMessages['categories'];
      }

    console.log('Selected category ID:', this.projectData.SelectedCategoryId);
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
    
    if (!searchContainer.contains(event.target) ) 
    {
      this.showDropdown = false;
      searchInput.blur();
    }
  }

  isActive(categoryId: string): boolean {
    return this.activeCategoryId === categoryId;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) 
  {
    this.showDropdown = false;
  }

  

  previewURL: string = '';

    tabs = [
      { key: 'general', label: 'ЗАГАЛЬНЕ' },
      { key: 'details', label: 'ДЕТАЛІ' },
      { key: 'team', label: 'КОМАНДА' },
      { key: 'rewards', label: 'ВИНАГОРОДИ' },
      { key: 'requisites', label: 'РЕКВІЗИТИ' },
      { key: 'uploads', label: 'ВИКЛАСТИ' }
    ];
  
    activeTab: string = '';
  
    constructor(
      private router: Router, 
      private route: ActivatedRoute,
      private eRef: ElementRef,
      private languageService: LanguageService,
      private projectService: ProjectService,
      private authService: AuthService, 
      private userService: UserService) {}
  
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
      this.route.url.subscribe(urlSegments => {
        this.activeTab = urlSegments.length > 1 ? urlSegments[1].path : 'general';
      });

      this.projectData = this.projectService.returnProjectDataGeneral();

      this.checkScreenSize();    
      this.activeCategoryId = this.projectData.SelectedCategoryId;
      this.likedProjects = new Array(this.filteredItems.length).fill(false);
      this.totalSlides = this.filteredItems.length; // Инициализация общего количества слайдов
      this.loadTopics();
    
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
    
    }
  
    navigate(tabKey: string) {
      this.activeTab = tabKey;
      this.router.navigate([tabKey + '-page', tabKey]);
    }

    loadTopics(): void {
      this.projectService.getTopics().subscribe((data: TopicDto[]) => {
        this.topics = data;
        console.log('Полученные темы:', this.topics);
      });
    }

  // загатовка на будушее
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
  
    this.selectedFile = input.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewURL = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
  
  base64String: string = '';
  
  onFileSelectedPhoto(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file: File = inputElement.files ? inputElement.files[0] : null;
  
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      this.isFileInvalid = true;
      this.errorMessage = 'Неприпустимий формат файлу';
      this.projectData.MainPhotoUrl = null;
      return;
    }

    if (file) {
      const reader = new FileReader();
      
      reader.onload = () => 
      {
        const base64File = reader.result as string;
  
        if (typeof base64File === 'string') 
        {
          console.log('Base64 файл: ', base64File);
          this.projectData.MainPhotoUrl = base64File;
        } else {
          console.error('Результат не строка');
        }
      };
      
      reader.readAsDataURL(file);
    }
  }
  
  // Метод для завантаження файлу бізнес-плану
  onFileSelectedDocx(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    // Проверяем, был ли выбран файл
    if (!input.files || input.files.length === 0) {
      this.fileError = 'Будь ласка, виберіть файл.';
      this.projectData.BudgetPlanUrl = null;
      this.projectData.SelectedFileNameDocx = null;
      this.validateBudgetFields();
      return;
    }
  
    const file = input.files[0];
    const allowedExtensions = ['doc', 'docx', 'pdf'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
    // Проверка формата файла
    if (!allowedExtensions.includes(fileExtension || '')) {
      this.fileError = 'Дозволені лише файли .doc, .docx, .pdf';
      this.projectData.BudgetPlanUrl = null;
      this.projectData.SelectedFileNameDocx = null;
      this.validateBudgetFields();
      return;
    }
  
    this.fileError = '';
    this.projectData.SelectedFileNameDocx = file.name;
    this.validateBudgetFields();
  
    // Конвертация файла в Base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64File = reader.result as string;
      if (typeof base64File === 'string') {
        this.projectData.BudgetPlanUrl = base64File;
      } else {
        console.error('Помилка: Результат не є строкою');
      }
    };
    reader.readAsDataURL(file);
  }
  
  clearFile(): void {
    this.projectData.BudgetPlanUrl = null;
    this.projectData.SelectedFileNameDocx = null;
  }

  

  removePhoto(): void 
  {
    this.selectedFile = null;
    this.previewURL = '';
    this.projectData.MainPhotoUrl = '';
  }

  savePhoto(): void 
  {
    console.log('кнопка Фото отправлено/сохранено работает');
  }

  closePopup() {
    this.isPopupOpen = false;  // Закрытие попапа
  }

  saveGeneralData(): void {
    this.projectService.getProjectDataGenerel(this.projectData);

    this.isPopupOpen = true;
  }

  submitProject(): void {
    console.log('кнопка отправить работает');
  }

  charCount: number = 0;
  charCount2: number = 0;

  updateCharCount() 
  {
    this.charCount = this.projectData.Title?.length || 0;
  }

  updateCharCountStr() 
  {
    this.charCount2 = this.projectData.BudgetPlan?.length || 0;
  }

  categories: { [key: string]: string[] } = {
    Стартапи: ['освіта', 'культура', 'медицина', 'харчування', 'транспорт', 'музика', 'дизайн', 'література', 'діти', 'кіно', 'медіа', 'технології'],
    Соціальні: ['освіта', 'наука', 'культура', 'мистецтво', 'медицина'],
    Гуманітарні: ['воєнні дії', 'стихійні лиха', 'техногенні катастрофи', 'екологія']
  };

  selectedButton: string | null = null;

  errorMessages: { [key: string]: string } = {};



  selectButton(event: MouseEvent, category: string, subcategory: string) { 
    // Создаем уникальный идентификатор для каждой кнопки, например "Категория_Подкатегория"
    const buttonId = `${category}_${subcategory}`;
  
    this.selectedButton = buttonId; // Устанавливаем выбранную кнопку
    
    // Убираем ошибку, если хотя бы одна кнопка выбрана
    if (this.selectedButton) {
      delete this.errorMessages['categories'];
    }
  }

  isActiveButton(category: string, subcategory: string): boolean {
    // Проверяем, активна ли кнопка (сравниваем уникальный идентификатор)
    const buttonId = `${category}_${subcategory}`;
    return this.selectedButton === buttonId;
  }

  validateCategories() 
  {
    let isValid = true;
  
    // Проверяем, была ли выбрана хотя бы одна кнопка
    if (!this.activeCategoryId) 
    {
      this.errorMessages['categories'] = 'Будь ласка, виберіть хоча б одну категорію. Це обов\'язково!';
      isValid = false;
    } 
    else 
    {
      delete this.errorMessages['categories'];
    }
  
    return isValid;
  }

  collectionAmountError: string = '';
  projectTitleError: string = '';

handleNextClick() {
  //this.saveGeneralData(); // Сохраняем данные перед переходом

  const isValid = this.validateCategories();
  let isValid2 = true;

  // Валидация тривалості збору
  const duration = this.projectData.CollectionDuration;
  if (duration == null || duration < 30 || duration > 180) {
    this.collectionDurationError = 'Тривалість збору має бути від 30 до 180 днів';
    isValid2 = false;
  } else {
    this.collectionDurationError = '';
  }

  // Валидация фото обкладинки
  if (!this.projectData.MainPhotoUrl) {
    this.errorMessage = 'Будь ласка, завантажте фото обкладинки';
    isValid2 = false;
  } else {
    this.errorMessage = '';
  }

  // Валидация суми збору
  if (this.projectData.CollectionAmount < 10) {
    this.collectionAmountError = 'Заповніть суму збору. Це обовязково!';
    isValid2 = false;
  }
  if (!this.projectData.CollectionAmount) {
    this.collectionAmountError = 'Мінімальна сума збору – 10 грн';
    isValid2 = false;
  }
  else {
    this.collectionAmountError = '';
  }

  // Валидация заголовку
  if (!this.projectData.Title || this.projectData.Title.trim() === '') {
    this.projectTitleError = 'Будь ласка, введіть назву проєкту';
    isValid2 = false;
  }

  // Переход на следующую страницу, если всё ок
  if (isValid && isValid2) {
    this.router.navigate(['/detail-page']);
  } else {
    console.log('Є помилки в даних:', {
      selectedFile: this.selectedFile,
      previewURL: this.previewURL,
      title: this.projectData.Title,
      collectionAmount: this.projectData.CollectionAmount,
      collectionDuration: this.projectData.CollectionDuration
    });
  }
}

onAmountChange() 
{
  if (!this.projectData.CollectionAmount || this.projectData.CollectionAmount < 10) {
    // this.collectionAmountError = '';
  } else {
    this.collectionAmountError = '';
  }
}

isPopupOpen: boolean = false;

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
  

  fileError: string = ''; 
  budgetError: string = '';
  selectedFile: File | null = null;
  
  
  validateBudgetFields() 
  {
    const text = this.projectData.BudgetPlanUrl?.trim(); 
    
    if (!this.projectData.BudgetPlan) {
      this.fileError = 'Необхідно заповнити текст.';
    } else {
      this.fileError = ''; // Очистка ошибки, если условие выполнено
    }

    if (text) 
    {
      this.fileError = '';
    }

    if (!text && !this.selectedFile) 
    {
      this.budgetError = 'Будь ласка, введіть текст або завантажте файл';
      return;
    }
  
    if (text && text.length < 10) 
    {
      this.budgetError = 'Текст має містити щонайменше 10 символів';
      return;
    }
  
    this.budgetError = '';
  }
  
  onFileSelectedDocx2(event: any) 
  {
    const file = event.target.files[0];
    if (file) {
      const allowedExtensions = ['doc', 'docx', 'pdf'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
      if (!allowedExtensions.includes(fileExtension || '')) 
      {
        this.fileError = 'Дозволені лише файли .doc, .docx, .pdf';
        this.selectedFile = null;
        this.validateBudgetFields();
        return;
      }
  
      this.fileError = '';
      this.selectedFile = file;
      this.validateBudgetFields();
    } else {
      this.selectedFile = null;
      this.fileError = '';
      this.validateBudgetFields();
    }
  }

  collectionDurationError: string = ''; // Ошибка при некорректном введении срока сбора

// Функция для валидации поля
validateCollectionDuration(collectionDuration: any) 
{
  if (collectionDuration.invalid)
  {
    if (collectionDuration.errors?.required) 
    {
      this.collectionDurationError = 'Заповніть тривалість збору. Це обов\'язково';
    } 
    else if (collectionDuration.errors?.min) 
    {
      this.collectionDurationError = 'Мінімальна тривалість збору - 30 днів';
    } 
    else if (collectionDuration.errors?.max) 
    {
      this.collectionDurationError = 'Максимальна тривалість збору - 180 днів';
    }
  } 
  else 
  {
    this.collectionDurationError = '';
  }
}


isFileInvalid: boolean = false;
errorMessage: string = '';
  
onFileSelectedPhoto2(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) 
  {
    const file = input.files[0];

    // Проверка наличия файла
    if (!file) 
    {
      this.isFileInvalid = true;
      this.errorMessage = 'Будь ласка, виберіть файл.';
      return;
    }

    // Проверка типа файла
    const validFormats = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validFormats.includes(file.type))
    {
      this.isFileInvalid = true;
      this.errorMessage = 'Будь ласка, виберіть файл формату JPEG, JPG або PNG.';
      return;
    }

    // Если файл прошел все проверки
    this.previewURL = URL.createObjectURL(file); // для превью изображения
    this.isFileInvalid = false;  // Сброс ошибки
    this.errorMessage = '';      // Очищаем сообщение об ошибке
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
