import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-new-pass-access',
  standalone: true,
  imports: 
  [
    MatSelectModule, 
    FormsModule, 
    MatFormFieldModule, 
    NgFor, 
    CommonModule, 
    RouterModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  templateUrl: './new-pass-access.component.html',
  styleUrl: './new-pass-access.component.css'
})

export class NewPassAccessComponent 
{
  selectedLanguage = new FormControl('ua');

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
    // localStorage.setItem('selectedLanguage', selectedLang);
  }

  ngOnInit() 
  {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'ua';
    this.selectedLanguage.setValue(savedLanguage);
    this.onLanguageChange({ value: savedLanguage });
  }

  constructor(private languageService: LanguageService) { }

  switchLanguage(language: string) 
  {
    this.languageService.switchLanguage(language);
  }

  languages = [
    {code: 'en', name: "EN"},
    {code: 'ua', name: "UA"}
  ];
}
