import { notifType } from "./notification-interface";

export interface TaskType {
  id: number;
  task: string;
  isFinish: boolean;
}

export interface TasksProps {
  taskContextProp: TasksContextType;
  onDelete: (id: number) => void;
}

export interface TasksContextType {
  tasks: TaskType[];
  currTask: string;
  setTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
  setCurrTask: React.Dispatch<React.SetStateAction<string>>;
  showNotif: notifType;
  setNotif: React.Dispatch<React.SetStateAction<notifType>>;
}

export interface taskProp {
  tasks: TaskType[];
  currTask: string;
  setTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
  setCurrTask: React.Dispatch<React.SetStateAction<string>>;
  onDelete: (id: number) => void;
}
