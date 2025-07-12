import { Component, OnInit } from '@angular/core';
import { TaskDto } from '../../Models/TaskDto';
import { TaskService } from '../../services/Tasks/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-user-upcoming-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-upcoming-tasks.component.html',
  styleUrl: './user-upcoming-tasks.component.css',
})
export class UserUpcomingTasksComponent implements OnInit {
  upcomingTasks: TaskDto[] = [];
  filteredTasks: TaskDto[] = [];
  allCategories: string[] = [];

  // Filters
  filterCategory: string = '';
  filterPriority: string = '';
  filterStatus: string = '';

  userId: number = 0;
  currentPage: number = 1;
  tasksPerPage: number = 5;

  sortBy: string = '';
  sortAsc: boolean = true;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (!user || !user.id) {
      console.error('User not logged in.');
      return;
    }

    this.userId = user.id;

    this.taskService.getUpcomingTasks(this.userId).subscribe({
      next: (res) => {
        this.upcomingTasks = res.sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );
        this.filteredTasks = [...this.upcomingTasks];
        this.allCategories = [...new Set(res.map((task) => task.categoryName))];
      },
      error: (err) => {
        console.error('Error fetching upcoming tasks', err);
      },
    });
  }

  getDaysLeft(dueDate: string): number {
    const due = new Date(dueDate);
    const today = new Date();
    const diff = due.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  applyFilters(): void {
    this.filteredTasks = this.upcomingTasks.filter((task) => {
      const categoryMatch = this.filterCategory
        ? task.categoryName === this.filterCategory
        : true;
      const priorityMatch = this.filterPriority
        ? task.priority === this.filterPriority
        : true;
      const statusMatch = this.filterStatus
        ? task.status === this.filterStatus
        : true;
      return categoryMatch && priorityMatch && statusMatch;
    });
  }

  changeStatus(task: TaskDto): void {
    this.taskService.updateTaskStatus(task.taskId, task.status).subscribe({
      next: () =>
        console.log(`Updated status for Task ${task.taskId} to ${task.status}`),
      error: (err) => console.error('Status update failed', err),
    });
  }

  get paginatedTasks(): TaskDto[] {
    const start = (this.currentPage - 1) * this.tasksPerPage;
    const end = start + this.tasksPerPage;
    return this.filteredTasks.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTasks.length / this.tasksPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  sortTasks(column: string): void {
    if (this.sortBy === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortBy = column;
      this.sortAsc = true;
    }

    this.filteredTasks.sort((a, b) => {
      const valA = a[column as keyof TaskDto];
      const valB = b[column as keyof TaskDto];

      if (valA && valB) {
        return this.sortAsc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      }
      return 0;
    });
  }

  get completedCount(): number {
    return this.filteredTasks.filter((t) => t.status === 'Completed').length;
  }

  get progressPercent(): number {
    if (this.filteredTasks.length === 0) return 0;
    return Math.round((this.completedCount / this.filteredTasks.length) * 100);
  }
}
