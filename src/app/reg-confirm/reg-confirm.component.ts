import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-reg-confirm',
  standalone: true,
  imports: 
  [
    MatCheckboxModule,
    FormsModule, 
    MatSelectModule, 
    MatFormFieldModule, 
    NgFor, 
    CommonModule, 
    ReactiveFormsModule,
    TranslocoModule
  ],
  templateUrl: './reg-confirm.component.html',
  styleUrls: ['./reg-confirm.component.css']
})

export class RegConfirmComponent 
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
     localStorage.setItem('selectedLanguage', selectedLang);
  }

  selectedLanguage = new FormControl('ua');

  ngOnInit():void
  {
    const savedLanguage = localStorage.getItem('selectedLanguage') ||'ua'; 
    this.selectedLanguage.setValue(savedLanguage);
    this.onLanguageChange({ value: savedLanguage });
  }

  languages = [
    {code: 'en', name: "EN"},
    {code: 'ua', name: "UA"}
  ];

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private languageService: LanguageService) 
  {
    this.registrationForm = this.fb.group({
      confirmationCode: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]] 
    });
  }

  switchLanguage(language: string) 
  {
    this.languageService.switchLanguage(language);
  }

  onSubmit()
   {
    if (this.registrationForm.valid) 
    {
      alert('Реєстрація успішна!');
    } 
    else
    {
      alert('Будь ласка, виправьте помилку у формі');
    }
  }
}
