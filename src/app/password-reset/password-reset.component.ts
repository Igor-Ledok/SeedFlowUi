import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { TranslocoModule } from '@jsverse/transloco';
import { EmailService, SendResetCodeRequestDto } from '../services/email.service';
import { Router } from '@angular/router';
import { ResetCodeService, VerifyResetCodeRequestDto } from '../services/reset-code.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: 
  [
    FormsModule, 
    MatSelectModule, 
    MatFormFieldModule,
    NgFor, 
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
    TranslocoModule
    ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})

export class PasswordResetComponent 
{

  someString:string = 'UA';

  selectedLanguage = new FormControl('ua');

  codeForm: FormGroup;

  languages = [
    {code: 'en', name: "EN"},
    {code: 'ua', name: "UA"}
  ];

  emailForm: FormGroup;
  isCodeSent = false;
  email = '';
  isLoading = false;
  errorMessage: string = '';
  isCodeValid = false;

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

    ngOnInit() 
    {
      const savedLanguage = localStorage.getItem('selectedLanguage') || 'ua';
      this.selectedLanguage.setValue(savedLanguage);
      this.onLanguageChange({ value: savedLanguage });
    }

    constructor(
      private fb: FormBuilder, 
      private languageService: LanguageService,
      private emailService: EmailService,
      private router: Router,
      private resetCodeService: ResetCodeService
    ) {

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })

    this.codeForm = this.fb.group({
      code: ['', [Validators.required]]
    });
  }

 
  sendCode() 
  {
    if (this.emailForm.valid) 
      {
      const email = this.emailForm.get('email')?.value;
      this.isLoading = true;
      this.errorMessage = '';

      const request = 
      {
        email:this.emailForm.get('email')?.value,
      } as SendResetCodeRequestDto;

      this.emailService.sendResetCode(request).subscribe(
        (response) => {
          this.isCodeSent = true;
          this.isLoading = false;
          console.log('Код отправлен на почту');
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'Помилка надсилання коду. Спробуйте ще раз.';
        }
      );
    }
  }

  verifyCode() 
  {
      const request = 
      {
        email: this.emailForm.get('email')?.value,
        code: this.codeForm.get('code')?.value,
      } as VerifyResetCodeRequestDto;
  
      this.resetCodeService
        .verifyResetCode(request)
        .subscribe({
          next: () => {
            console.log("Code access!!!");
            this.router.navigate(['/newPassword-page']);
          },
  
          error: (e: any) => {
            console.log(e),
            this.errorMessage = "Неправильний код. Будь ласка, спробуйте ще раз."
          }
        });
    }

  switchLanguage(language: string) 
  {
    this.languageService.switchLanguage(language);
  }

  get code() 
  {
    return this.codeForm.get('code');
  }

  onSubmit() 
  {
    if (this.codeForm.valid) 
      {
        alert('Код успішно підтверджено!');
      } 
  }
}