import React, { useContext, useState, useEffect } from "react";
import { ProgressBar } from "../progress/index.tsx";
import { TaskContext } from "../cards/index.tsx";
import { Tasks } from "../Tasks/index.tsx";

import style from "./style.module.scss";
import { TasksContextType } from "../../interfaces/task-interface.ts";
import { Notification } from "../notification/index.tsx";
import { NotifType } from "../../enums/notification-enum.ts";

export const CardLeft: React.FunctionComponent = () => {
  const { tasks, setTask, currTask, setCurrTask } = useContext(TaskContext);
  const [value, setValue] = useState<string>("");
  const [totalTasksCount, setTotalTasksCount] = useState<number>(0);
  const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [txtNotification, setTxtNotification] = useState<string>("");
  const [notifType, setNotifType] = useState<NotifType>(NotifType.INFO);

  const tasksContextProps: TasksContextType = {
    tasks,
    currTask,
    setTask,
    setCurrTask,
  };

  useEffect(() => {
    setTotalTasksCount(tasks.length);
    setCompletedTasksCount(tasks.filter((task) => task.isFinish).length);
  }, [tasks]);

  useEffect(() => {
    if (completedTasksCount === totalTasksCount && totalTasksCount > 0) {
      setNotifType(NotifType.SUCCESS);
      setTxtNotification("All tasks completed! Congratulations!");
      setShowNotification(true);

      const timeout = setTimeout(() => {
        setShowNotification(false);
        setTask([]);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [completedTasksCount, totalTasksCount, setTask]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim() !== "") {
      const newTask = {
        id: tasks.length + 1,
        task: value,
        isFinish: false,
      };
      setTask([...tasks, newTask]);
      setValue("");
    }
  };

  const onDelete = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTask(updatedTasks);
    setCompletedTasksCount(completedTasksCount - 1); // Mise à jour du compteur de tâches terminées
    setNotifType(NotifType.INFO);
    setTxtNotification("Task deleted !");
    setShowNotification(true);
    setCurrTask("Not currently doing anything.");
    const timeout = setTimeout(() => {
      setShowNotification(false);
    }, 2000);

    return () => clearTimeout(timeout);
  };

  return (
    <div className={style.card_left}>
      <form onSubmit={onSubmit}>
        <input
          className={style.input}
          type="text"
          placeholder="Type your task todo..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>

      <h3 className={style.title}>My Tasks</h3>

      <Tasks taskContextProp={tasksContextProps} onDelete={onDelete} />

      {totalTasksCount > 0 && (
        <ProgressBar value={completedTasksCount} max={totalTasksCount} />
      )}

      {showNotification && (
        <Notification txt={txtNotification} type={notifType} />
      )}
    </div>
  );
};
