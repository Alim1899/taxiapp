import { getTransactions } from "../../../utils/Functions";
import classes from "./transactions.module.css";
import { FaLariSign } from "react-icons/fa6";
import useAuth from "../../context/AuthContext/useAuth";
import useUser from "../../context/UserContext/useUser";
import { GiConfirmed } from "react-icons/gi";
import { MdBlock } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

const TAKE = 1; // change to 5 in production
const MAX = 5;

const Transactions = () => {
  const { state: authState } = useAuth();
  const { state: userState, dispatch } = useUser();
  const { transactions, transactionLoading } = userState;
  const { token } = authState;
  const bottomRef = useRef(null);
  const [skip, setSkip] = useState(TAKE);
  const [hasMore, setHasMore] = useState(true);
  const initialized = useRef(false);


useEffect(() => {
  if (!token) return;
  dispatch({ type: "RESET_TRANSACTIONS" }); // 👈 clear before fetch
  initialized.current = false;
  getTransactions(TAKE, 0, token, dispatch).then(() => {
    initialized.current = true; // 👈 mark done
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [token]);

useEffect(() => {
  if (!hasMore || transactionLoading) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && initialized.current) { // 👈 guard
        if (skip >= MAX) {
          setHasMore(false);
          return;
        }
        getTransactions(TAKE, skip, token, dispatch);
        setSkip((prev) => prev + TAKE);
      }
    },
    { threshold: 1.0 }
  );

  const el = bottomRef.current;
  if (el) observer.observe(el);
  return () => { if (el) observer.unobserve(el); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [skip, hasMore, transactionLoading, token]);

  if (transactionLoading && transactions.length === 0)
    return <div>იტვირთება...</div>;

  if (!transactionLoading && transactions.length === 0)
    return <div className={classes.error}>თქვენ ჯერ არ გაქვთ შესრულებული ტრანზაქცია</div>;


  return (
    <div className={classes.main}>
      <h2 className={classes.header}>ტრანზაქციების ისტორია</h2>
      <ul className={classes.list}>
        {transactions.map((el) => {
          const date = new Date(el.createdAt);
          const formattedDate = date.toLocaleDateString("ka-GE");
          const formattedTime = date.toLocaleTimeString("ka-GE", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <li className={classes.listItem} key={el.id}>
              <div className={`${classes.iconWrap} ${el.statusId === 1000 ? classes.success : classes.blocked}`}>
                {el.statusId === 1000
                  ? <GiConfirmed className={classes.succesIcon} />
                  : <MdBlock className={classes.blockIcon} />}
              </div>
              <div className={classes.txInfo}>
                <div className={classes.txDate}>{formattedDate} — {formattedTime}</div>
                <div className={classes.txAmount}>{el.amount} <FaLariSign /></div>
              </div>
              <span className={`${classes.badge} ${el.statusId === 1000 ? classes.success : classes.blocked}`}>
                {el.statusId === 1000 ? "დადასტურებული" : "უარყოფილი"}
              </span>
            </li>
          );
        })}
      </ul>

      {/* sentinel element */}
      {hasMore && <div ref={bottomRef} style={{ height: "1px" }} />}
      {transactionLoading && <div style={{ textAlign: "center", padding: "1rem" }}>იტვირთება...</div>}
      {!hasMore && <div style={{ textAlign: "center", padding: "1rem", color: "gray", fontSize: "13px" }}>სულ {transactions.length} ტრანზაქცია</div>}
    </div>
  );
};

export default Transactions;