import logo from "../../assets/logo.jpg";
import classes from "./Auth.module.css";
import useUsers from "../context/useUsers";
import { IoIosArrowRoundBack } from "react-icons/io";

const Header = ({ correctNumber }) => {
  const { dispatch, state } = useUsers();
  const { step } = state;

  return (
    <>
      {step === "enter_code" && (
        <IoIosArrowRoundBack
          className={classes.icon}
          onClick={() => dispatch({ type: "BACK" })}
        />
      )}
      <h2>TAXI | APP</h2>
      <img alt="logo" className={classes.logo} src={logo} />
      <h4>
        {correctNumber ? "შეიყვანე მობილურზე მიღებული კოდი" : "ავტორიზაცია"}
      </h4>
    </>
  );
};

export default Header;
