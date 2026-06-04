import { FaStar } from "react-icons/fa";
import classes from "./Balance.module.css";
import { FaLariSign } from "react-icons/fa6";
import Spinner from "../../UI/Spinner";
import Skeleton from "../../UI/Skeleton";
const Balance = ({ firstName, lastName, balance, rating }) => {
  return (
    <div className={classes.balance}>
      <div className={classes.driver}>
        {firstName ? (
          <h6>
            {firstName} {lastName}
          </h6>
        ) : (
          <Skeleton />
        )}
        {rating > 0 ? (
          <div>
            <FaStar className={classes.star} />
          </div>
        ) : (
          <div className={classes.rating}>
            <FaStar className={classes.whiteStar} />
            <span className={classes.span}>Not rated yet</span>
          </div>
        )}
      </div>

      <h1>
        ჩემი ბალანსი:<br></br>
        {balance ? Number(balance).toFixed(2) : <Skeleton />}
        <FaLariSign />
      </h1>
    </div>
  );
};

export default Balance;
