import { useEffect, useState } from "react";
import { TaskType } from "../../interfaces/task-interface";

import style from "./style.module.scss";

export const Tasks: React.FunctionComponent<{
  tasks: TaskType[];
  setTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
  onDelete: (id: number) => void;
}> = ({ tasks, setTask, onDelete }) => {
  const [checks, setChecks] = useState<boolean[]>([]);

  useEffect(() => {
    setChecks(tasks.map((task) => task.isFinish));
  }, [tasks]);

  const onChange = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);

    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          isFinish: newChecks[index],
        };
      }
      return task;
    });

    setTask(updatedTasks);
  };

  return (
    <ul className={style.wrapper}>
      {tasks.map((v, index) => (
        <li className={`${style.item} container`} key={v.id}>
          <input
            type="checkbox"
            className={style.checkbox}
            onChange={() => onChange(index)}
            checked={checks[index] || false}
          />
          <label htmlFor="myCheckbox">
            {checks[index] && (
              <span className={style.checkbox_icon}>&#10004;</span>
            )}
          </label>
          <span className={style.task}>{v.task}</span>
          <button onClick={() => onDelete(v.id)} className={style.delete_btn}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
};
