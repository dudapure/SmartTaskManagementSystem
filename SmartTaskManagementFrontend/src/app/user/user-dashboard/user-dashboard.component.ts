import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/Auth/auth.service';
import { TaskDto } from '../../Models/TaskDto';
import { Task, User } from '../../Models/task.model';
import { TaskService } from '../../services/Tasks/task.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;
  upcomingTasks: TaskDto[] = [];
  user: User | null = null;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();

    if (this.user && this.user.id) {
      const userId = this.user.id;

      this.taskService.getTasksByUser(userId).subscribe((tasks: Task[]) => {
        this.totalTasks = tasks.length;
        this.completedTasks = tasks.filter(
          (t) => t.status === 'Completed'
        ).length;
        this.pendingTasks = tasks.filter(
          (t) => t.status !== 'Completed'
        ).length;
      });

      this.taskService
        .getUpcomingTasks(userId)
        .subscribe((tasks: TaskDto[]) => {
          this.upcomingTasks = tasks.slice(0, 5); // Limit to 5 upcoming tasks
        });
    } else {
      console.error('User not found in localStorage!');
    }
  }
}
