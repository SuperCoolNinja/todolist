export interface OnDeleteSignature {
  onDelete: (id: number) => void;
}

export interface CardLeftProps {
  onDelete: OnDeleteSignature;
}
