import { Component, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from '../services/language.service';
import { AuthService, CreateUserRequestDtoWithCode } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { EmailService, SendVerificationCodeDto } from '../services/email.service';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: 
  [
    MatSlideToggleModule, 
    MatCheckboxModule, 
    MatSelectModule, 
    FormsModule, 
    MatFormFieldModule,
    NgFor, 
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
    TranslocoModule
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit
{
  readonly FORM_KEYS = {
    EMAIL: 'email',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: "confirm_password",
    ACCEPT_TERMS: "accept_terms",
    IS_AUTHOR: 'is_author',
    CODE: 'code'  // добавлено новое поле
  };

  isVerificationCodeSent = false;

  public code: string;
  public errorCreate: string;


  hide = true;
  hide2 = true;

  someString:string = 'UA';

  selectedLanguage = new FormControl('ua');

  languages = [
    {code: 'en', name: "EN"},
    {code: 'ua', name: "UA"}
  ];

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private languageService: LanguageService, 
    private authService: AuthService, 
    private userService: UserService,
    private emailService: EmailService,
    private router: Router) 
  {
    
  }

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

  switchLanguage(language: string) 
  {
    this.languageService.switchLanguage(language);
  }

  ngOnInit(): void 
  {
    const savedLanguage = localStorage.getItem('selectedLanguage') ||'ua'; 
    this.selectedLanguage.setValue(savedLanguage);
    this.onLanguageChange({ value: savedLanguage });

    this.registerForm = this.fb.group(
      {
        [this.FORM_KEYS.EMAIL]: ['', [Validators.required, Validators.email]],
        [this.FORM_KEYS.PASSWORD]: [
          '',
          [
          Validators.required, 
          Validators.minLength(6),
          Validators.pattern(/[A-Z]/),
          Validators.pattern(/\d/),
          Validators.pattern(/[@$!%*?&]/)
          ]
        ],
        [this.FORM_KEYS.CONFIRM_PASSWORD]: ['', Validators.required],
        [this.FORM_KEYS.ACCEPT_TERMS]: [false, Validators.requiredTrue],
        [this.FORM_KEYS.IS_AUTHOR]: [false], // Добавляем поле в форму
        [this.FORM_KEYS.CODE]: ['', Validators.required]
      },
      {
        validators: this.passwordMatchValidator.bind(this)
      }
    );

    this.trackFormChanges();
  }

  trackFormChanges(): void {
    this.registerForm.valueChanges.subscribe((value) => {
      console.log('Форма изменилась:', value);
      console.log('Статус формы:', this.registerForm.status);
    });
  }

  
  registerSubmitted(): void {

    // пароль
    const password = this.registerForm.controls[this.FORM_KEYS.PASSWORD].value;
    const confirmPassword = this.registerForm.controls[this.FORM_KEYS.CONFIRM_PASSWORD].value;
    if (password !== confirmPassword) {
      console.error('Пароль и подтверждение пароля не совпадают');
      // тут можно показать сообщение пользователю
      return;
    }

    const request: CreateUserRequestDtoWithCode = {
      email: this.registerForm.controls[this.FORM_KEYS.EMAIL].value,
      password: this.registerForm.controls[this.FORM_KEYS.PASSWORD].value,
      isAutor: this.registerForm.controls[this.FORM_KEYS.IS_AUTHOR].value,
      code: this.registerForm.value[this.FORM_KEYS.CODE],
    };

    console.log(request)

    this.authService.registerWithCode(request).subscribe({
      next: () => {
        console.log('User successfully registered');
        this.router.navigate(['/regAccess-page']);
      },
      error: (error) => {
        this.errorCreate = "Ошыбка создания акаунта" // сообщение ошыбки
        console.log(this.errorCreate)
      }
    });
  }


  passwordMatchValidator(form: FormGroup) 
  {
    const password = form.get([this.FORM_KEYS.PASSWORD])?.value;
    const confirmPassword = form.get([this.FORM_KEYS.CONFIRM_PASSWORD])?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  sendVerificationCode() {
    const emailControl = this.registerForm.get(this.FORM_KEYS.EMAIL);
    if (emailControl?.invalid) {
      // Можно ещё показать пользователю сообщение
      console.warn('Невалидный email, код не отправлен');
      return;
    }
  
    const dto: SendVerificationCodeDto = {
      email: emailControl.value
    };
  
    this.emailService.SendVerificationCode(dto).subscribe({
      next: () => {
        this.isVerificationCodeSent = true;
        this.errorCreate = "";
        console.log('Код подтверждения отправлен!');
      },
      error: (err) => {
        this.isVerificationCodeSent = false;
        console.error('Ошибка при отправке кода:', err);
        this.errorCreate = "Ошибка при отправке кода" // сообщение ошыбки
        console.log(this.errorCreate)
      }
    });
  }
}
