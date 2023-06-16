import { CardWrapperBtnProp } from "../../../interfaces/cardbtn-interface";
import { CardBtn } from "./btn";
import style from "./style.module.scss";

export const CardWrapperBtn: React.FunctionComponent<CardWrapperBtnProp> = ({
  onTaskDone,
  onTimerBegin,
}) => {
  return (
    <div className={style.wrapper_btn}>
      <CardBtn eventFunc={onTaskDone} txt={"I'm done ✅"} color={"white"} />
      <CardBtn
        eventFunc={onTimerBegin}
        txt={"Start 25' timer"}
        color={"orange"}
      />
    </div>
  );
};
