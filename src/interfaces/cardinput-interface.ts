export interface CardInputProps {
  onSubmit: (id: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
