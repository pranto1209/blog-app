import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterRequest } from '../models/register.request';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  model: RegisterRequest = {
    userName: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onFormSubmit(): void {
    this.authService.registration(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          alert('Invalid User Name or User already exists');
        }
      });
  }
}
