import classes from "./Navbar.module.css";
import { FaPiggyBank, FaPowerOff } from "react-icons/fa";
import { FaLariSign, FaMoneyBillTransfer } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import useUser from "../context/UserContext/useUser";
const Dropdown = ({ setShowDropDown, isLoggedIn, dispatch }) => {
  const logOut = () => {
    sessionStorage.removeItem("token");
    dispatch();
  };
  const {state} = useUser();
  const {userDetails} = state;
  const {balance} = userDetails;
  return (
    <div className={classes.dropdown}>
      {isLoggedIn ? (
        <ul className={classes.list}>
          <li className={classes.listItem}>
            ბალანსი:{Number(balance).toFixed(2)}
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
