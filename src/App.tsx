import React, { useContext } from "react";

import { Route, Routes } from "react-router-dom";
import { ThemeContext } from "./Theme";
import "./App.css";
import { HomeScreen } from "./pages/HomeScreen";
import ExpensesScreen from "./pages/ExpensesScreen";
import { AddExpenseScreen } from "./pages/AddExpenseScreen";
import { SettingsScreen } from "./pages/SettingsScreen";
import { CategoriesScreen } from "./pages/CategoriesScreen";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`App ${theme}`}>
      <Routes>
        <Route path="/" element={<HomeScreen />}>
          <Route index element={<ExpensesScreen />} />
          <Route path="/add" element={<AddExpenseScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Route>
        <Route path="/categories" element={<CategoriesScreen />}> </Route>
      </Routes>
    </div>
  );
}

export default App;
