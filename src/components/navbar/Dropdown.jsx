import classes from "./Navbar.module.css";
import { FaPiggyBank, FaPowerOff } from "react-icons/fa";
import { FaLariSign, FaMoneyBillTransfer } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import useUsers from "../context/useUsers";
const Dropdown = ({ balance, setShowDropDown }) => {
  const { state, dispatch } = useUsers();
  const { userAuthorized } = state;
  const logOut = () => {
    dispatch({ type: "LOG_OUT", payload: false });
  };
  return (
    <div className={classes.dropdown}>
      {userAuthorized ? (
        <ul className={classes.list}>
          <li className={classes.listItem}>
            ბალანსი:
            {balance}
            <span>
              <FaLariSign />
            </span>
          </li>
          <li className={classes.listItem}>
            ბონუსები{" "}
            <span>
              <FaPiggyBank />
            </span>{" "}
          </li>
          <li className={classes.listItem}>
            თანხის გატანა
            <span>
              <FaMoneyBillTransfer />
            </span>
          </li>
          <li className={classes.listItem}>
            პარამეტრები
            <span>
              <FiSettings />
            </span>
          </li>
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
