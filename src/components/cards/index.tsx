/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useEffect, useState } from "react";
import { CardLeft } from "./card-left";
import { CardRight } from "./card-right";
import { ITaskType, ITasksContextType } from "../../interfaces/task-interface";
import { InotifType } from "../../interfaces/notification-interface";
import { ENotifType } from "../../enums/notification-enum";

import style from "./style.module.scss";





export const TaskContext = createContext<ITasksContextType>({
  tasks: [],
  currTask: "",
  setTask: () => {},
  setCurrTask: () => {},
  showNotif: {
    txt: "",
    type: ENotifType.INFO,
    bShow: false,
  },
  setNotif: () => {},
});

export const Card: React.FunctionComponent = () => {
  const [tasks, setTask] = useState<ITaskType[]>([]);
  const [currTask, setCurrTask] = useState<string>(
    "Not currently doing anything."
  );
  const [totalTasksCount, setTotalTasksCount] = useState<number>(0);
  const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);

  const [showNotif, setNotif] = useState<InotifType>({
    txt: "",
    type: ENotifType.INFO,
    bShow: false,
  });

  const storeTasksInLocalStorage = (tasks: ITaskType[]) => {
    const tasksJSON = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksJSON);
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTask(parsedTasks);
    }
  }, []);

  useEffect(() => {
    setTotalTasksCount(tasks.length);
    setCompletedTasksCount(tasks.filter((task) => task.isFinish).length);
  }, [tasks]);

  useEffect(() => {
    if (completedTasksCount === totalTasksCount && totalTasksCount > 0) {
      setNotif({
        txt: "All tasks completed! Congratulations!",
        type: ENotifType.SUCCESS,
        bShow: true,
      });

      const timeout = setTimeout(() => {
        setNotif({ bShow: false });
        setTask([]);
      }, 2000);

      storeTasksInLocalStorage([]);

      return () => clearTimeout(timeout);
    }
  }, [completedTasksCount, totalTasksCount, setTask]);

  const onDelete = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTask(updatedTasks);
    storeTasksInLocalStorage(updatedTasks);
    setCompletedTasksCount(completedTasksCount - 1);

    setNotif({
      txt: "Task deleted !",
      type: ENotifType.INFO,
      bShow: true,
    });

    setCurrTask("Not currently doing anything.");

    const timeout = setTimeout(() => {
      setNotif({ bShow: false });
    }, 2000);

    return () => clearTimeout(timeout);
  };

  return (
    <div className={style.card_container}>
      <TaskContext.Provider
        value={{ tasks, setTask, currTask, setCurrTask, showNotif, setNotif }}
      >
        <CardLeft
          onDelete={onDelete}
          storeTasksInLocalStorage={storeTasksInLocalStorage}
        />
        <CardRight storeTasksInLocalStorage={storeTasksInLocalStorage} />
      </TaskContext.Provider>
    </div>
  );
};
