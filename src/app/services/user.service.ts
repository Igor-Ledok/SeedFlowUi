import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs/internal/Observable';
import { UpdateUserDto } from '../models/user/update-user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  constructor(private http: HttpClient) { }

  baseUrl = environment.baseApiUrl + "api/auth/";
  
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Получение токена из localStorage
    });
  }


  create(request: CreateUserRequestDto): Observable<any> 
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseUrl + "create", request, { headers });
  }

  getUserInfo(): Observable<{ user: UserInfo }> {
    return this.http.get<{ user: UserInfo }>(this.baseUrl + "info", { headers: this.getHeaders() });
  }

  updateUser(user: UpdateUserDto): Observable<any> {
    return this.http.post(this.baseUrl + 'update', user, { headers: this.getHeaders() }); // путь к твоему API
  }

}

// Интерфейс для создания пользователя
export interface CreateUserRequestDto {
  email: string;
  password: string;
  isAutor: boolean;
}

export interface UserInfo {
  name: string;
  description: string;
  email: string;
  date: string;
  photo: string;
}