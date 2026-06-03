import { FaStar } from "react-icons/fa";
import useUser from "../../context/UserContext/useUser";
import classes from "./Balance.module.css";
import { getDriverInfo } from "../../../utils/Functions";
import { useEffect } from "react";
import { FaLariSign } from "react-icons/fa6";

const Balance = () => {
  const { state, dispatch } = useUser();
  const { userDetails } = state;

  useEffect(() => {
    getDriverInfo(dispatch);
  }, [dispatch]);

  const { firstName, lastName, balance, rating } = userDetails;
  return (
    <div className={classes.balance}>
      <p className={classes.driver}>
        <p>
          {firstName} {lastName}
        </p>{" "}
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
      </p>

      <h1>
        ჩემი ბალანსი:<br></br>
        {Number(balance).toFixed(2)}
        <FaLariSign/>
      </h1>
    </div>
  );
};

export default Balance;
