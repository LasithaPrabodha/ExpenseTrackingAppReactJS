import React from 'react'; 
import {ExpensesGroup} from '../types/expenses-group';
import {ExpenseRow} from './ExpenseRow'; 
import './ExpensesList.scss'

type Props = {
  groups: ExpensesGroup[];
};

export const ExpensesList = ({groups}: Props) => { 
  return (
    <div className="expenses-list">
      {groups.map(({ day, expenses, total }) => (
        <div key={day} className="item-wrapper">
          <div className="item-day-text">{day}</div> 
          {expenses.map((expense) => (
            <ExpenseRow key={expense.id} expense={expense} />
          ))} 
          <div className="total-wrapper">
            <div className="total-label">Total:</div>
            <div className="total">USD {total}</div>
          </div>
        </div>
      ))}
    </div>
  );
};