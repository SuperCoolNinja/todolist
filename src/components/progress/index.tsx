import { useEffect, useState } from "react";
import style from "./style.module.scss";

interface ProgressBarProps {
  value: number;
  max: number;
}

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
