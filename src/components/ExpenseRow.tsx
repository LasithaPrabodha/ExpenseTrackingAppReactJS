import React from 'react';
import {Expense} from '../models/expense';  
import "./ExpenseRow.scss"

type Props = {
  expense: Expense;
};

export const ExpenseRow = ({expense}: Props) => {

  return (
    <div className="expense-row">
      <div className="item-wrapper">
        <span className="item">{expense.note}</span>
        <span className="amount">USD {expense.amount}</span>
      </div>
      <div className="category-wrapper">
        <div
          className="category"
          style={{
            backgroundColor: `${expense.category.color}66`,
          }}
        >
          <span className="category-text" style={{ color: expense.category.color }}>
            {expense.category.name}
          </span>
        </div>
        <span className="date">
          {`${expense.date.getHours()}`.padStart(2, '0')}:
          {`${expense.date.getMinutes()}`.padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};
