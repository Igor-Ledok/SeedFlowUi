import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService 
{
  private baseUrl = environment.baseApiUrl + 'api/email/';

  constructor(private http: HttpClient) {}

  sendResetCode(request: SendResetCodeRequestDto): Observable<any> {
    console.log("📨 Отправка запроса на API:", this.baseUrl + 'send-reset-code', request);
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post(this.baseUrl + 'send-reset-code', request, { headers });
  }
}

export interface SendResetCodeRequestDto 
{
  email: string;
}