import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/Tasks/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  user: any;
  taskCounts = { pending: 0, inProgress: 0, completed: 0 };
  editUser: any = {};

  constructor(
    private authService: AuthService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();

    if (this.user?.id) {
      this.taskService.getTasksByUser(this.user.id).subscribe((tasks) => {
        this.taskCounts.pending = tasks.filter(
          (t) => t.status === 'Pending'
        ).length;
        this.taskCounts.inProgress = tasks.filter(
          (t) => t.status === 'InProgress'
        ).length;
        this.taskCounts.completed = tasks.filter(
          (t) => t.status === 'Completed'
        ).length;
      });
    }

    this.editUser = { ...this.user };
  }

  updateProfile(): void {
    this.authService.updateProfile(this.editUser).subscribe({
      next: () => {
        this.user = { ...this.editUser };
        this.authService.saveUser(this.user);
        alert('✅ Profile updated successfully');
      },
      error: () => {
        alert('❌ Failed to update profile. Try again.');
      },
    });
  }
}
