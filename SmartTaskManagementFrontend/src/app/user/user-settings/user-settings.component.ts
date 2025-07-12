import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/Auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { UpdateProfileDto } from '../../Models/update-profile.dto';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  user: any;
  updatedUser: UpdateProfileDto = {
    id: 0,
    userName: '',
    email: '',
  };
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  message = '';
  error = '';
  profileMessage = '';
  profileError = '';

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user) {
      this.updatedUser = {
        id: this.user.id,
        userName: this.user.userName,
        email: this.user.email,
      };
    }
  }

  changePassword(): void {
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      this.error = 'All fields are required.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.error = 'New passwords do not match.';
      return;
    }

    const payload = {
      userId: this.user.id,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    };

    this.authService.changePassword(payload).subscribe({
      next: (res) => {
        this.message = '✅ ' + res.message;
        this.error = '';
        this.oldPassword = this.newPassword = this.confirmPassword = '';
      },
      error: (err) => {
        this.error = err.error.message || '❌ Error occurred';
        this.message = '';
      },
    });
  }

  updateProfile(): void {
    this.authService.updateProfile(this.updatedUser).subscribe({
      next: (res: any) => {
        this.profileMessage = '✅ ' + res.message;
        this.profileError = '';
        const updated = {
          ...this.user,
          userName: this.updatedUser.userName,
          email: this.updatedUser.email,
        };
        this.authService.saveUser(updated);
      },
      error: (err) => {
        this.profileError =
          err?.error?.message || '❌ Failed to update profile';
        this.profileMessage = '';
      },
    });
  }
}
