import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/Tasks/task.service';
import { CategoryService } from '../../services/Categories/category.service';
import { UserService } from '../../services/Users/user.service';
import { Task } from '../../Models/task.model';
import { Category } from '../../Models/category';
import { User } from '../../Models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];
  users: User[] = [];

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchAllData();
  }

  fetchAllData() {
    this.taskService.getAllTasks().subscribe((data) => (this.tasks = data));
    this.categoryService
      .getCategories()
      .subscribe((data) => (this.categories = data));
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  get totalUsers(): number {
    return this.users.length;
  }

  get totalTasks(): number {
    return this.tasks.length;
  }

  get tasksCompleted(): number {
    return this.tasks.filter((t) => t.status === 'Completed').length;
  }

  get tasksPending(): number {
    return this.tasks.filter((t) => t.status === 'Pending').length;
  }

  get tasksInProgress(): number {
    return this.tasks.filter((t) => t.status === 'InProgress').length;
  }

  get totalCategories(): number {
    return this.categories.length;
  }

  get recentTasks(): Task[] {
    return this.tasks.slice(-5).reverse(); // Last 5 tasks
  }

  getCategoryNameById(categoryId: number): string {
    const category = this.categories.find((c) => c.categoryId === categoryId);
    return category ? category.name : 'Unknown';
  }
}
