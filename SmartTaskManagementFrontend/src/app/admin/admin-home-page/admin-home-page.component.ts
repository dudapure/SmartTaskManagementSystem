import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-admin-home-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-home-page.component.html',
  styleUrl: './admin-home-page.component.css',
})
export class AdminHomePageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    const confirmed = confirm('Are you sure you want to logout?');
    if (confirmed) {
      this.authService.logout();
      alert('You have been logged out.');
      this.router.navigate(['/login']);
    }
  }
}
