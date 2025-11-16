import classes from "./Styles.module.css";
const Header = ({ text, type, onClick }) => {
  return (
    <div className={classes.header}>
      <h2>{text}</h2>
      <button type={type} onClick={onClick}>
        X
      </button>
    </div>
  );
};

export default Header;
