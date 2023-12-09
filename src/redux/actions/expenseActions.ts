import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { firestore } from "../../database/config";
import { Expense } from "../../models/expense";

export const fetchExpensesAction = createAsyncThunk("expenses/fetch", async () => {
  try {
    if (!navigator.onLine) {
      const registration = await navigator.serviceWorker.ready;
      
      return;
    }

    const ref = collection(firestore, "users", "test-user", "expense-list");
    const querySnapshot = await getDocs(ref);
    let expenses: Expense[] = [];
    querySnapshot?.forEach((doc) => {
      const data = doc.data() as Expense;
      const expense = { ...doc.data(), id: doc.id, date: new Date(data.date) } as Expense;
      expenses.push(expense);
    });
    return { data: expenses };
  } catch (error: any) {
    console.log(error);
    return isRejectedWithValue(error.message);
  }
});

export const addExpenseAction = createAsyncThunk("expenses/add", async (expense: Expense) => {
  try {
    if (!navigator.onLine) {
      const registration = await navigator.serviceWorker.ready;
      registration.active?.postMessage({ action: "ADD_NEW_EXPENSE", data: expense.toFirestoreObject() });
      return;
    }

    const expenseFire = expense.toFirestoreObject();
    const ref = await addDoc(collection(firestore, "users", "test-user", "expense-list"), expenseFire);
    return { data: ref.id };
  } catch (error: any) {
    console.error(error.message);
    return { error: error.message };
  }
});

export const deleteExpense = createAsyncThunk("expenses/fetch", async (expenseId: string) => {
  try {
    await deleteDoc(doc(firestore, "test-user/expense-list", expenseId));
    return { data: null };
  } catch (error: any) {
    console.error(error.message);
    return { error: error.message };
  }
});
