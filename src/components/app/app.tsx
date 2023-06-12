import { useState } from "react";
import { Card } from "../cards";
import { Title } from "../title";
import { ProgressBar } from "../progress";

export const App: React.FunctionComponent = () => {
  const [count, setCount] = useState(0);
  const progressValue = 50;
  const progressMax = 100;

  return (
    <div className="container">
      <Title />
      <Card />
      <ProgressBar value={progressValue} max={progressMax} />
    </div>
  );
};
