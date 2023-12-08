import React from "react";

import { ListItem } from "../components/ListItem";
import { ThemeContext } from "../Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Switch from "react-switch";
import "./SettingsScreen.scss";
import { useNavigate } from "react-router-dom";

export const SettingsScreen = (): JSX.Element => {
  const navigate = useNavigate();
  const onClickErase = () => {
    // alert(
    //   "Are you sure?",
    //   "This action cannot be undone",
    //   [
    //     {
    //       text: "Cancel",
    //       onPress: () => {},
    //       style: "cancel",
    //     },
    //     {
    //       text: "Erase data",
    //       style: "destructive",
    //       onPress: () => {},
    //     },
    //   ],
    //   {
    //     userInterfaceStyle: "dark",
    //   }
    // );
  };

  const { setTheme, theme } = React.useContext(ThemeContext);

  return (
    <div className="settingsScreen">
      <div className="container">
        <ListItem
          label="Categories"
          detail={<FontAwesomeIcon icon={faChevronRight} />}
          onClick={() => {
            navigate('/categories');
          }}
        />
        <ListItem
          label="Dark Appearance"
          detail={<Switch uncheckedIcon={false} checkedIcon={false} onChange={(isDark) => setTheme(isDark ? "dark-theme" : "light-theme")} checked={theme === "dark-theme"} />}
        />
        <ListItem isDestructive label="Erase all data" onClick={() => onClickErase()} />
      </div>
    </div>
  );
};
