import classes from "./Styles.module.css";
const Error = ({ errorText }) => {
  return <span className={classes.error}>{errorText}</span>;
};

export default Error;
