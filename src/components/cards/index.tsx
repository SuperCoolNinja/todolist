/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from "react";
import { CardLeft } from "./card-left";
import { CardRight } from "./card-right";
import { TaskType, TasksContextType } from "../../interfaces/task-interface";
import style from "./style.module.scss";

export const TaskContext = createContext<TasksContextType>({
  tasks: [],
  currTask: "",
  setTask: () => {},
  setCurrTask: () => {},
});

export const Card: React.FunctionComponent = () => {
  const [tasks, setTask] = useState<TaskType[]>([]);
  const [currTask, setCurrTask] = useState<string>(
    "Not currently doing anything."
  );

  return (
    <div className={style.card_container}>
      <TaskContext.Provider value={{ tasks, setTask, currTask, setCurrTask }}>
        <CardLeft />
        <CardRight />
      </TaskContext.Provider>
    </div>
  );
};
