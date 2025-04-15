import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs/internal/Observable';
import { AuthResponseDto } from '../models/auth/auth-response-dto';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import { CreateUserRequestDto } from './user.service';
import { ProjectData } from '../models/project/project-data.interface';
import { jwtDecode } from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  constructor(private http: HttpClient) { }

  baseUrl = environment.baseApiUrl + "api/auth/";
  twobaseUrl = environment.baseApiUrl + "api/user/";




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
  


  authenticate(request: AuthRequestDto): Observable<AuthResponseDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post<AuthResponseDto>(this.baseUrl + "authenticate", request, { headers })
      .pipe(
        tap(response => console.log("Серверный ответ:", response)),
        map(response => {
          try {
            const authResponse = AuthResponseDto.parseJson(response);
            console.log("Парсинг успешен:", authResponse);
            if (authResponse && authResponse.token) {
              this.setToken(authResponse.token);
              console.log("Токен сохранён:", authResponse.token);
            }
            return authResponse;
          } catch (e) {
            console.error("Ошибка парсинга ответа:", e);
            throw e;
          }
        }),
        catchError(error => {
          console.error("Ошибка запроса:", error);
          return throwError(() => new Error("Ошибка авторизации"));
        })
      );
  }
  





  // Вход через Google
  loginWithGoogle(): void {
    const googleLoginUrl = `${this.baseUrl}google-login`;
    console.log("Google Login URL:", googleLoginUrl); // Проверка

    window.location.href = googleLoginUrl;
  }
  loginWithFacebook(): void {
    const facebookLoginUrl = `${this.baseUrl}facebook-login`;
    console.log("Facebook Login URL:", facebookLoginUrl); // Проверка

    window.location.href = facebookLoginUrl;
  }

  loginWithTwitter(): void {
    const twitterLoginUrl = `${this.baseUrl}twitter-login`;
    console.log("Twitter Login URL:", twitterLoginUrl); // Проверка

    window.location.href = twitterLoginUrl;
}

  // Сохранение токена после редиректа
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Проверка авторизации
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Выход
  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  register(request: CreateUserRequestDto): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post<void>(
      this.baseUrl + 'register',
      request,
      { headers, withCredentials: true } 
    );
  }

  refreshToken(): Observable<string> {
    const oldToken = this.getToken();

    if (!oldToken) {
      return new Observable<string>((observer) => {
        observer.error(new Error('Отсутствует токен для обновления'));
        observer.complete();
      });
    }

    return this.http.post<{ token: string }>(`${this.baseUrl}refresh-token`, { oldToken }).pipe(
      tap(response => this.setToken(response.token)), 
      switchMap(response => new Observable<string>((observer) => {
        observer.next(response.token);
        observer.complete();
      }))
    );
  }


  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return true; // Если токен отсутствует, считаем его просроченным
    }

    try {
      const payload = this.decodeToken(token);
      const exp = payload?.exp; // Время истечения токена (в секундах)
      
      if (!exp) {
        return true; // Если поле exp отсутствует, считаем токен просроченным
      }

      const expirationDate = new Date(exp * 1000); // Переводим из секунд в миллисекунды
      const currentDate = new Date();

      return currentDate > expirationDate; // Если текущее время больше времени истечения, токен просрочен
    } catch (error) {
      console.error('Ошибка декодирования токена: ', error);
      return true; // Если произошла ошибка, считаем токен просроченным
    }
  }

  private decodeToken(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token');
    }

    const payload = parts[1]; // Берем только полезную нагрузку
    const decodedPayload = atob(payload); // Декодируем из base64
    return JSON.parse(decodedPayload); // Парсим JSON
  }
  

}

export interface AuthRequestDto 
{
  email: string;
  password: string;
}

