export interface ICardWrapperBtnProp {
  onTaskDone: () => void;
  onTimerBegin: () => void;
}

export interface ICardBtnProp {
  eventFunc: () => void;
  txt: string;
  color: string;
}
