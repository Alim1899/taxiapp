import classes from "./Styles.module.css";
const Button = ({ disabled, btnName, type, size, onClick }) => {
  return (
    <div className={classes.wrapper}>
      <button
        className={`${classes.submit} ${classes[size]}`}
        disabled={disabled}
        type={type}
        onClick={onClick}
      >
        {btnName}
      </button>
    </div>
  );
};

export default Button;
