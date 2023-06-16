import { useEffect, useState } from "react";
import { ITasksProps, ITaskType } from "../../interfaces/task-interface";

import style from "./style.module.scss";

export const Tasks: React.FunctionComponent<ITasksProps> = ({
  taskContextProp,
  onDelete,
}) => {
  const { tasks, setTask, currTask, setCurrTask } = taskContextProp;
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
    setCurrTask("Not currently doing anything.");
  };

  const onSelect = (id: number) => {
    const selectedTask = tasks.find((task) => task.id === id);
    if (selectedTask) {
      setCurrTask(`${selectedTask.task}`);
    }
  };

  return (
    <ul className={style.wrapper}>
      {tasks.map((v: ITaskType, index: number) => (
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
          <span className={style.task}>
            {v.task} {currTask === v.task && <span>(Current Task)</span>}
          </span>
          <button onClick={() => onSelect(v.id)} className={`btn blue`}>
            Select
          </button>
          <button onClick={() => onDelete(v.id)} className={`btn red`}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
