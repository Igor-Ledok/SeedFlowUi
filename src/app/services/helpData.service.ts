import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpDataService {

  constructor(private http: HttpClient) { }

  // Загружаем данные из JSON файла
  getHelpData(): Observable<any[]> {
    return this.http.get<any[]>('assets/help-data.json');
  }
}
