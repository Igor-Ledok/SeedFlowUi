import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ResetCodeService 
{
  private baseUrl = environment.baseApiUrl + 'api/reset-password/';

  constructor(private http: HttpClient) {}

  verifyResetCode(request: VerifyResetCodeRequestDto): Observable<any> 
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.baseUrl + 'verify-reset-code', request , {headers});
  }
}

export interface VerifyResetCodeRequestDto 
{
    email: string;
    code: string;
}