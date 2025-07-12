import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '../../Models/category';
import { TaskService } from '../../services/Tasks/task.service';
import { CategoryService } from '../../services/Categories/category.service';
import { Task } from '../../Models/task.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/Users/user.service';
import { User } from '../../Models/user.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  taskForm!: FormGroup;
  categories: (Category & { expanded?: boolean })[] = [];
  tasks: Task[] = [];
  users: User[] = [];
  currentPage: { [key: number]: number } = {};
  pageSize = 3;
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      categoryId: [null, Validators.required],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required],
      userId: [null, Validators.required],
      status: ['', Validators.required],
    });
    this.loadCategoriesAndTasks();
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data.map((cat) => ({
        ...cat,
        tasks: cat.tasks ?? [],
      }));
    });
    this.fetchTasks();
    this.taskService.getAllTasks().subscribe((data) => {
      this.tasks = data;
    });
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data.filter((u) => u.role === 'user'); // Only include normal users
    });
    this.categories.forEach((category) => {
      if (category.categoryId !== undefined) {
        this.currentPage[category.categoryId] = 1;
      }
    });
  }
  loadCategoriesAndTasks() {
    this.categoryService.getCategories().subscribe((categoryData) => {
      this.taskService.getAllTasks().subscribe((taskData) => {
        this.tasks = taskData;

        // Attach tasks and default to empty array if missing
        this.categories = categoryData.map((cat) => ({
          ...cat,
          tasks: taskData.filter((t) => t.categoryId === cat.categoryId) ?? [],
        }));

        // Set pagination defaults
        this.categories.forEach((category) => {
          if (category.categoryId !== undefined) {
            this.currentPage[category.categoryId] = 1;
          }
        });

        console.log(this.categories);
      });
    });
  }

  createTask() {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      this.taskService.createTask(task).subscribe({
        next: () => {
          alert('Task created successfully!');
          console.log(task);
          this.taskForm.reset();
          this.loadCategoriesAndTasks();
        },
        error: (err) => {
          console.error('Task creation failed:', err);
          alert('Failed to create task');
        },
      });
    }
  }

  fetchTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (res) => {
        console.log(res); // Check the structure!
        this.tasks = res; // Make sure this is an array
      },
      error: (err) => console.error(err),
    });
  }
  getTasksByCategory(categoryId: number): Task[] {
    return this.tasks.filter((t) => t.categoryId === categoryId);
  }
  getUserName(userId: number): string {
    const user = this.users.find((u) => u.id === userId);
    return user ? `${user.userName} (${user.email})` : 'Unknown';
  }

  nextPage(categoryId: number | undefined, totalItems: number) {
    if (categoryId === undefined) return;

    const totalPages = Math.ceil(totalItems / this.pageSize);
    if (this.currentPage[categoryId] < totalPages) {
      this.currentPage[categoryId]++;
    }
  }

  prevPage(categoryId: number | undefined) {
    if (categoryId === undefined) return;

    if (this.currentPage[categoryId] > 1) {
      this.currentPage[categoryId]--;
    }
  }
}
