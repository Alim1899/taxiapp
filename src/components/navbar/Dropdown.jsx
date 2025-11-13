import classes from "./Navbar.module.css";
import { FaPiggyBank, FaPowerOff } from "react-icons/fa";
import { FaLariSign, FaMoneyBillTransfer } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
const Dropdown = ({ balance }) => {
  return (
    <div className={classes.dropdown}>
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
        <li className={classes.listItem}>
          გასვლა
          <span>
            <FaPowerOff />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
