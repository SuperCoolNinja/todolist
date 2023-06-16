import { NotifType } from "../../enums/notification-enum";
import { notificationProp } from "../../interfaces/notification-interface";
import "./style.scss";

export const Notification: React.FunctionComponent<notificationProp> = ({
  txt,
  type,
}) => {
  return <div className={`notification ${NotifType[type]}`}>{txt}</div>;
};
