import classes from "./Styles.module.css";
const Error = ({ errorText }) => {
  return <h1 className={classes.error}>{errorText}</h1>;
};

export default Error;
