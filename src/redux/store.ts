import {configureStore} from '@reduxjs/toolkit';
import expensesReducer from './expensesSlice';
import categoriesReducer from './categoriesSlice';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    categories: categoriesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.date', 'payload.category', 'payload'],
        // Ignore these paths in the state
        ignoredPaths: ['expenses.expenses', 'categories.categories'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
