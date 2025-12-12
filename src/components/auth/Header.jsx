import logo from "../../assets/logo.jpg";
import classes from "./Auth.module.css";

const Header = ({ correctNumber }) => {
  return (
    <>
      <h2>TAXI | APP</h2>
      <img alt="logo" className={classes.logo} src={logo} />
      <h4>
        {correctNumber ? "შეიყვანე მობილურზე მიღებული კოდი" : "ავტორიზაცია"}
      </h4>
    </>
  );
};

export default Header;
