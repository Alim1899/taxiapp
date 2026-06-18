import classes from "./transactions.module.css";
import { FaLariSign } from "react-icons/fa6";
import useAuth from "../../context/AuthContext/useAuth";
import useUser from "../../context/UserContext/useUser";
import { GiConfirmed } from "react-icons/gi";
import { MdBlock } from "react-icons/md";
import { useEffect, useRef } from "react";
import { useTransactions } from "../../Hooks/useTransactions";

const Transactions = () => {
  const { state: authState } = useAuth();
  const { state: userState } = useUser();
  const { isWithdrawing, pendingTransaction } = userState;
  const { token } = authState;
  const bottomRef = useRef(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useTransactions(token);

  const transactions = data?.pages.flatMap((p) => p.data ?? p) ?? [];

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const el = bottomRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading)
    return <div>იტვირთება...</div>;

  if (!isLoading && transactions.length === 0 && !isWithdrawing)
    return (
      <div className={classes.error}>
        თქვენ ჯერ არ გაქვთ შესრულებული ტრანზაქცია
      </div>
    );

  return (
    <div className={classes.main}>
      <h2 className={classes.header}>ტრანზაქციების ისტორია</h2>
      <ul className={classes.list}>
        {isWithdrawing && pendingTransaction && (
          <li className={`${classes.listItem} ${classes.pending}`}>
            <div className={`${classes.iconWrap} ${classes.pendingIcon}`}>
              <span className={classes.spinner} />
            </div>
            <div className={classes.txInfo}>
              <div className={classes.txDate}>
                {new Date(pendingTransaction.time).toLocaleDateString("ka-GE")} —{" "}
                {new Date(pendingTransaction.time).toLocaleTimeString("ka-GE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className={classes.txAmount}>
                {pendingTransaction.amount} <FaLariSign />
              </div>
            </div>
            <span className={`${classes.badge} ${classes.pendingBadge}`}>
              მუშავდება
            </span>
          </li>
        )}

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

      {hasNextPage && <div ref={bottomRef} style={{ height: "1px" }} />}
      {isFetchingNextPage && (
        <div style={{ textAlign: "center", padding: "1rem" }}>იტვირთება...</div>
      )}
      {!hasNextPage && transactions.length > 0 && (
        <div style={{ textAlign: "center", padding: "1rem", color: "gray", fontSize: "13px" }}>
          სულ {transactions.length} ტრანზაქცია
        </div>
      )}
    </div>
  );
};

export default Transactions;