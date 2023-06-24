import { ITaskType } from "./task-interface";

export interface ICardLeftProps {
  onDelete: (id: string) => void;
  storeTasksInLocalStorage: (tasks: ITaskType[]) => void;
}
