export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  totalTasks: number;
  isActive: boolean;
}
