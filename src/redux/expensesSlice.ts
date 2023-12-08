import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Expense} from '../models/expense';
import {Recurrence} from '../types/recurrence';
import {Category} from '../models/category';

interface ExpensesState {
  expenses: Expense[];
}
const date = new Date();
const now = new Date(
  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
);

const initialState: ExpensesState = {
  expenses: [ new Expense({
    id: '1',
    amount: 10,
    recurrence: Recurrence.Daily,
    date: now,
    note: 'Dollarama',
    category: new Category({id: '1', color: '#ff0000', name: 'Anan Manan'}),
  }),
  new Expense({
    id: '2',
    amount: 20,
    recurrence: Recurrence.Daily,
    date: now,
    note: 'Tim Hortons',
    category: new Category({id: '2', color: '#00ff00', name: 'Coffee'}),
  }),],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpense: (state, action) => {
      state.expenses = action.payload
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(
        expense => expense.id !== action.payload,
      );
    },
    updateExpense: (
      state,
      action: PayloadAction<{id: string; updatedExpense: Partial<Expense>}>,
    ) => {
      const {id, updatedExpense} = action.payload;
      const index = state.expenses.findIndex(expense => expense.id === id);
      if (index !== -1) {
        state.expenses[index] = {...state.expenses[index], ...updatedExpense};
      }
    },
  },
});

export const {setExpense, addExpense, removeExpense, updateExpense} = expensesSlice.actions;
export default expensesSlice.reducer;
