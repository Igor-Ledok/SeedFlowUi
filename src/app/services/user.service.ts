import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs/internal/Observable';
import { UpdateUserDto } from '../models/user/update-user-dto';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  constructor(private http: HttpClient) { }

  baseUrl = environment.baseApiUrl + "api/user/";
  
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Получение токена из localStorage
    });
  }
  getToken(): string | null {
    return localStorage.getItem('token');
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

  becomeAuthor(password: string): Observable<any> {
    return this.http.post(this.baseUrl + 'becomeauthor', {password}, { headers: this.getHeaders() });
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const decodedToken: any = jwtDecode(token); 
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; 
    return role || null;
    } catch (error) {
      console.error("Ошибка декодирования токена:", error);
      return null;
    }
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const decodedToken: any = jwtDecode(token); 
      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      return userId ;
    } catch (error) {
      console.error("Ошибка декодирования токена:", error);
      return null;
    }
  }

  getAllUsers(): Observable<UserListDto[]> {
    return this.http.get<UserListDto[]>(`${this.baseUrl}users`, { headers: this.getHeaders() });
  }

  deleteAccount(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}`, { headers: this.getHeaders() });
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
  bonusCoin: number;
}

export interface UserListDto {
  id: string;
  name: string;
  description?: string;
  email: string;
  date: string;
  photo?: string;
  bonusCoin?: number;
  rule: string;
  registrationType?: string;
}