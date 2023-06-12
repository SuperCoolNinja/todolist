import { Card } from "../cards";
import { Title } from "../title";
import { ProgressBar } from "../progress";

// Main App :
export const App: React.FunctionComponent = () => {
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
