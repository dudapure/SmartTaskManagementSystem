import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticateResponse } from '../Models/AuthenticateResponse.model';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authservice.login(loginData).subscribe({
        next: (response: AuthenticateResponse) => {
          this.authservice.saveToken(response.token);
          this.authservice.saveUser(response.user);

          alert('Login successful!');
          if (response.user.role == 'admin') {
            this.router.navigate(['/adminhome']); // Navigate to the admin home page
          } else {
            this.router.navigate(['/userhome']); // Navigate to the user home page
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          this.errorMessage = err.error || 'An unknown error occurred.';
        },
      });
    }
  }
}
