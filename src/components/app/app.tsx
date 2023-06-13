import { Card } from "../cards";
import { Title } from "../title";

// Main App :
export const App: React.FunctionComponent = () => {
  return (
    <div className="container">
      <Title />
      <Card />
    </div>
  );
};
