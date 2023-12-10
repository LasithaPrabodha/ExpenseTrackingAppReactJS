import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs, setDoc, writeBatch } from "firebase/firestore";
import { firestore } from "../../database/config";
import { Expense } from "../../models/expense";
import IndexDbManager from "../../lib/indexdb-manager";

export const fetchExpensesAction = createAsyncThunk("expenses/fetch", async (_, { rejectWithValue }) => {
  try {
    let expensesIndexDb = (await IndexDbManager.getFromStore()) as any[];
    expensesIndexDb = expensesIndexDb.map((e) => new Expense({ ...e, date: new Date(e.date) }));

    if (!navigator.onLine) {
      return { data: expensesIndexDb };
    }
    
    const ref = collection(firestore, "users", "test-user", "expense-list");
    const querySnapshot = await getDocs(ref);
    let expenses: any[] = [];

    querySnapshot?.forEach((doc) => {
      const data = doc.data();
      const expense = { ...data, id: doc.id, date: new Date(data.date) };
      expenses.push(expense);
    });
    const missingInIndexDb = expenses.reduce((prev: any[], curr) => {
      const index = expensesIndexDb.findIndex((ei) => ei.id === curr.id);
      if (index === -1) {
        prev.push(curr);
      }

      return prev;
    }, []);
    missingInIndexDb.length && IndexDbManager.addToStore(missingInIndexDb);


    return { data: expenses };
  } catch (error: any) {
    console.error(error);
    return rejectWithValue(error.message);
  }
});

export const addExpenseAction = createAsyncThunk("expenses/add", async (expense: Expense, { rejectWithValue }) => {
  try {
    const expenseFire = expense.toFirestoreObject();
    const id = doc(collection(firestore, "users", "test-user", "expense-list")).id;
     // save in indexdb
     IndexDbManager.addToStore({ id, ...expenseFire });

     if (!navigator.onLine) return { data: expense };
    // save in firestore
    await setDoc(doc(firestore, "users", "test-user", "expense-list", id), expenseFire);

    return { data: expense };
  } catch (error: any) {
    console.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const deleteExpense = createAsyncThunk("expenses/delete", async (expenseId: string, thunkAPI) => {
  try {
    await deleteDoc(doc(firestore, "users", "test-user", "expense-list", expenseId));

    await thunkAPI.dispatch(fetchExpensesAction());
    return { data: expenseId };
  } catch (error: any) {
    console.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteAllExpenses = createAsyncThunk("expenses/deleteAll", async (_, thunkAPI) => {
  try {
    const ref = collection(firestore, "users", "test-user", "expense-list");
    const querySnapshot = await getDocs(ref);

    querySnapshot?.forEach((doc) => {
      deleteDoc(doc.ref);
    });

    await thunkAPI.dispatch(fetchExpensesAction());
    return { data: null };
  } catch (error: any) {
    console.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const addMultipleExpensesAction = createAsyncThunk("expenses/addmulti", async (expenses: any[], thunkAPI) => {
  
});