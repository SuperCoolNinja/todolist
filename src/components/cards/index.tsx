import { CardLeft } from "./card-left";
import { CardRight } from "./card-right";
import style from "./style.module.scss";

export const Card: React.FunctionComponent = () => {
  return (
    <div className={style.card_container}>
      <CardLeft />
      <CardRight />
    </div>
  );
};
