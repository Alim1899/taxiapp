import { FaStar } from "react-icons/fa";
import classes from "./Balance.module.css";
import { FaLariSign } from "react-icons/fa6";
import Spinner from "../../UI/Spinner";
import Skeleton from "../../UI/Skeleton";
import MenuItem from "../MenuItem";
const Balance = ({ balance, onClick, name, text }) => {
  return (
    <div className={classes.balance} >
      <div className={classes.icon} onClick={onClick} name={name} text={text}>
        <h2>
          ბალანსი: {balance ? Number(balance).toFixed(2) : <Skeleton />}
          <FaLariSign />
        </h2>
      </div>
    </div>
  );
};

export default Balance;
