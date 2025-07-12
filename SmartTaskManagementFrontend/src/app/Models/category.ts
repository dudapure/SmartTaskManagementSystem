import { Task } from './task.model';

export interface Category {
  categoryId?: number;
  name: string;
  tasks?: Task[];
}
