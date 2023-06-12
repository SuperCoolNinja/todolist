export interface TaskType {
  id: number;
  task: string;
  isFinish: boolean;
}

export interface TasksContextType {
  tasks: TaskType[];
  setTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
}