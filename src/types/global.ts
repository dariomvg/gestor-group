import { ReactNode } from "react";

export interface ObjBaseType {
  id: number;
  title: string;
  description: string;
  start_date: string;
  last_date: string;
  creator: string;
  content: string;
  password: string;

  tasks: TaskType[];
  messages: string[];
}

export interface TaskType {
  id: number;
  task: string;
}

export interface ContextProjectTypes {
    login: (data: string) => void; 
    logout: () => void; 
    user: string; 
}

export interface ChildrenContext {
    children: ReactNode;
}

