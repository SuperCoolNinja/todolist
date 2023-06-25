import { useEffect, useState } from "react";
import { ITasksProps, ITaskType } from "../../interfaces/task-interface";

import style from "./style.module.scss";

export const Tasks: React.FunctionComponent<ITasksProps> = ({
  taskContextProp,
  onDelete,
  storeTasksInLocalStorage,
}) => {
  const { tasks, setTask, setCurrTask, currTaskId, setCurrTaskId } = taskContextProp;
  const [checks, setChecks] = useState<boolean[]>([]);

  useEffect(() => {
    setChecks(tasks.map((task) => task.isFinish));
  }, [tasks]);

  const onChange = (taskId: string) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      return; // Tâche introuvable, retourner
    }

    const newChecks = [...checks];
    newChecks[taskIndex] = !newChecks[taskIndex];
    setChecks(newChecks);

    const updatedTasks = tasks.map((task, index) => {
      if (index === taskIndex) {
        return {
          ...task,
          isFinish: newChecks[index],
        };
      }
      return task;
    });

    setTask(updatedTasks);
    storeTasksInLocalStorage(updatedTasks);

    setCurrTask("Not currently doing anything.");
    setCurrTaskId("");
  };

  const onSelect = (id: string) => {
    const selectedTask = tasks.find((task) => task.id === id);
    setCurrTaskId(id);
    if (selectedTask) {
      setCurrTask(`${selectedTask.task}`);
    }
  };

  return (
    <ul className={style.wrapper}>
      {tasks.map((v: ITaskType) => (
        <li className={`${style.item} container`} key={v.id}>
          <input
            type="checkbox"
            className={style.checkbox}
            onChange={() => onChange(v.id)} // Utiliser v.id au lieu de l'index
            checked={checks[tasks.findIndex((task) => task.id === v.id)] || false} // Utiliser findIndex pour trouver l'index par l'identifiant
          />
          <label htmlFor="myCheckbox">
            {checks[tasks.findIndex((task) => task.id === v.id)] && (
              <span className={style.checkbox_icon}>&#10004;</span>
            )}
          </label>
          <span className={style.task}>
            {v.task} {currTaskId === v.id && <span>(Current Task)</span>}
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