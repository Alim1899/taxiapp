import { FaLariSign } from "react-icons/fa6";
import Skeleton from "../../UI/Skeleton";
import classes from "./Balance.module.css";
import { queryClient } from "../../../queryClient";
import useUser from "../../context/UserContext/useUser";

const Balance = ({
  balance,
  onClick,
  name,
  firstName,
  lastName,
  isOnCooldown,
  remainingTime,
  onRefresh,
}) => {
  const { state } = useUser();
  const { isWithdrawing } = state;
  const handleRefresh = (e) => {
    e.stopPropagation();
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
    onRefresh?.();
  };
  const renderContent = () => {
    if (isWithdrawing)
      return (
        <>
          <p className={classes.label}>თქვენ გაქვთ აქტიური ტრანზაქცია</p>
          <p className={classes.sub}>გთხოვთ დაელოდოთ დასრულებას</p>
        </>
      );

    if (isOnCooldown)
      return (
        <>
          <p className={classes.label}>
            გატანა შესაძლებელია {remainingTime} წუთში
            <button className={classes.refreshBtn} onClick={handleRefresh}>
              განახლება
            </button>
          </p>

         <h2 className={classes.label}>
          ბალანსი:{" "}
          {balance ? <span>{Number(balance).toFixed(2)} </span> : <Skeleton />}
          <FaLariSign />
        </h2>
        </>
      );

    return (
      <>
        <h2 className={classes.label}>
          მომხმარებელი: {firstName ? <span>{firstName}</span> : <Skeleton />}{" "}
          {lastName ? <span>{lastName}</span> : <Skeleton />}.
        </h2>
        <h2 className={classes.label}>
          ბალანსი:{" "}
          {balance ? <span>{Number(balance).toFixed(2)} </span> : <Skeleton />}
          <FaLariSign />
        </h2>
      </>
    );
  };

  return (
    <div
      className={classes.balance}
      style={{
        cursor: isOnCooldown || isWithdrawing ? "not-allowed" : "pointer",
      }}
      onClick={!isWithdrawing && !isOnCooldown ? onClick : undefined}
      name={name}
    >
      {renderContent()}
    </div>
  );
};

export default Balance;
