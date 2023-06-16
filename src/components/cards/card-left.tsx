import React, { useContext, useState } from "react";
import { ProgressBar } from "../progress/index.tsx";
import { TaskContext } from "../cards/index.tsx";
import { Tasks } from "../Tasks/index.tsx";

import { Notification } from "../notification/index.tsx";
import { TasksContextType } from "../../interfaces/task-interface.ts";
import { ENotifType } from "../../enums/notification-enum.ts";

import { OnDeleteSignature } from "../../interfaces/cardleft-interface.ts";

import { CardInput } from "./card-input/index.tsx";
import { Title } from "./card-title.tsx";

import style from "./style.module.scss";

export const CardLeft: React.FunctionComponent<OnDeleteSignature> = ({
  onDelete,
}) => {
  const { tasks, setTask, currTask, setCurrTask, showNotif, setNotif } =
    useContext(TaskContext);
  const [value, setValue] = useState<string>("");

  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter((task) => task.isFinish).length;

  const tasksContextProps: TasksContextType = {
    tasks,
    currTask,
    setTask,
    setCurrTask,
    showNotif,
    setNotif,
  };

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

  return (
    <div className={style.card_left}>
      <CardInput onSubmit={onSubmit} value={value} setValue={setValue} />

      <Title />

      <Tasks taskContextProp={tasksContextProps} onDelete={onDelete} />

      {totalTasksCount > 0 && (
        <ProgressBar value={completedTasksCount} max={totalTasksCount} />
      )}

      {showNotif.bShow && (
        <Notification
          txt={showNotif.txt || ""}
          type={showNotif.type || ENotifType.INFO}
        />
      )}
    </div>
  );
};
