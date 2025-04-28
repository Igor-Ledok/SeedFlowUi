import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
// import { CreateChatMessageDto } from '../models/chat/createchatmessagedto';
import { ChatDto } from '../models/chat/chatdto';
import { CreateChatDto } from '../models/chat/createchatdto';
import { CreateChatMessageDto } from '../models/chat/createChatMessageDto';

@Injectable({
  providedIn: 'root'
})
export class ChatService 
{
  constructor(private http: HttpClient) { }

  baseUrl = environment.baseApiUrl + "api/user";




  // Получить все чаты
  getAllChats(): Observable<ChatDto[]> {
    const token = localStorage.getItem('token'); // предполагаем, что JWT сохранён в localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ChatDto[]>(`${this.baseUrl}/returnallchat`, { headers });
  }

  // Получить все сообщения чата
  getAllChatMessages(chatId: string): Observable<ChatDto> {
    const token = localStorage.getItem('token'); // предполагаем, что JWT сохранён в localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ChatDto>(`${this.baseUrl}/returnallchatmessage/${chatId}`, { headers });
  }

  // Добавить сообщение в чат
  addChatMessage(chatId: string, message: CreateChatMessageDto): Observable<any> {
    const token = localStorage.getItem('token'); // предполагаем, что JWT сохранён в localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/addallchatmessage/${chatId}`, message, { headers });
  }

  // Создать новый чат
  addChat(chat: CreateChatDto): Observable<any> {
    const token = localStorage.getItem('token'); // предполагаем, что JWT сохранён в localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/addchat`, chat, { headers });
  }
}