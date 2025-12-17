import Error from "../../UI/Error";
import classes from "../Amount.module.css";

const FieldError = ({ error, touched }) => {
  if (!touched || !error) return null;

  return (
    <div className={classes.errorWrapp}>
      <Error errorText={error} />
    </div>
  );
};

export default FieldError;
