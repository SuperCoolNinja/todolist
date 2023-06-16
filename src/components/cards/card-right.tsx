/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import style from "./style.module.scss";
import { TaskContext } from "./index.tsx";

export const CardRight: React.FunctionComponent = () => {
  const MAX_TIMER = 25 * 60; // 25 minutes;
  const { tasks, setTask, currTask, setCurrTask } = useContext(TaskContext);
  const [remainingTime, setRemaningTime] = useState(MAX_TIMER);
  const [timerId, setTimerId] = useState<number | null>(null);
  const [timerBegin, setTimerBegin] = useState<boolean>(false);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  // Manage the timer laps :
  useEffect(() => {
    if (timerBegin) {
      const updateTimer = () => {
        setRemaningTime((prev) => prev - 1);
      };

      if (remainingTime >= 0) {
        const id = setTimeout(updateTimer, 1000);
        setTimerId(id);
      } else {
        setTimerBegin(false);
        setRemaningTime(MAX_TIMER);
      }
    } else {
      return () => {
        if (timerId) {
          clearTimeout(timerId);
        }
      };
    }

    if (currTask === "Not currently doing anything.") {
      return () => {
        if (timerId) {
          setTimerBegin(false);
          clearTimeout(timerId);
          setRemaningTime(MAX_TIMER);
        }
      };
    }
  }, [timerBegin, remainingTime]);

  const onTaskDone = () => {
    const updatedTasks = tasks.map((v) => {
      if (v.task === currTask) {
        return { ...v, isFinish: true };
      }
      return v;
    });

    setTask(updatedTasks);
    setCurrTask("Not currently doing anything.");
  };

  const onTimerBegin = () => setTimerBegin(true);

  return (
    <div className={style.card_right}>
      <h1 className={style.title}>Currently doing</h1>
      <p className={style.currTask}>{currTask}</p>

      {currTask !== "Not currently doing anything." && (
        <div className={style.wrapper_btn}>
          <button
            onClick={onTaskDone}
            className={`${style.btn_bigger} btn white`}
          >
            I'm done ✅
          </button>
          <button
            onClick={onTimerBegin}
            className={`${style.btn_bigger} btn orange`}
          >
            Start 25' timer
          </button>
        </div>
      )}

      {timerBegin && (
        <p className={style.timer}>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </p>
      )}
    </div>
  );
};
