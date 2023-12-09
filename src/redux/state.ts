import { Category } from "../models/category";
import { Expense } from "../models/expense";

export interface ExpensesState {
  isLoading: boolean;
  expenses: Expense[];
}

export const initialExpensesState: ExpensesState = {
  isLoading: false,
  expenses: [],
};

export interface CategoriesState {
  categories: Category[];
}

export const initialCategoriesState: CategoriesState = {
  categories: [],
};
