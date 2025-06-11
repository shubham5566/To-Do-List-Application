// File: types/Task.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
}