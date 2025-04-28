import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserListDto, UserService } from '../services/user.service';

@Component({
  selector: 'app-root-accounts',
  imports: 
  [
    HeaderComponent,
    TranslocoModule,
    RouterModule,
    ReactiveFormsModule,
    NgFor,
    MatFormFieldModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './root-accounts.component.html',
  styleUrl: './root-accounts.component.scss'
})
export class RootAccountsComponent {


  public users: UserListDto[] = [];
  loading = true;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getData();
  }

  deleteUser(userId: string) {
    this.userService.deleteAccount(userId).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== userId);
        this.getData();
      },
      error: (err) => {
        console.error(err);
        this.getData();
      }
    });
  }

  getData(){
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Не вдалося завантажити користувачів';
        this.loading = false;
      }
    });
  }
  
  profiles = [
    {
      name: 'Олена Іваненко',
      photo: 'assets/images/Speaker6.png',
      createdAt: '2023-11-15',
      role: 'Адміністратор',
      email: 'olena.ivanenko@example.com'
    },
    {
      name: 'Ігор Шевченко',
      photo: 'assets/images/Speaker7.png',
      createdAt: '2024-01-05',
      role: 'Користувач',
      email: 'ihor.shevchenko@example.com'
    },
    {
      name: 'Марія Коваль',
      photo: 'assets/images/Speaker2.png',
      createdAt: '2024-03-12',
      role: 'Модератор',
      email: 'maria.koval@example.com'
    },
    {
      name: 'Андрій Бондар',
      photo: 'assets/images/Speaker5.png',
      createdAt: '2023-09-28',
      role: 'Користувач',
      email: 'andriy.bondar@example.com'
    },
    {
      name: 'Наталія Сидоренко',
      photo: 'assets/images/Speaker3.png',
      createdAt: '2024-04-01',
      role: 'Адміністратор',
      email: 'natalia.sydorenko@example.com'
    }
  ];
  
}
