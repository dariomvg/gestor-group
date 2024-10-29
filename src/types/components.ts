import { Dispatch, ReactNode, SetStateAction } from "react";
import { ObjBaseType, TaskType } from "./global";

export interface PropsCardMain {
  children: ReactNode;
}

export interface PropsCardProject {
  item: ObjBaseType;
}

export interface PropsLinkProject {
  id: number;
  title: string;
}

export interface MessageChat {
  message: string;
  username: string; 
}

export interface PropsChat {
  open: boolean;
  addMessage: (msg: string) => void; 
  messages: MessageChat[]; 

}

export interface PropsListTasks {
  open: boolean;
  handleOpenList: () => void;
  addTask: (form: string) => void; 
  deleteTask: (id: number) => void;
  project: ObjBaseType;
}

export interface PropsCreateTask {
  setViewCreate: (value: boolean) => void;
  addTask: (form: string) => void; 
}

export interface Colaborator {
  name: string
}

export interface PropsModalPassword {
  open: boolean;
  handleOpenModal: () => void;
  project: ObjBaseType;
  changePassword: () => void; 
  removeColaborate: (name: string) => void; 
  colaborators: Colaborator[];
  user: string; 
}

export interface PropsListColaborates {
  colaborators: Colaborator[];
  verifyRemoveColaborate: (name: string) => void; 
}

export interface CustomFindProject {
  project: ObjBaseType;
}

export interface CustomHandleProject {
  addProject: (project: ObjBaseType, user: string) => void;
  deleteProject: () => void;
  projects: ObjBaseType[];
  addTask: (form: string) => void; 
  deleteTask: (id: number) => void;
  project: ObjBaseType;
  changePassword: () => void; 
  movePassword: (verify: boolean) => void; 
  verifyPass: boolean; 
  user: string;
  removeColaborate: (name: string) => void;
  colaborators: Colaborator[];
  valueText: string; 
  setValueText: Dispatch<SetStateAction<string>>; 
  saveContent: () => void; 
  addMessage: (msg: string) => void; 
  messages: MessageChat[];
}

export interface CustomControls {
  openChat: boolean;
  openList: boolean;
  openAdduser: boolean;
  handleOpenList: () => void;
  handleOpenModal: () => void;
  handleOpenChat: () => void;
}
