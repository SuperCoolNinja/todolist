import { InotifType } from "./notification-interface";

export interface ITaskType {
  id: string;
  task: string;
  isFinish: boolean;
}

export interface ITasksProps {
  taskContextProp: ITasksContextType;
  onDelete: (id: string) => void;
  storeTasksInLocalStorage : (tasks: ITaskType[]) => void;
}

export interface ITasksContextType {
  tasks: ITaskType[];
  currTask: string;
  setTask: React.Dispatch<React.SetStateAction<ITaskType[]>>;
  setCurrTask: React.Dispatch<React.SetStateAction<string>>;
  showNotif: InotifType;
  setNotif: React.Dispatch<React.SetStateAction<InotifType>>;
  currTaskId: string;
  setCurrTaskId: React.Dispatch<React.SetStateAction<string>>;
}

export interface ItaskProp {
  tasks: ITaskType[];
  currTask: string;
  setTask: React.Dispatch<React.SetStateAction<ITaskType[]>>;
  setCurrTask: React.Dispatch<React.SetStateAction<string>>;
  currTaskId: string;
  setCurrTaskId: React.Dispatch<React.SetStateAction<string>>;
  onDelete: (id: number) => void;
}
