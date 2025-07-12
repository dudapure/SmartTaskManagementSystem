import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/Users/user.service';
import { AdminUser } from '../../Models/admin-user.model';
import { CommonModule } from '@angular/common';
import { TaskDto } from '../../Models/TaskDto';
import { TaskService } from '../../services/Tasks/task.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: AdminUser[] = [];
  selectedUserTasks: TaskDto[] = [];
  selectedUserEmail: string = '';
  showTasks: boolean = false;
  selectedUser: AdminUser | null = null;
  pageSize = 5;
  currentPage = 1;

  constructor(
    private userService: UserService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUserDetails().subscribe({
      next: (res) => (this.users = res),
      error: (err) => console.error(err),
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter((u) => u.id !== userId);
          alert('User deleted successfully!');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete user.');
        },
      });
    }
  }

  viewTasks(user: AdminUser): void {
    this.selectedUser = user;
    this.taskService.getTasksByUserForAdmin(user.id).subscribe({
      next: (tasks: TaskDto[]) => {
        this.selectedUserTasks = tasks;
        this.selectedUserEmail = user.email;
        this.showTasks = true;
      },
      error: (err: any) => {
        console.error(err);
        alert('Failed to fetch tasks for the user.');
      },
    });
  }

  closeTasks(): void {
    this.showTasks = false;
    this.selectedUserTasks = [];
    this.selectedUserEmail = '';
  }

  toggleActive(user: AdminUser): void {
    this.userService.toggleActive(user.id).subscribe({
      next: (res) => {
        user.isActive = res.isActive;
        alert(
          `User ${res.isActive ? 'activated' : 'deactivated'} successfully.`
        );
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update user status.');
      },
    });
  }
  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.users.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.users.length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
}
