import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsAutho implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  canActivate(): boolean {
    const role = this.userService.getUserRole();
    if (role === 'Autor') {
      return true;
    }
    if (role === 'User') {
      this.router.navigate(['/becaming-author-page']);
      return false;
    }
    else{
      this.router.navigate(['/login-page']);
      return false;
    }
  }
}
