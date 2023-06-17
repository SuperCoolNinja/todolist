import { ITaskType } from "./task-interface";

export interface ICardRightProp {
  storeTasksInLocalStorage: (tasks: ITaskType[]) => void;
}
