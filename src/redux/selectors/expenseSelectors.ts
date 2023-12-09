import { createSelector } from "@reduxjs/toolkit";
import { ExpensesState, adapter } from "../state";
import { RootState } from "../store";

const { selectAll } = adapter.getSelectors();

const featureStateSelector = (state: RootState) => state.expenses;

/**
 * isLoading selector
 */
export const isFetchingSelector = createSelector(featureStateSelector, (state: ExpensesState) => state?.isLoading);


/**
 * all expenses selector
 */
export const allExpensesSelector = createSelector(featureStateSelector, selectAll);
