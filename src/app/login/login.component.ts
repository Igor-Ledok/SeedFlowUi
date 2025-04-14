import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../services/language.service';
import { AuthRequestDto, AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, 
    MatSelectModule,
    MatFormFieldModule, 
    NgFor, 
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
    TranslocoModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  errorMessage: string = '';

  readonly FORM_KEYS = {
    EMAIL: 'email',
    PASSWORD: 'password'
  };

  hide = true;
  someString: string = 'UA';
  selectedLanguage = new FormControl('ua');

  constructor(
    private fb: FormBuilder, 
    private languageService: LanguageService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute, // Добавил для обработки OAuth
    private cd: ChangeDetectorRef 
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }

  ngOnInit(): void {
    // 🔹 Обрабатываем редирект с токеном
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.authService.setToken(token); // Сохранить токен
        this.router.navigate(['/']); // Перенаправить на главную страницу
      }
    });

    const savedLanguage = localStorage.getItem('selectedLanguage') || 'ua';
    this.selectedLanguage.setValue(savedLanguage);
    this.onLanguageChange({ value: savedLanguage });
  }

  switchLanguage(language: string) {
    this.languageService.switchLanguage(language);
  }

  onLanguageChange(event: any) {
    const selectedLang = event.value;
    if (selectedLang === 'ua') {
      this.switchLanguage('en');
      this.someString = 'EN';
    } else if (selectedLang === 'en') {
      this.switchLanguage('uk');
      this.someString = 'UA';
    }
  }

  LoginSubmitted(): void {
    const request = {
      email: this.loginForm.controls[this.FORM_KEYS.EMAIL].value,
      password: this.loginForm.controls[this.FORM_KEYS.PASSWORD].value
    } as AuthRequestDto;

    this.authService.authenticate(request).subscribe({
      next: (response) => {
        console.log(response);
        this.errorMessage = '';
        this.router.navigate(['/loginAccess-page']);
      },
      error: (e: any) => {
        console.log(e);
        this.errorMessage = 'Неправильний email або пароль';
        console.log(this.errorMessage);
        this.cd.detectChanges();
      }
    });
  }

  // 2️⃣ Google OAuth вход
  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }
  loginWithFacebook(): void {
    this.authService.loginWithFacebook();
  }

  languages = [
    { code: 'en', name: "EN" },
    { code: 'ua', name: "UA" }
  ];

  loginForm: FormGroup;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  
}
