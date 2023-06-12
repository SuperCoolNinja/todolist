import { useContext } from "react";
import { TaskContext } from "./index.tsx";
import { Tasks } from "../Tasks";

import style from "./style.module.scss";

export const CardLeft: React.FunctionComponent = () => {
  const { tasks } = useContext(TaskContext); // Remove unused setTask
  const title = "My Tasks";

  return (
    <div className={style.card_left}>
      <input
        className={style.input}
        type="text"
        placeholder="Type your task todo..."
      />
      <h3 className={style.title}>{title}</h3>
      <Tasks tasks={tasks} />
    </div>
  );
};
