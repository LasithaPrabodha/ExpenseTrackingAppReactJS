import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

import { ListItem } from "../components/ListItem";
import { Recurrence } from "../types/recurrence";
import { Category } from "../models/category";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addExpense } from "../redux/expensesSlice";
import { Expense } from "../models/expense";
import "./AddExpenseScreen.scss";

export const AddExpenseScreen = (): JSX.Element => {
  const categories: Category[] = useSelector((state: RootState) => state.categories.categories);
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  const [sheetView, setSheetView] = useState<"recurrence" | "category">("recurrence");
  const [amount, setAmount] = useState("");
  const [recurrence, setRecurrence] = useState(Recurrence.None);
  const [date, setDate] = useState<Date>(new Date());
  const [note, setNote] = useState("");
  const [category, setCategory] = useState<Category>(categories[0]);

  const selectRecurrence = (selectedRecurrence: string) => {
    setRecurrence(selectedRecurrence as Recurrence);
    toggleBottomSheet();
  };
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        bottomSheetRef.current &&
        !bottomSheetRef.current.contains(event.target) &&
        event.target.className !== "recurrenceBtn"
      ) {
        bottomSheetRef.current.style.display = "none";
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [bottomSheetRef]);
  const selectCategory = (selectedCategory: Category) => {
    setCategory(selectedCategory);
    toggleBottomSheet();
  };
  const toggleBottomSheet = () => {
    const elm = bottomSheetRef.current!;
    if (elm.style.display === "none" || elm.style.display === "") {
      elm.style.display = "flex";
    } else {
      elm.style.display = "none";
    }
  };
  const clearForm = () => {
    setAmount("");
    setRecurrence(Recurrence.None);
    setDate(new Date());
    setNote("");
    setCategory(categories[0]);
  };

  const submitExpense = () => {
    // add

    if (!amount || !note) {
      alert("Please fill both amount and note")
      return;
    }

    const expense = new Expense({
      id: uuid(),
      amount: parseFloat(amount),
      recurrence,
      date,
      note,
      category,
    });

    dispatch(addExpense(expense));
    clearForm();
  };

  return (
    <div className="page add-expense-screen">
      <div className="new-expense-form">
        <ListItem
          label="Amount"
          detail={
            <input
              placeholder="Amount"
              onChange={(event) => setAmount(event.target.value)}
              value={amount}
              type="number"
              className="text-input"
            />
          }
        />
        <ListItem
          label="Recurrence"
          detail={
            <button
              className="recurrenceBtn"
              onClick={() => {
                setSheetView("recurrence");
                toggleBottomSheet();
              }}
            >
              <span className="recurrence">{recurrence}</span>
            </button>
          }
        />
        <ListItem
          label="Date"
          detail={
            <input
              className="date-picker"
              type="date"
              id="start"
              name="trip-start"
              value={new Date(date).toISOString().split("T")[0]}
              onChange={()=>{}}
              min={
                new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate())
                  .toISOString()
                  .split("T")[0]
              }
              max={new Date().toISOString().split("T")[0]}
            />
          }
        />
        <ListItem
          label="Note"
          detail={
            <input
              placeholder="Note"
              onChange={(event) => setNote(event.target.value)}
              value={note}
              className="text-input"
            />
          }
        />
        <ListItem
          label="Category"
          detail={
            <button
              className="recurrenceBtn"
              onClick={() => {
                setSheetView("category");
                toggleBottomSheet();
              }}
            >
              <span style={{ color: category?.color }}>{category?.name}</span>
            </button>
          }
        />
      </div>
      <button className="submit-btn" onClick={submitExpense}>
        <span className="submit-btn-text">Submit expense</span>
      </button>

      <div className="bottom-sheet" ref={bottomSheetRef}>
        {sheetView === "recurrence" &&
          Object.values(Recurrence).map((rec) => (
            <button key={rec} className="btn-bottom-sheet" onClick={() => selectRecurrence(rec)}>
              {rec}
            </button>
          ))}
        {sheetView === "category" &&
          categories.map((cat) => (
            <button key={cat.id} className="btn-bottom-sheet" onClick={() => selectCategory(cat)}>
              <div className="category-color" style={{ backgroundColor: cat.color }}></div>
              <span className="category">{cat.name}</span>
            </button>
          ))}
      </div>
    </div>
  );
};
