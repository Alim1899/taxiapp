import useUsers from "../context/useUsers";
import classes from "./Styles.module.css";
const Error = ({ errorText }) => {
  const { state } = useUsers();
  const { error } = state;
  const stateError =
    error === "number"
      ? "მითითებული ნომრით ანგარიში ვერ მოიძებნა"
      : error === "code"
      ? "კოდი არასწორია"
      : error === "code_expired"
      ? "დრო ამოიწურა"
      : "დაფიქსირდა შეცდომა";

  return (
    <h1 className={classes.error}>{errorText ? errorText : stateError}</h1>
  );
};

export default Error;
