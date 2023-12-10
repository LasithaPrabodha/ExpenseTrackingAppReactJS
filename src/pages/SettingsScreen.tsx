import React, { useContext } from "react";

import { ListItem } from "../components/ListItem";
import { ThemeContext } from "../Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Switch from "react-switch";
import "./SettingsScreen.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { deleteAllExpenses } from "../redux/actions/expenseActions";
import { deleteAllCategory } from "../redux/actions/categoryActions";

export const SettingsScreen = (): JSX.Element => {
  const dipatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onClickErase = () => {
    if (window.confirm("Are you sure? This action cannot be undone")) {
      dipatch(deleteAllExpenses());
      dipatch(deleteAllCategory());
    } else {
    }
  };

  const { setTheme, theme } = useContext(ThemeContext);

  return (
    <div className="page settings-screen">
      <div className="container">
        <ListItem
          label="Categories"
          detail={<FontAwesomeIcon icon={faChevronRight} color={theme === "dark-theme" ? "#fff" : "#1c1c1e"} />}
          onClick={() => {
            navigate("/categories", { state: { title: "Categories", separateScreen: true } });
          }}
        />
        <ListItem
          label="Dark Appearance"
          detail={
            <Switch
              uncheckedIcon={false}
              checkedIcon={false}
              onChange={(isDark) => setTheme(isDark ? "dark-theme" : "light-theme")}
              checked={theme === "dark-theme"}
            />
          }
        />
        <ListItem isDestructive label="Erase all data" onClick={() => onClickErase()} />
      </div>
    </div>
  );
};
