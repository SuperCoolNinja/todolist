export interface IOnDeleteSignature {
  onDelete: (id: number) => void;
}

export interface ICardLeftProps {
  onDelete: IOnDeleteSignature;
}
