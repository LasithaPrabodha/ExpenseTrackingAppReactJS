import React, { memo, useContext, useMemo } from "react";

import { Link, Route, Routes, useLocation } from "react-router-dom";
import { ThemeContext } from "./Theme";
import "./App.scss";
import { HomeScreen } from "./pages/HomeScreen";
import ExpensesScreen from "./pages/ExpensesScreen";
import { AddExpenseScreen } from "./pages/AddExpenseScreen";
import { SettingsScreen } from "./pages/SettingsScreen";
import { CategoriesScreen } from "./pages/CategoriesScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function TitleWrapper() {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  let title = "";
  let isSeparate = false;

  switch (location.pathname) {
    case "/":
      title = "Expenses";
      break;
    case "/settings":
      title = "Settings";
      break;
    case "/add":
      title = "Add Expense";
      break;
    case "/categories":
      isSeparate = true;
      title = "Categories";
      break;
  }

  return <Title theme={theme} isSeparate={isSeparate} title={title} />;
}

const Title = memo(({ title, isSeparate, theme }: { title: string; isSeparate: boolean; theme: string }) => {
  return (
    <div className="header">
      {isSeparate ? (
        <div className="btn-back">
          <Link to="/settings">
            <FontAwesomeIcon icon={faChevronLeft} color={theme === "dark-theme" ? "#fff" : "#1c1c1e"} />
          </Link>
        </div>
      ) : (
        <></>
      )}
      <div className="title">{title}</div>
    </div>
  );
});

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <TitleWrapper />
      <Routes>
        <Route path="/" element={<HomeScreen />}>
          <Route index element={<ExpensesScreen />} />
          <Route path="/add" element={<AddExpenseScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Route>
        <Route path="/categories" element={<CategoriesScreen />} />
      </Routes>
    </div>
  );
}

export default App;
