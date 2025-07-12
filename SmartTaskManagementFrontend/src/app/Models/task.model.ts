import { Category } from './category';

export interface Task {
  taskId?: number;
  title: string;
  description: string;
  categoryId: number;
  category?: Category;
  userId: number;
  user?: User;
  status: string;
  priority: string;
  dueDate: string;
  createdAt?: string;
}

export interface User {
  id: number;
  userName: string;
  PasswordHash: string;
  role: string;
  email: string;
}
