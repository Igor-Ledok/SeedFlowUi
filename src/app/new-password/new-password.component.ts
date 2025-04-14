import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: 
  [
    FormsModule, 
    MatSelectModule, 
    MatFormFieldModule, 
    NgFor, 
    CommonModule, 
    ReactiveFormsModule, 
    RouterLink,
    TranslocoModule
  ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})

export class NewPasswordComponent 
{
  hide = true;
  hide2 = true;

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

  selectedLanguage = new FormControl('ua');

  languages = [
    {code: 'en', name: "EN"},
    {code: 'ua', name: "UA"}
  ];

  resetPasswordForm: FormGroup;

  ngOnInit() 
  {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'ua';
    this.selectedLanguage.setValue(savedLanguage);
    this.onLanguageChange({ value: savedLanguage });
  }

  constructor(private fb: FormBuilder, private languageService: LanguageService) 
  {
    this.resetPasswordForm = this.fb.group(
      {
        newPassword: [
          '', 
          [
            Validators.required, 
            Validators.minLength(6),
            Validators.pattern(/[A-Z]/),
            Validators.pattern(/\d/),
            Validators.pattern(/[@$!%*?&]/)
          ]
        ],
        confirmPassword: ['', [Validators.required]]
      },
      { validator: this.passwordsMatchValidator }
    );
  }

  switchLanguage(language: string) 
  {
    this.languageService.switchLanguage(language);
  }

  get newPassword(): AbstractControl | null 
  {
    return this.resetPasswordForm.get('newPassword');
  }

  get confirmPassword(): AbstractControl | null 
  {
    return this.resetPasswordForm.get('confirmPassword');
  }

  passwordsMatchValidator(form: FormGroup) 
  {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if(!confirmPassword) return null;
    
    return newPassword === confirmPassword ? null : { passwordsMismatch: true };
  }
}
