import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getUserRole();
    if (role === 'Autor') {
      return true;
    }
    
    this.router.navigate(['/error-page']); // Перенаправление, если нет доступа
    return false;
  }
}
