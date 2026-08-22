import classes from "./Navbar.module.css";
import { FaPowerOff } from "react-icons/fa";
import { logoutFromServer } from "../../utils/Functions";
const Dropdown = ({ setShowDropDown, isLoggedIn, dispatch, token }) => {
  const logOut = () => {
    dispatch();
    logoutFromServer(token);
  };
  return (
    <div className={classes.dropdown}>
      {isLoggedIn ? (
        <ul className={classes.list}>
          <li
            className={classes.listItem}
            onClick={() => {
              logOut();
              setShowDropDown(false);
            }}
          >
            გასვლა
            <span>
              <FaPowerOff />
            </span>
          </li>
        </ul>
      ) : (
        <h1 className={classes.please}>გთხოვთ გაიაროთ ავტორიაცია</h1>
      )}
    </div>
  );
};

export default Dropdown;
