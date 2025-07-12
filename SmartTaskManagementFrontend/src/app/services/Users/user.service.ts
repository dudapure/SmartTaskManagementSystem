import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../Models/user.model';
import { AdminUser } from '../../Models/admin-user.model';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = API_URL;
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }
  getAllUserDetails(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${this.apiUrl}/details`);
  }
  deleteUser(userId: number) {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
  toggleActive(userId: number) {
    return this.http.put<any>(`${this.apiUrl}/toggle-active/${userId}`, {});
  }
}
