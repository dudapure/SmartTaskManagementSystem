import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControlOptions,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        UserName: ['', [Validators.required, Validators.minLength(8)]],
        Email: ['', [Validators.required, Validators.email]],
        PasswordHash: ['', [Validators.required, Validators.maxLength(8)]],
        confirmPassword: ['', [Validators.required]],
        role: ['user'],
      },
      {
        validators: this.passwordMatchValidator,
      } as AbstractControlOptions
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('PasswordHash')?.value;
    const confirmPass = form.get('confirmPassword')?.value;
    if (pass !== confirmPass) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.authservice.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          if (response && response.message) {
            alert(response.message);
            this.router.navigate(['/login']);
          }
        },
        error: (err: { error: string }) => {
          this.errorMessage =
            err.error || 'An error occurred during registration.';
        },
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
