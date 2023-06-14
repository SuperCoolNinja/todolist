import React, { useContext, useState, useEffect } from "react";
import { ProgressBar } from "../progress/index.tsx";
import { TaskContext } from "../cards/index.tsx";
import { Tasks } from "../Tasks/index.tsx";

import style from "./style.module.scss";

export const CardLeft: React.FunctionComponent = () => {
  const { tasks, setTask } = useContext(TaskContext);
  const [value, setValue] = useState<string>("");
  const [totalTasksCount, setTotalTasksCount] = useState<number>(0);
  const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [txtNotification, setTxtNotification] = useState<string>("");

  useEffect(() => {
    setTotalTasksCount(tasks.length);
    setCompletedTasksCount(tasks.filter((task) => task.isFinish).length);
  }, [tasks]);

  useEffect(() => {
    if (completedTasksCount === totalTasksCount && totalTasksCount > 0) {
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
    setTxtNotification("Task deleted !");
    setShowNotification(true);

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
      <Tasks tasks={tasks} setTask={setTask} onDelete={onDelete} />

      {totalTasksCount > 0 && (
        <ProgressBar value={completedTasksCount} max={totalTasksCount} />
      )}

      {showNotification && (
        <div className={`${style.notification} ${style.success}`}>
          {txtNotification}
        </div>
      )}
    </div>
  );
};