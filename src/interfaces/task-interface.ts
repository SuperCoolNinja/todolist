import { InotifType } from "./notification-interface";

export interface ITaskType {
  id: number;
  task: string;
  isFinish: boolean;
}

export interface ITasksProps {
  taskContextProp: ITasksContextType;
  onDelete: (id: number) => void;
}

export interface ITasksContextType {
  tasks: ITaskType[];
  currTask: string;
  setTask: React.Dispatch<React.SetStateAction<ITaskType[]>>;
  setCurrTask: React.Dispatch<React.SetStateAction<string>>;
  showNotif: InotifType;
  setNotif: React.Dispatch<React.SetStateAction<InotifType>>;
}

export interface ItaskProp {
  tasks: ITaskType[];
  currTask: string;
  setTask: React.Dispatch<React.SetStateAction<ITaskType[]>>;
  setCurrTask: React.Dispatch<React.SetStateAction<string>>;
  onDelete: (id: number) => void;
}
