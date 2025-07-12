import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent {
  constructor(private router: Router) {}
  logout() {
    const confirmed = confirm('Are you sure you want to log out?');
    if (confirmed) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
