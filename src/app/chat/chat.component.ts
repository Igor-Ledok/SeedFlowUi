import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { TranslocoModule } from '@jsverse/transloco';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserInfo, UserService } from '../services/user.service';
import { CreateChatMessageDto } from '../models/chat/createChatMessageDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { ChatService } from '../services/chat.service';
import { ChatDto } from '../models/chat/chatdto';

@Component({
  selector: 'app-chat',
  imports: [
    HeaderComponent, 
    FooterComponent,
    TranslocoModule,
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  public userInfo: UserInfo;
  public listChats: ChatDto;
  public messageText: string = ''; // поле для текста
  public chatId: string;
  public myUserId: string = '';
  intervalId: any;
  public file64: string;

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.myUserId = this.userService.getUserId();

    this.route.queryParams.subscribe(params => {
      const chatId = params['chatId'];
      
      if (chatId) {
        this.chatService.getAllChatMessages(chatId).subscribe(listChats => {
          this.listChats = listChats;
        });
      }

      console.log("test1: ", this.listChats)
      console.log("test2: ", chatId);
      this.chatId = chatId;

      this.intervalId = setInterval(() => {
        this.loadMessages();
      }, 3000);
    });

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

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // очистить при уничтожении компонента
    }
  }
  
  loadMessages() {
    this.chatService.getAllChatMessages(this.chatId).subscribe(listChats => {
      this.listChats = listChats;
    });
  }

  sendMessage() {
    // Текст
    if (this.messageText.trim()){
      const messageDto = new CreateChatMessageDto(this.chatId, this.messageText);

      this.chatService.addChatMessage(this.chatId, messageDto).subscribe(() => {
        this.chatService.getAllChatMessages(this.chatId).subscribe(listChats => {
          this.listChats = listChats;
        });
        this.messageText = '';
      }, err => {
        this.messageText = '';
        console.error('Ошибка при отправке сообщения:', err);
      });
    } else {
      console.log("текст пустой")
    }

    // Файл
    if(this.file64.trim()){
      const messageDto = new CreateChatMessageDto(this.chatId, this.file64);
      console.log("отправка: ", messageDto)
      this.chatService.addChatMessage(this.chatId, messageDto).subscribe(() => {
        this.chatService.getAllChatMessages(this.chatId).subscribe(listChats => {
          this.listChats = listChats;
        });
        this.file64 = '';
      }, err => {
        this.file64 = '';
        console.error('Ошибка при отправке сообщения:', err);
      });
    }else {
      console.log("файл")
    }
    
  }
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
  
    const file = input.files[0];
  
    if (file.size > 10 * 1024 * 1024) {
      alert("Файл слишком большой (максимум 10 МБ)");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      const messagePrefix = `[FILE;${file.type}]`;
      this.file64 = messagePrefix + base64;
    };
    reader.readAsDataURL(file);
  }

  

  isFile(message: string): boolean {
    return message.startsWith('[FILE;');
  }
  
  getFileType(message: string): string {
    const match = message.match(/^\[FILE;(.+?)\]/);
    return match ? match[1] : 'application/octet-stream';
  }
  
  getFileDataUrl(message: string): string {
    const base64 = message.replace(/^\[FILE;.+?\]/, '');
    const type = this.getFileType(message);
    return `data:${type};base64,${base64}`;
  }

  getFileCategory(message: string): string {
    const type = this.getFileType(message);
    if (type.startsWith('image/')) return 'image';
    if (type === 'application/pdf') return 'pdf';
    return 'other';
  }
  
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/imageNotFound.png'; // или любое изображение-заглушка
  }
  
  
}
