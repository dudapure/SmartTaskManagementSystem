import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/Tasks/task.service';
import { CategoryService } from '../../services/Categories/category.service';
import { AuthService } from '../../services/Auth/auth.service';
import { Task } from '../../Models/task.model';

import { RouterModule } from '@angular/router';
import { Category } from '../../Models/category';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  categories: Category[] = [];

  categoryFilter: string = '';
  priorityFilter: string = '';
  sortBy: string = '';

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log('Categories:', this.categories);
      this.loadTasks(); // ✅ Load tasks only after categories are fetched
    });
  }

  get userId(): number {
    const user = this.authService.getUser();
    return user?.id ?? 0;
  }

  loadTasks(): void {
    this.taskService.getFilteredTasks(this.userId).subscribe((tasks) => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });
  }

  applyFilters(): void {
    const selectedCategory = this.categories.find(
      (c) => c.categoryId === +this.categoryFilter
    );
    const categoryName = selectedCategory?.name ?? '';

    this.taskService
      .getFilteredTasks(
        this.userId,
        categoryName,
        this.priorityFilter,
        this.sortBy
      )
      .subscribe((tasks) => {
        this.filteredTasks = tasks;
      });
  }

  updateStatus(task: Task, newStatus: string): void {
    console.log(
      `⏳ Updating status to ${newStatus} for task ID ${task.taskId}`
    );
    if (task.status === newStatus) return;

    this.taskService
      .updateTaskStatus(task.taskId!, newStatus)
      .subscribe((updated) => {
        task.status = updated.status;
      });
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }

  getDisplayStatus(status: string): string {
    switch (status) {
      case 'InProgress':
        return 'In Progress';
      default:
        return status;
    }
  }
}
