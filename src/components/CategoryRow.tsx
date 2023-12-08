import React from "react"; 

import "./CategoryRow.scss"

export const CategoryRow = ({ color, name }: { color: string; name: string }) => {
  return (
    <div className="category">
      <div className="color" style={{ backgroundColor: color }} />
      <span className="name">{name}</span>
    </div>
  );
};
