import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { Expense } from "../../models/expense";
import { addExpenseAction, fetchExpensesAction } from "../actions/expenseActions";
import { ExpensesState, adapter, initialState } from "../state";

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers(builder: ActionReducerMapBuilder<ExpensesState>) {
    builder
      .addCase(fetchExpensesAction.fulfilled, (state, { payload }) => {
        const expenses = (payload as { data: Expense[] }).data as Expense[];
        return adapter.setAll({ ...state, isLoading: false }, expenses);
      })
      .addCase(addExpenseAction.fulfilled, (state, action) => {
        return { ...state, isFetching: false };
      });
  },
});

export default expensesSlice.reducer;
