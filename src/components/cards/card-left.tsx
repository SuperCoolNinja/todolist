import { useContext, useState, useEffect } from "react";
import { ProgressBar } from "../progress/index.tsx";
import { TaskContext } from "../cards/index.tsx";
import { Tasks } from "../Tasks/index.tsx";

import style from "./style.module.scss";

export const CardLeft: React.FunctionComponent = () => {
  const {tasks, setTask } = useContext(TaskContext);
  const [value, setValue] = useState<string>("");
  const [totalTasksCount, setTotalTasksCount] = useState<number>(0);
  const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  useEffect(() => {
    setTotalTasksCount(tasks.length);
    setCompletedTasksCount(tasks.filter((task) => task.isFinish).length);
  }, [tasks]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value !== "") {
      const inputCopy = [
        ...tasks,
        { id: tasks.length, task: value, isFinish: false },
      ];
      setTask(inputCopy);
      setValue("");
    }
  };

  const isAllTasksCompleted = completedTasksCount === totalTasksCount;

  const onDelete = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTask(updatedTasks);
  };

  useEffect(() => {
    if (isAllTasksCompleted) {
      setCompletedTasksCount(totalTasksCount);
      setShowNotification(true);

      const timeout = setTimeout(() => {
        setShowNotification(false);
        setTask([]);
      }, 2000);

      return () => clearTimeout(timeout);
    } else {
      setShowNotification(false);
    }
  }, [isAllTasksCompleted, setTask, totalTasksCount]);

  return (
    <div className={style.card_left}>
      <form onSubmit={(e) => onSubmit(e)}>
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

      {totalTasksCount > 0 && showNotification && (
        <div className={style.notification}>
          All tasks completed! Congratulations!
        </div>
      )}
    </div>
  );
};
