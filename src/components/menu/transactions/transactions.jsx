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
  const { isWithdrawing } = userState;
  const { token } = authState;
  const bottomRef = useRef(null);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useTransactions(token, isWithdrawing);

  const transactions = data?.pages.flatMap((p) => p.data ?? p) ?? [];
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    const el = bottomRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  if (isLoading) return <div>იტვირთება...</div>;

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
        {transactions.map((el) => {
          const date = new Date(el.createdAt);
          const formattedDate = date.toLocaleDateString("ka-GE");
          const formattedTime = date.toLocaleTimeString("ka-GE", {
            hour: "2-digit",
            minute: "2-digit",
          });

          const statusClass =
            el.statusId === 5
              ? classes.success
              : el.statusId === 6
                ? classes.blocked
                : classes.pending;

          const statusIcon =
            el.statusId === 5 ? (
              <GiConfirmed className={classes.succesIcon} />
            ) : el.statusId === 6 ? (
              <MdBlock className={classes.blockIcon} />
            ) : (
              <span className={classes.spinner} />
            );

          const statusText =
            el.statusId === 5
              ? "დადასტურებული"
              : el.statusId === 6
                ? "უარყოფილი"
                : "მუშავდება";

          return (
            <li className={classes.listItem} key={el.id}>
              <div className={`${classes.iconWrap} ${statusClass}`}>
                {statusIcon}
              </div>
              <div className={classes.txInfo}>
                <div className={classes.txDate}>
                  {formattedDate} — {formattedTime}
                </div>
                <div className={classes.txAmount}>
                  {el.amount} <FaLariSign />
                </div>
              </div>
              <span className={`${classes.badge} ${statusClass}`}>
                {statusText}
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
        <div
          style={{
            textAlign: "center",
            padding: "1rem",
            color: "gray",
            fontSize: "13px",
          }}
        >
          სულ {transactions.length} ტრანზაქცია
        </div>
      )}
    </div>
  );
};

export default Transactions;
