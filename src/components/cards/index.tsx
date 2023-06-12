/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, Dispatch, SetStateAction } from "react";
import { CardLeft } from "./card-left";
import { CardRight } from "./card-right";
import { TaskType, TasksContextType } from "../../interfaces/task-interface";
import style from "./style.module.scss";

export const TaskContext = createContext<TasksContextType>({
  tasks: [],
  setTask: () => {},
});

export const Card: React.FunctionComponent = () => {
  const [tasks, setTask] = useState<TaskType[]>([
    { id: 0, task: "foo", isFinish: false },
    { id: 0, task: "bar", isFinish: true },
  ]);

  return (
    <div className={style.card_container}>
      <TaskContext.Provider value={{ tasks, setTask }}>
        <CardLeft />
        <CardRight />
      </TaskContext.Provider>
    </div>
  );
};
