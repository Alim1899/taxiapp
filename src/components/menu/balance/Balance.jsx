import { FaLariSign } from "react-icons/fa6";
import Skeleton from "../../UI/Skeleton";
import classes from "./Balance.module.css";
import { queryClient } from "../../../queryClient";

const Balance = ({
  balance,
  onClick,
  name,
  text,
  isOnCooldown,
  remainingTime,
  onRefresh
}) => {
  const handleRefresh = () => {
    console.log("clicked");
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
    onRefresh?.()
  };

  return (
    <div className={classes.balance}>
      <div className={classes.icon} onClick={onClick} name={name} text={text}>
        {isOnCooldown ? (
          <h2 className={classes.cooldown}>
            გატანა შესაძლებელია {remainingTime} წუთში{" "}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRefresh();
              }}
            >
              განახლება
            </button>
          </h2>
        ) : (
          <h2>
            ბალანსი: {balance ? Number(balance).toFixed(2) : <Skeleton />}
            <FaLariSign />
          </h2>
        )}
      </div>
    </div>
  );
};

export default Balance;
