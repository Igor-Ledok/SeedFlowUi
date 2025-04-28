import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { CreateCommentRequest } from '../models/comment/create/createCommentRequest';
import { CreateReplyRequest } from '../models/comment/create/createReplyRequest';
import { CommentDto } from '../models/comment/comment/commentDto';

@Injectable({
  providedIn: 'root'
})
export class CommentService 
{
  private baseUrl = environment.baseApiUrl + 'api/user';

  constructor(private http: HttpClient) {}

  // №1: Получить все комментарии текущего пользователя
  getUserComments(): Observable<CommentDto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CommentDto[]>(`${this.baseUrl}/comment/user`, { headers });
  }

  // №2: Получить все комментарии для проекта
  getProjectComments(projectId: string): Observable<CommentDto[]> {
    return this.http.get<CommentDto[]>(`${this.baseUrl}/comment/project/${projectId}`);
  }

  // №3: Отправить комментарий
  createComment(data: CreateCommentRequest): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/comment/user`, data, { headers });
  }

  // №4: Отправить ответ на комментарий
  createReply(data: CreateReplyRequest): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/comment/project`, data, { headers });
  }


}