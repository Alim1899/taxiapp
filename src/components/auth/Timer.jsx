import { useEffect, useRef, useState } from "react";
import Button from "../UI/Button";
import classes from "./Auth.module.css";
const Timer = ({ onFinish }) => {
  const [time, setTime] = useState(5); // seconds

  const finishedRef = useRef(false);

  useEffect(() => {
    if (time <= 0) {
      if (!finishedRef.current) {
        finishedRef.current = true;
      }
      return; // ⛔ stop timer here
    }

    if (time > 0) {
      const timeout = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [time, onFinish]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={classes.timer}>
      <div>
        არ მიგიღიათ კოდი?
        <Button
          type="button"
          size="medium"
          btnName="თავიდან გაგზავნა"
          disabled={time !== 0}
          onClick={(e) => {
            console.log(e);
            console.log(time, finishedRef.current);
            finishedRef.current = false;
            onFinish();
            setTime(5);
          }}
        />
      </div>
      <h3 className={classes.time}>{formatTime(time)}</h3>
    </div>
  );
};

export default Timer;
