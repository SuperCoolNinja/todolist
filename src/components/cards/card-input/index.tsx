import { ICardInputProps } from "../../../interfaces/cardinput-interface";
import style from "./style.module.scss";

export const CardInput: React.FunctionComponent<ICardInputProps> = ({
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
