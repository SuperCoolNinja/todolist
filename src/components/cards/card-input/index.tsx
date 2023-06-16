import { CardInputProps } from "../../../interfaces/cardinput-interface";
import style from "./style.module.scss";

export const CardInput: React.FunctionComponent<CardInputProps> = ({
  onSubmit,
  value,
  setValue,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        className={style.input}
        type="text"
        placeholder="Type your task todo..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};
