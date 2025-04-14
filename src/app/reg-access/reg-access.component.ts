import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-reg-access',
  standalone: true,
  imports: 
  [
    MatSelectModule, 
    FormsModule, 
    MatFormFieldModule, 
    NgFor, 
    CommonModule,
    RouterModule,
    TranslocoModule,
    ReactiveFormsModule
  ],
  templateUrl: './reg-access.component.html',
  styleUrl: './reg-access.component.css'
})

export class RegAccessComponent 
{
  someString:string = 'UA';

  onLanguageChange(event: any) 
  {
    const selectedLang = event.value;
    if (selectedLang === 'ua') 
    {
      this.switchLanguage('en');
      this.someString = 'EN';
    } 
    else if (selectedLang === 'en') 
    {
      this.switchLanguage('uk');
      this.someString = 'UA';
    }
  }

    selectedLanguage = new FormControl('ua');

    ngOnInit() 
    {
      const savedLanguage = localStorage.getItem('selectedLanguage') || 'ua';
      this.selectedLanguage.setValue(savedLanguage);
      this.onLanguageChange({ value: savedLanguage });
    }

    languages = [
      {code: 'en', name: "EN"},
      {code: 'ua', name: "UA"}
    ];

    constructor(private languageService: LanguageService) {}

    switchLanguage(language: string) 
    {
      this.languageService.switchLanguage(language);
    }
}
