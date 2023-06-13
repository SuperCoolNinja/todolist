import { CSSProperties } from "react";

export interface ProgressBarProps {
  value: number;
  max: number;
  style?: ProgressStyle;
}

export interface ProgressStyle extends CSSProperties {
  "--progress-width"?: string;
}