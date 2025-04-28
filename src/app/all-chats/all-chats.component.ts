// all-chats.component.ts
import { Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

import { UserService } from '../services/user.service';
import { ChatService } from '../services/chat.service';
import { ChatDto } from '../models/chat/chatdto';

@Component({
  standalone: true,
  selector: 'app-all-chats',
  imports: [
    CommonModule,
    NgForOf,
    RouterModule,
    TranslocoModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './all-chats.component.html',
  styleUrls: ['./all-chats.component.scss']
})
export class AllChatsComponent {
  public listChats: ChatDto[] = [];

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.chatService.getAllChats().subscribe(chats => {
      this.listChats = chats;
      console.log('Chats:', this.listChats);
    });
  }

  goBack() {
    this.router.navigate(['/profile-page']);
  }
}
