import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../models/login.request';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  model: LoginRequest = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  onFormSubmit(): void {
    this.authService.login(this.model).subscribe({
      next: (response) => {
        this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');

        this.authService.setUser({
          id: response.id,
          email: response.email,
          roles: response.roles
        });

        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Incorrect email or password');
      }
    });
  }
}
