import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'any',
})
export class LanguageService {
  constructor(private translocoService: TranslocoService) {}

  switchLanguage(language: string) 
  {
    console.log('before using');
    this.translocoService.setActiveLang(language);
  }
}
