import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Expense} from '../models/expense';
import {Category} from '../models/category';

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [
    new Category({id: '1', color: '#ff0000', name: 'Anan Manan'}),
    new Category({id: '2', color: '#00ff00', name: 'Coffee'}),
  ],
};

const expensesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        category => category.id !== action.payload,
      );
    },
    updateCategory: (
      state,
      action: PayloadAction<{id: string; updatedExpense: Partial<Expense>}>,
    ) => {
      const {id, updatedExpense} = action.payload;
      const index = state.categories.findIndex(category => category.id === id);
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...updatedExpense,
        };
      }
    },
  },
});

export const {addCategory, removeCategory, updateCategory} =
  expensesSlice.actions;
export default expensesSlice.reducer;
