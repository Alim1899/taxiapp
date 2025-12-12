import useUsers from "../context/useUsers";
import classes from "./Styles.module.css";
const Error = ({ errorText }) => {
  const { state } = useUsers();
  const { userNotFound } = state;
  const stateError = userNotFound
    ? "მითითებული ნომრით ანგარიში ვერ მოიძებნა"
    : "დაფიქსირდა შეცდომა";

  return (
    <h1 className={classes.error}>{errorText ? errorText : stateError}</h1>
  );
};

export default Error;
