import React, { useEffect, useRef, useState } from "react";
import { getPlainRecurrence } from "../utils/recurrence";
import { Recurrence } from "../types/recurrence";
import { getGroupedExpenses } from "../utils/expenses";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Expense } from "../models/expense";
import { ExpensesList } from "../components/ExpensesList";

import "./ExpensesScreen.scss";

export const ExpensesScreen = (): JSX.Element => {
  const expenses: Expense[] = useSelector((state: RootState) => state.expenses.expenses);
  const [recurrence, setRecurrence] = useState(Recurrence.Weekly);
  const recurrenceSheetRef = useRef<HTMLDivElement>(null);

  const groupedExpenses = getGroupedExpenses(expenses, recurrence);
  const total = groupedExpenses.reduce((sum, group) => (sum += group.total), 0);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        recurrenceSheetRef.current &&
        !recurrenceSheetRef.current.contains(event.target) &&
        event.target.className !== "group-by-label"
      ) {
        recurrenceSheetRef.current.style.display = "none";
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [recurrenceSheetRef]);

  const changeRecurrence = (newRecurrence: Recurrence) => {
    setRecurrence(newRecurrence);
    toggleBottomSheet()
  };

  const toggleBottomSheet = () => {
    const elm = recurrenceSheetRef.current!; 
    if (elm.style.display === "none" || elm.style.display === "") {
      elm.style.display = "flex";
    } else {
      elm.style.display = "none";
    }
  };

  return (
    <div className="page-expenses">
      <div className="container">
        <div className="total-wrapper">
          <span className="total-label">Total for:</span>
          <button className="group-by-filter" onClick={() => {}}>
            <a href="javascript:void(0)" onClick={() => toggleBottomSheet()} className="group-by-label">
              This {getPlainRecurrence(recurrence)}
            </a>
          </button>
        </div>
        <div className="amount-wrapper">
          <span className="currency">$</span>
          <span className="amount">{total}</span>
        </div>
        <ExpensesList groups={groupedExpenses} />
      </div>

      <div className="bottom-sheet" ref={recurrenceSheetRef}>
        {[Recurrence.Daily, Recurrence.Weekly, Recurrence.Monthly, Recurrence.Yearly].map((item) => (
          <button key={item} className="group-by-item" onClick={() => changeRecurrence(item)}>
            <a
              href="javascript:void(0)"
              style={{
                color: recurrence === item ? "var(--primary)" : "var(--text)",
              }}
            >
              This {getPlainRecurrence(item)}
            </a>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExpensesScreen;
