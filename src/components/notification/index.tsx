import { ENotifType } from "../../enums/notification-enum";
import { InotificationProp } from "../../interfaces/notification-interface";


import "./style.scss";

export const Notification: React.FunctionComponent<InotificationProp> = ({
  txt,
  type,
}) => {
  return <div className={`notification ${ENotifType[type]}`}>{txt}</div>;
};
