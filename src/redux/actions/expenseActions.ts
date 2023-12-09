import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs, setDoc, writeBatch } from "firebase/firestore";
import { firestore } from "../../database/config";
import { Expense } from "../../models/expense";
import IndexDbManager from "../../lib/indexdb-manager";

export const fetchExpensesAction = createAsyncThunk("expenses/fetch", async () => {
  try {
    let expensesIndexDb = (await IndexDbManager.getFromStore()) as any[];
    expensesIndexDb = expensesIndexDb.map((e) => new Expense({ ...e, date: new Date(e.date) }));

    if (!navigator.onLine) {
      return { data: expensesIndexDb };
    }

    const ref = collection(firestore, "users/test-user/expense-list");
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
    console.log(error);
    return { error: error.message };
  }
});

export const addExpenseAction = createAsyncThunk("expenses/add", async (expense: Expense) => {
  try {
    const expenseFire = expense.toFirestoreObject();
    const id = doc(collection(firestore, "users/test-user/expense-list")).id;

    // save in indexdb
    IndexDbManager.addToStore({ id, ...expenseFire });

    if (!navigator.onLine) return;

    // save in firestore
    await setDoc(doc(firestore, "users/test-user/expense-list", id), expenseFire);

    return { data: id };
  } catch (error: any) {
    console.error(error.message);
    return { error: error.message };
  }
});

export const addMultipleExpensesAction = createAsyncThunk("expenses/addmulti", async (expenses: any[]) => {
  try {
    if (!expenses.length) return { data: [] };

    const ref = collection(firestore, "users/test-user/expense-list");
    const querySnapshot = await getDocs(ref);
    let expensesInFirestore: any[] = [];

    querySnapshot?.forEach((doc) => {
      const data = doc.data();
      const expense = { ...data, id: doc.id };
      expensesInFirestore.push(expense);
    });

    let expensesNotInFirestore = expenses.reduce((prev, curr) => {
      const index = expensesInFirestore.findIndex((ei) => ei.id === curr.id);
      if (index === -1) {
        prev.push(curr);
      }

      return prev;
    }, []);

    const batch = writeBatch(firestore);

    expensesNotInFirestore.forEach(({ id, ...e }: any) => {
      const docRef = doc(firestore, "users/test-user/expense-list", id);

      batch.set(docRef, e);
    });
    await batch.commit();

    return { data: expensesNotInFirestore };
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
