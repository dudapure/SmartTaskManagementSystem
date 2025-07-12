import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserTasksComponent } from './user/user-tasks/user-tasks.component';
import { AdminHomePageComponent } from './admin/admin-home-page/admin-home-page.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { TasksComponent } from './admin/tasks/tasks.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { UsersComponent } from './admin/users/users.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserUpcomingTasksComponent } from './user/user-upcoming-tasks/user-upcoming-tasks.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'userhome',
    component: UserLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'tasks', component: UserTasksComponent },
      { path: 'upcomingTasks', component: UserUpcomingTasksComponent },
      { path: 'profile', component: UserProfileComponent },
      {
        path: 'settings',
        loadComponent: () =>
          import('./user/user-settings/user-settings.component').then(
            (m) => m.UserSettingsComponent
          ),
      },
    ],
  },
  {
    path: 'adminhome',
    component: AdminHomePageComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'users', component: UsersComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
