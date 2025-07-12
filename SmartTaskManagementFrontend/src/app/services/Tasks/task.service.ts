import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../Models/task.model';
import { Observable } from 'rxjs';
import { TaskDto } from '../../Models/TaskDto';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  getTasksByUser(
    userId: number,
    category?: string,
    priority?: string,
    sortBy?: string
  ): Observable<Task[]> {
    let url = `${this.apiUrl}/user/${userId}`;
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (priority) params.append('priority', priority);
    if (sortBy) params.append('sortBy', sortBy);
    return this.http.get<Task[]>(`${url}?${params.toString()}`);
  }

  updateTaskStatus(id: number, status: string): Observable<Task> {
    return this.http.put<Task>(
      `${this.apiUrl}/status/${id}`,
      { status },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTasksByUserForAdmin(userId: number): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(`${this.apiUrl}/user/${userId}`);
  }
  getFilteredTasks(
    userId: number,
    category?: string,
    priority?: string,
    sortBy?: string
  ): Observable<Task[]> {
    const url = `${this.apiUrl}/user/${userId}/filtered`;

    let params = new HttpParams();
    if (category) params = params.set('category', category);
    if (priority) params = params.set('priority', priority);
    if (sortBy) params = params.set('sortBy', sortBy);

    return this.http.get<Task[]>(url, { params });
  }

  getUpcomingTasks(userId: number): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(`${this.apiUrl}/upcoming/${userId}`);
  }
}
