import classes from "./Styles.module.css";
const Button = ({ disabled, btnName, type }) => {
  return (
    <button className={classes.submit} disabled={disabled} type={type}>
      {btnName}
    </button>
  );
};

export default Button;
