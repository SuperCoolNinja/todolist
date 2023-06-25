/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "./index.tsx";

import style from "./style.module.scss";
import { CardWrapperBtn } from "./card-btn/index.tsx";
import { ICardRightProp } from "../../interfaces/cardright-interface.ts";

export const CardRight: React.FunctionComponent<ICardRightProp> = ({
  storeTasksInLocalStorage,
}) => {
  const MAX_TIMER = 25 * 60; // 25 minutes;
  const { tasks, setTask, currTask, setCurrTask, currTaskId, setCurrTaskId } = useContext(TaskContext);
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
      if (v.id === currTaskId) {
        return { ...v, isFinish: true };
      }
      return v;
    });

    setTask(updatedTasks);
    storeTasksInLocalStorage(updatedTasks);
    setCurrTask("Not currently doing anything.");
    setCurrTaskId("");
  };

  const onTimerBegin = () => setTimerBegin(true);

  return (
    <div className={style.card_right}>
      <h1 className={style.title}>Currently doing</h1>
      <p className={style.currTask}>{currTask}</p>

      {currTask !== "Not currently doing anything." && (
        <CardWrapperBtn onTaskDone={onTaskDone} onTimerBegin={onTimerBegin} />
      )}

      {timerBegin && (
        <p className={style.timer}>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </p>
      )}
    </div>
  );
};
