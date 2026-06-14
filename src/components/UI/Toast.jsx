import useUser from "../context/UserContext/useUser";
import classes from "./Styles.module.css";

const Toast = () => {
  const { state, dispatch } = useUser();
  const { toast } = state;
console.log(toast);
  if (!toast) return null;

  return (
    <div className={`${classes.toast} ${classes[toast.type]}`}>
      <span>{toast.message}</span>
      <button onClick={() => dispatch({ type: "SET_TOAST", payload: null })}>✕</button>
    </div>
  );
};

export default Toast;