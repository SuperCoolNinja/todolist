import { useEffect, useState } from "react";
import { ProgressBarProps } from "../../interfaces/progress-interface";
import style from "./style.module.scss";

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max }) => {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const width = (value / max) * 100;
    setProgressWidth(width);
  }, [value, max]);

  return (
    <div className={style.progressBar}>
      <div className={style.progress} style={{ width: `${progressWidth}%` }} />
    </div>
  );
};
