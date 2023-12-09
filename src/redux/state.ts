import { EntityState, createEntityAdapter } from "@reduxjs/toolkit";
import { Expense } from "../models/expense";

export interface ExpensesState extends EntityState<Expense> {
  isLoading: boolean
}

export const adapter = createEntityAdapter<Expense>();

export const initialState: ExpensesState = adapter.getInitialState({
  isLoading: false,
});
