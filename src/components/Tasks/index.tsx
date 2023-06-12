import { TaskType } from "../../interfaces/task-interface";

export const Tasks: React.FunctionComponent<{ tasks: TaskType[] }> = ({
  tasks,
}) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input type="checkbox" className="checkbox" checked={task.isFinish} />
          {task.task}
          <button className="delete_btn">X</button>
        </li>
      ))}
    </ul>
  );
};
