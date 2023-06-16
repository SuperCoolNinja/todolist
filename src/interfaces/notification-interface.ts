import { ENotifType } from "../enums/notification-enum";

export interface notificationProp {
  txt: string;
  type: ENotifType;
}

export interface notifType {
  txt?: string;
  type?: ENotifType;
  bShow: boolean;
}
