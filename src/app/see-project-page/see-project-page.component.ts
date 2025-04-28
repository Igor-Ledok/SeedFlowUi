import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { ReturnProjectDto } from '../models/project/return/return-project.model';
import { LanguageService } from '../services/language.service';
import { ProjectService } from '../services/project.service';
import { FooterComponent } from '../shared/footer/footer.component';
import { HeaderComponent } from '../shared/header/header.component';
import { CommentDto } from '../models/comment/comment/commentDto';
import { CreateCommentRequest } from '../models/comment/create/createCommentRequest';
import { CreateReplyRequest } from '../models/comment/create/createReplyRequest';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { CommentService } from '../services/comments.service';
import { ChatService } from '../services/chat.service';
import { CreateChatDto } from '../models/chat/createchatdto';

@Component({
  selector: 'app-see-project-page',
  imports: 
  [
    CommonModule, 
    RouterModule,
    TranslocoModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './see-project-page.component.html',
  styleUrl: './see-project-page.component.scss'
})
export class SeeProjectPageComponent {
  public returnProjectData: ReturnProjectDto = {} as ReturnProjectDto;
  public returnComents: CommentDto[] = [];
  public newCommentMessage: string;
  public replyMessages: string; // для хранения ответов
  public userIsAuthor: boolean = false;
  public userId: string;
  
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

  MATHPercentageOfMoney(collected: number, total: number): string {
    if (!total || total === 0) return '0%';
    const percent = (collected / total) * 100;
    return `${Math.min(percent, 100)}%`; // ограничим до 100%
  }
  
  PercentageOfMoney(num1: number,num2: number): number {
    return Math.round((num1 / num2) * 100);
  }

  switchLanguage(language: string) 
  {
    this.languageService.switchLanguage(language);
  }

  constructor(
    private chatService: ChatService,
    private eRef: ElementRef,
    private languageService: LanguageService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private authService: AuthService,
    private userService: UserService)
  {

  }

  scrollToTop(): void {
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

  onImageClick(link: string): void {
    this.router.navigate([link]);
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

  isSavePopupOpen: boolean = false;

  showSavePopup() {
    this.isSavePopupOpen = true;
  }
  
  closeSavePopup() {
    this.isSavePopupOpen = false;
  }

  isPopupOpen: boolean = false;

  closePopup() {
    this.isPopupOpen = false; 
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const projectId = params['projectId'];
      console.log('Получен projectId:', projectId, 'Тип:', typeof projectId);
    
      if (projectId) {
        console.log('projectId существует:', projectId);
        console.log('projectId существует:', projectId);
      this.projectService.getAllInfoProjectById(projectId).subscribe(
        (data) => {
          this.returnProjectData = data;  // Присваиваем данные
          this.returnProjectData.project.selectedCategoryPhoto = 'assets/images/' + this.returnProjectData.project.selectedCategoryPhoto;
          console.log('Полученные данные:', this.returnProjectData);
          this.fetchProjectComments();

          const userId = this.userService.getUserId();
          const authorId = this.returnProjectData.project.authorId;
          if (userId && authorId && userId === authorId) {
            this.userIsAuthor = true;
          }
          console.log("rule: " + this.userIsAuthor)
          console.log("userid: " + userId)
          console.log("authorid: " + authorId)
        },
        (error) => {
          console.error('Ошибка при получении данных:', error);
        }
      );
      } else {
        console.error('projectId отсутствует в queryParams');
      }
    });
  }

  // Метод для получения всех комментариев проекта
  fetchProjectComments(): void {
    if (!this.returnProjectData.project.id) {
      console.log ('Проект не найден');
      return;
    }
    this.commentService.getProjectComments(this.returnProjectData.project.id).subscribe(
      (data: CommentDto[]) => {
        this.returnComents = data; // Заполняем список комментариев
      },
      (error) => {
        console.log ('Ошибка при получении комментариев: ' + error);
      }
    );
  }

  sendComment(): void {
    if (!this.newCommentMessage || !this.newCommentMessage.trim()) {
      console.log('Коментар не може бути порожнім');
      return;
    }
  
    const request: CreateCommentRequest = {
      projectId: this.returnProjectData.project.id,
      message: this.newCommentMessage.trim(),
    };
  
    this.commentService.createComment(request).subscribe(
      () => {
        this.newCommentMessage = ''; // Очистка поля
        this.fetchProjectComments(); // Перезагрузка комментариев
      },
      (error) => {
        console.log('Помилка при надсиланні коментаря: ', error);
      }
    );
  }

  
  selectedReplyId: number | null = null;

  onReplyClick(index: number): void {
    if (this.selectedReplyId === index) {
      this.selectedReplyId = null; // скрываем, если повторно нажали
    } else {
      this.selectedReplyId = index;
    }
  }
  
  comments = [
    {
      senderName: "Анна Лісовська",
      createdAt: "15 лютого о 14:51",
      message: "Дуже важливо підтримувати такі ініціативи! Ці тварини заслуговують на безпечне майбутнє. Дякую команді за вашу роботу!",
      senderPhotoBase64: "assets/images/Anna.png"
    },
    {
      senderName: "Ігор Коваль",
      createdAt: "16 лютого о 09:12",
      message: "Гарна ідея! Підтримую на всі 100%.",
      senderPhotoBase64: "assets/images/WithoutPhoto.png"
    },
    {
      senderName: "Марія Петренко",
      createdAt: "16 лютого о 17:45",
      message: "Бажаю вам успіху! Це справді варто уваги.",
      senderPhotoBase64: "assets/images/Anna.png"
    },
    {
      senderName: "Олексій Бондар",
      createdAt: "17 лютого о 10:05",
      message: "Долучився! Робіть добру справу!",
      senderPhotoBase64: "assets/images/WithoutPhoto.png"
    }
  ];


  activeTab: string = '';

  
  isButtonActive: boolean[] = [false, false, false];
  
  searchText = '';
  showDropdown = false;



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


  isSocialMediaListVisible: boolean[] = []; // Массив для отслеживания видимости списка

  toggleSocialMediaList(index: number) {
    this.isSocialMediaListVisible[index] = !this.isSocialMediaListVisible[index];
  }

  // Закрытие выпадающего меню
  closeDropdown() {
    this.showDropdown = false;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }


  sendReply(id: string): void {
    console.log('comment id:', id);
    console.log('reply message:', this.replyMessages);
  
    if (!id) {
      console.log('Помилка: commentId відсутній або null');
      return;
    }
  
    if (!this.replyMessages) {
      console.log('Відповідь не може бути порожньою');
      return;
    }
  
    const request: CreateReplyRequest = {
      commentId: id,
      message: this.replyMessages
    };
  
    this.commentService.createReply(request).subscribe(
      () => {
        console.log('Відповідь надіслана');
        this.replyMessages = '';
        this.selectedReplyId = null;
        this.fetchProjectComments();
      },
      (error) => {
        console.log('Помилка при надсиланні відповіді: ', error);
      }
    );
  }

  goToChat() {

    const chatDto: CreateChatDto = {
      authorId: this.returnProjectData.project.authorId , // Указываешь ID автора, тут пример
      projectId: this.returnProjectData.project.id // ID проекта (если нужно)
    };

    console.log("test1: ", chatDto)

    this.chatService.addChat(chatDto).subscribe(
      (response) => {
        // После успешного создания чата, получаем ID
        const chatId = response.chatId;
        
        // Переход на страницу чата
        this.router.navigate(['/chat-page'], { queryParams: { chatId: chatId} });
      },
      (error) => {
        console.error('Ошибка при создании чата', error);
      }
    );
  }

}