export interface CardWrapperBtnProp {
  onTaskDone: () => void;
  onTimerBegin: () => void;
}

export interface CardBtnProp {
  eventFunc: () => void;
  txt: string;
  color: string;
}
