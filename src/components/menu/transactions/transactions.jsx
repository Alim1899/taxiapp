import { getTransactions } from "../../../utils/Functions";
import classes from "./transactions.module.css";
import { FaLariSign } from "react-icons/fa6";
import useAuth from "../../context/AuthContext/useAuth";
import useUser from "../../context/UserContext/useUser";
import { GiConfirmed } from "react-icons/gi";
import { MdBlock } from "react-icons/md";
import { useEffect } from "react";

const Transactions = () => {
  const { state: authState } = useAuth();
  const { state: userState, dispatch } = useUser();
  const { transactions, transactionLoading } = userState;
  const { token } = authState;
  useEffect(() => {
    if (!token) return;
    getTransactions(4, 0, token, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  if (transactionLoading) return <div>იტვირთება...</div>;

  if (transactions.length === 0)
    return (
      <div className={classes.error}>
        თქვენ ჯერ არ გაქვთ შესრულებული ტრანზაქცია
      </div>
    );
  return (
    <div className={classes.main}>
      <h2 className={classes.header}>ტრანზაქციების ისტორია</h2>
      <ul className={classes.list}>
      {transactions.data.map(el=>{
      const date = new Date(el.createdAt);
      const formattedDate = date.toLocaleDateString("ka-GE"); // 09.06.2026
const formattedTime = date.toLocaleTimeString("ka-GE", {
  hour: "2-digit",
  minute: "2-digit",
});
        return <li className={classes.listItem} key={el.id}>
  <div className={`${classes.iconWrap} ${el.statusId === 999 ? classes.success : classes.blocked}`}>
    {el.statusId === 999
      ? <GiConfirmed className={classes.succesIcon} />
      : <MdBlock className={classes.blockIcon} />}
  </div>
  <div className={classes.txInfo}>
    <div className={classes.txDate}>{formattedDate} — {formattedTime}</div>
    <div className={classes.txAmount}>{el.amount} <FaLariSign /></div>
  </div>
  <span className={`${classes.badge} ${el.statusId === 999 ? classes.success : classes.blocked}`}>
    {el.statusId === 999 ? "დადასტურებული" : "უარყოფილი"}
  </span>
</li>
      })}
        
      </ul>
    </div>
  );
};

export default Transactions;
