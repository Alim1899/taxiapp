import { useEffect, useRef, useState } from "react";
import Button from "../UI/Button";
import classes from "./Auth.module.css";
import useUsers from "../context/useUsers";
const Timer = ({ reSend }) => {
  const [time, setTime] = useState(10);
  const { dispatch } = useUsers();

  const finishedRef = useRef(false);
  useEffect(() => {
    if (time <= 0) {
      if (!finishedRef.current) {
        finishedRef.current = true;
        dispatch({ type: "CODE_TIMEOUT" });
      }
      return;
    }

    if (time > 0) {
      const timeout = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [time, dispatch]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={classes.timer}>
      <h3 className={classes.time}>{formatTime(time)}</h3>
      <div>
        არ მიგიღიათ კოდი?
        <Button
          type="button"
          size="medium"
          btnName="თავიდან გაგზავნა"
          disabled={time !== 0}
          onClick={() => {
            finishedRef.current = false;
            reSend();
            setTime(5);
          }}
        />
      </div>
    </div>
  );
};

export default Timer;
