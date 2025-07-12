import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../../Models/login.model';
import { AuthenticateResponse } from '../../Models/AuthenticateResponse.model';
import { User } from '../../Models/user.model';
import { UpdateProfileDto } from '../../Models/update-profile.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {
    console.log('AuthService initialized');
  }

  login(loginModel: LoginModel): Observable<AuthenticateResponse> {
    console.log('Sending login request:', loginModel);
    return this.http.post<AuthenticateResponse>(
      `${this.apiUrl}/user/login`,
      loginModel
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  saveUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/register`, user);
  }
  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentUser');
  }
  changePassword(data: {
    userId: number;
    oldPassword: string;
    newPassword: string;
  }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/user/change-password`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ); // ✅ Full URL
  }

  updateProfile(data: UpdateProfileDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/update-profile`, data);
  }
}
