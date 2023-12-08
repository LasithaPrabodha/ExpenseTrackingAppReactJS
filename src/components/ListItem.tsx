import React from "react";
import "./ListItem.scss"

type Props = {
  label: string;
  detail?: React.ReactNode;
  onClick?: () => void;
  swipeToDelete?: boolean;
  onDelete?: (direction: string) => void;
  isDestructive?: boolean;
};

export const ListItem = ({ label, detail, onClick, swipeToDelete, onDelete, isDestructive }: Props) => {
  return (
    <div className={`itemWrapper ${!!detail ? "spaceBetween" : ""}`} onClick={onClick} role="button" tabIndex={0}>
      <span className={`itemText ${isDestructive ? "destructive" : ""}`}>{label}</span>
      {detail}
    </div>
  );
};
