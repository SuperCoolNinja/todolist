import { Title } from "../title";
import style from "./style.module.scss";

export const CardLeft: React.FunctionComponent = () => {
  const title = "My Tasks";


  return (
    <div className={style.card_left}>
      <input className={style.input} type="text" placeholder="Type your task todo..." />
      <h3 className={style.title}>{title}</h3>
    </div>
  );
};
