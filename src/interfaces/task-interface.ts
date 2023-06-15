export interface TaskType {
  id: number;
  task: string;
  isFinish: boolean;
}

export interface TasksContextType {
  tasks: TaskType[];
  currTask: string;
  setTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
  setCurrTask: React.Dispatch<React.SetStateAction<string>>;
}

export interface taskProp {
  tasks: TaskType[];
  currTask: string;
  setTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
  setCurrTask: React.Dispatch<React.SetStateAction<string>>;
  onDelete: (id: number) => void;
}
