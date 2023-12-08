import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./HomeScreen.scss";

export const HomeScreen = (): JSX.Element => { 
  return (
    <>
      <Outlet />

      <div className="tab-bar">
        <Link to="/" state={{ title: "Expenses" }}>
          <div className="tab-item">
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            Expenses
          </div>
        </Link>
        <Link to="/add" state={{ title: "Add Expense" }}>
          <div className="tab-item">
            <FontAwesomeIcon icon={faPlus} />
            Add
          </div>
        </Link>
        <Link to="/settings" state={{ title: "Settings" }}>
          <div className="tab-item">
            <FontAwesomeIcon icon={faGear} />
            Settings
          </div>
        </Link>
      </div>
    </>
  );
};
