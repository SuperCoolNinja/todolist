import { CSSProperties } from "react";

export interface IProgressBarProps {
  value: number;
  max: number;
  style?: IProgressStyle;
}

export interface IProgressStyle extends CSSProperties {
  "--progress-width"?: string;
}