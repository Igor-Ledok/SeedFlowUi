import { ChangeDetectorRef, Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { details } from '../models/project/send/datails.interface';
import { ProjectService } from '../services/project.service';
import { detailsdescription } from '../models/project/send/datailsDescription.interface';
import { UserInfo, UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    TranslocoModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent 
{  
  activeButtonIndex: number = -1;
  activeStartupButtonIndex: number = -1;
  activeSocialButtonIndex: number = -1;
  activeHumanitarianButtonIndex: number = -1;
  activeCategoryIndex: number = -1;

  projectPhotosSize: number = 0;
  projectPhotos: string[] = [];

  projectDescriptionSize: number = 0;
  projectDescription: detailsdescription[] = [];

  projectData: details = {} as details;
  
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

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private eRef: ElementRef,
    private languageService: LanguageService,
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService, 
    private userService: UserService ) 
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




  ngOnInit() 
  {
    this.route.url.subscribe(urlSegments => {
      this.activeTab = urlSegments.length > 1 ? urlSegments[1].path : 'general';
    });
    this.projectData = this.projectService.returnProjectDataDetails();

    this.projectPhotosSize = this.projectService.getProjectDataDetailsProjectPhotosSize();
    for (let i = 0; i < this.projectPhotosSize; i++){
      this.projectPhotos.push(this.projectService.returnProjectDataDetailsProjectPhotos(i));
    }

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

    this.projectDescriptionSize = this.projectService.getProjectDataDetailsProjectDescriptionSize();
    for (let i = 0; i < this.projectDescriptionSize; i++){
      const description = this.projectService.returnProjectDataDetailsProjectDescription(i);
      if (i === 0) {
        this.dynamicFields[0] = {
          titleDetailedDescription: description.TitleDetailedDescription,
          detailedDescription: description.DetailedDescription,
          subtitleError: false,
          descriptionError: false,
          charCount2: 0
        };
      } else { 
        this.dynamicFields.push({
          titleDetailedDescription: description.TitleDetailedDescription,
          detailedDescription: description.DetailedDescription,
          subtitleError: false,
          descriptionError: false,
          charCount2: 0
        });
      }
    }

    // const savedLanguage = localStorage.getItem('selectedLanguage') ||'ua'; 
    // this.selectedLanguage.setValue(savedLanguage);
    // this.onLanguageChange({ value: savedLanguage });

    this.checkScreenSize();    
    this.likedProjects = new Array(this.filteredItems.length).fill(false);
    this.totalSlides = this.filteredItems.length; // Инициализация общего количества слайдов
    this.phone = this.projectData.Phone;

    this.updateCharCount()
    for (let i = 0; i < this.dynamicFields.length; i++) {
      this.updateCharCount2(i);
    }
  }

  onFileSelectedDocx(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file: File = inputElement.files ? inputElement.files[0] : null;
  
    if (file) {
      const reader = new FileReader();
      
      reader.onload = () => {
        // Пытаемся привести result к строке
        const base64File = reader.result as string;
  
        // Проверяем, если result является строкой
        if (typeof base64File === 'string') {
          console.log('Base64 файл: ', base64File);
          this.projectData.BudgetArticlesUrl = base64File; // Сохраняем base64 строку
        } else {
          console.error('Результат не строка');
        }
      };
      
      reader.readAsDataURL(file); // Читаем файл и конвертируем в Base64
    }
  }


  navigate(tabKey: string) {
    this.activeTab = tabKey;
    this.router.navigate(['/project-page', tabKey]); // Переключаемся с изменением URL
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    for (let file of input.files) {
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      // Проверка типа файла
      if (!allowedExtensions.includes(fileExtension || '')) {
        console.error('Неверный формат файла, допустимые: .jpg, .jpeg, .png');
        continue; // Пропускаем файл с неподдерживаемым форматом
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Добавляем в массив projectPhotos как base64 строку
        this.projectPhotos.push(e.target.result);
      };
      reader.onerror = () => {
        console.error('Ошибка при чтении файла');
      };

      reader.readAsDataURL(file);
    }
  }

  removePhoto(index: number): void {
    this.projectPhotos.splice(index, 1);
    const input = document.getElementById('additionalPhotos') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  changePhoto(index: number): void {
    document.getElementById('additionalPhotos')?.click();
  }

  isPopupOpen: boolean = false;

  closePopup() {
    this.isPopupOpen = false;  // Закрытие попапа
  }

  saveDetailData(): void {

    this.projectData.Phone = this.phone;

    console.log('кнопка сохранить работает');
    this.projectService.getProjectDataDetails(this.projectData);
    //this.projectService.getProjectDataDetailsProjectPhotos();

    this.projectService.ProjectDataDetailsProjectPhotosClear();
    
    for (let i = 0; i < this.projectPhotos.length; i++){
      this.projectService.getProjectDataDetailsProjectPhotos(this.projectPhotos[i]);
    }
    this.projectService.ProjectDataDetailsProjectDescriptionClear();
    for (let i = 0; i < this.dynamicFields.length; i++){
      this.projectService.getProjectDataDetailsProjectDescription({TitleDetailedDescription: this.dynamicFields[i].titleDetailedDescription, DetailedDescription: this.dynamicFields[i].detailedDescription});
    }

    this.isPopupOpen = true;
  }

  budgetDescription: string = '';
  budgetCharCount: number = 0;

  updateBudgetCharCount() 
  {
    this.budgetCharCount = this.projectData.BudgetArticles.length;
  }

  charCount: number = 0;
  charCount2: number = 0;

  updateCharCount() {
    this.charCount = this.projectData.ShortDescription?.length || 0;
    this.budgetCharCount = this.projectData.BudgetArticles?.length || 0;
  }

  updateCharCount2(index: number) 
  {
    this.dynamicFields[index].charCount2 = this.dynamicFields[index].detailedDescription.length;
  }

  onSubmit(form: any) 
  {
    if (form.valid) 
    {
      console.log('Форма валидна:', this.projectData);
    } 
    else 
    {
      console.log('Форма содержит ошибки');
      form.control.markAllAsTouched();
    }
  }

  shortDescriptionError: boolean = false;
  budgetError: boolean = false;
  isValidationDone: boolean = false;
  cityError: boolean = false;
  emailError: boolean = false;
  fileError: boolean = false;
  phoneError: boolean = false;

  dynamicFields = [
    { 
      titleDetailedDescription: '',
      detailedDescription: '', 
      subtitleError: false, 
      descriptionError: false, 
      charCount2: 0
   }
  ];

  addField() 
  {
    this.dynamicFields.push({
      titleDetailedDescription: '',
      detailedDescription: '',
      subtitleError: false,
      descriptionError: false,
      charCount2: 0
    });
  }

  phone: string = '';
  file: File | null = null;

  validateCity() 
  {
    const city = this.projectData.Address?.trim();
    this.cityError = !(city && /^[A-ZА-ЯЁ]/.test(city));
  }

  validateEmail() {
    const email = this.projectData.Email?.trim();
    
    // Регулярное выражение для простой валидации email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Проверяем, что email не пустой и соответствует паттерну
    this.emailError = !(email && emailPattern.test(email));
    console.log('emailError:', this.emailError); // Логирование для отладки
  }
  

  validateBudget() 
  {
    const hasText = this.projectData.BudgetArticles?.trim().length > 0;
    const hasFile = !!this.projectData.BudgetArticlesUrl;
  
    this.budgetError = !(hasText || hasFile);
    this.isValidationDone = true;
  
    console.log("budgetError:", this.budgetError);
  }

  validateShortDescription() 
  {
    this.shortDescriptionError = !this.projectData.ShortDescription?.trim();
  }

  validateDetailedDescription(i: number, fieldName: string) 
  {
    if (fieldName === 'titleDetailedDescription') 
    {
      this.dynamicFields[i].subtitleError = !this.dynamicFields[i].titleDetailedDescription.trim();
    }
  
    if (fieldName === 'detailedDescription') 
    {
      this.dynamicFields[i].descriptionError = !this.dynamicFields[i].detailedDescription.trim();
    }
  }

  validatePhone() 
  {
    const phonePatterns: { [key: string]: RegExp } = {
      'UA': /^\+380\d{9}$/,
      'US': /^\+1\d{10}$/,
      'IT': /^\+39\d{10}$/,
      'DE': /^\+49\d{10,11}$/,
      'FR': /^\+33\d{9}$/,
      'ES': /^\+34\d{9}$/
    };
  
    const phone = this.phone?.trim() || '';  // <--- изменено
    let isValid = false;
  
    for (let country in phonePatterns) {
      if (phonePatterns[country].test(phone)) {
        isValid = true;
        break;
      }
    }
  
    this.phoneError = !isValid;
    }
  
  
  

  validateAllFields() 
  {
    this.isValidationDone = true;
  
    this.dynamicFields.forEach((field, i) => {
      this.validateDetailedDescription(i, 'titleDetailedDescription');
      this.validateDetailedDescription(i, 'detailedDescription');
    });
  
    this.validateShortDescription();
    this.validateBudget();
    this.validateEmail();
    this.validateCity();
    this.validatePhone();
  }



  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
  
    const allowedFileTypes = [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf'
    ];
  
    if (file && allowedFileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.projectData.BudgetArticlesUrl = base64;
        this.projectData.BudgetArticlesFileName = file.name; // ✅ Добавить имя файла
        this.fileError = false;
        this.validateBudget();
      };
      reader.readAsDataURL(file);
    } else {
      this.projectData.BudgetArticlesUrl = '';
      this.projectData.BudgetArticlesFileName = null;
      this.fileError = true;
      this.validateBudget();
    }

    console.log(this.projectData.BudgetArticlesFileName);
    console.log(this.projectData.BudgetArticlesUrl);
  }

  clearFile(): void {
    this.projectData.BudgetArticlesUrl = null;
    this.projectData.BudgetArticlesFileName = null;
    this.validateBudget();
    const input = document.getElementById('budget-file') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }


  submitProject() 
  {
    this.validateAllFields();
  
    this.projectData.Phone = this.phone;

    this.projectService.getProjectDataDetails(this.projectData);

    this.projectService.ProjectDataDetailsProjectPhotosClear();
    
    for (let i = 0; i < this.projectPhotos.length; i++){
      this.projectService.getProjectDataDetailsProjectPhotos(this.projectPhotos[i]);
    }
    this.projectService.ProjectDataDetailsProjectDescriptionClear();
    for (let i = 0; i < this.dynamicFields.length; i++){
      this.projectService.getProjectDataDetailsProjectDescription({TitleDetailedDescription: this.dynamicFields[i].titleDetailedDescription, DetailedDescription: this.dynamicFields[i].detailedDescription});
    }
    if (this.shortDescriptionError) 
    {
      console.log("Ошибка: Короткий опис не может быть пустым");
      return;
    }
  
    let hasError = false;
  
    this.dynamicFields.forEach((field) => 
    {
      if (field.subtitleError || field.descriptionError)
      {
        hasError = true;
      }
    });
  
    if (hasError) 
    {
      return;
    }

    if (this.budgetError) 
    {
      return;
    }
    if (this.cityError)
    {
      return;
    }
    if (this.emailError)
    {
      return;
    }
    if (this.phoneError)
    {
      return;
    }

    this.router.navigate(['/team-page']);
    console.log("Данные отправлены", this.projectData);
  }

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
            currentIndex = 0;
            totalSlides = 0;
          
            prevSlide() {
              if (this.currentIndex > 0) {
                this.currentIndex--;
              }
              else {
                this.currentIndex = this.totalSlides - 1;
              }
            }
          
            nextSlide() 
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
