export interface ObjBaseType {
  id?: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  creator: string;
  content: string;
  password: string;
  user_id?: string
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

export type ObjUser = { picture: string; username: string; user_id: string }
  

export interface ContextAuthTypes {
  user: ObjUser
}

export interface Collaborator {
  username: string; 
  user_id: number; 
  id?: number; 
  project_id?: number; 
}

export interface CustomControls {
  openChat: boolean;
  openList: boolean;
  openAdduser: boolean;
  handleOpenList: () => void;
  handleOpenModal: () => void;
  handleOpenChat: () => void;
}
