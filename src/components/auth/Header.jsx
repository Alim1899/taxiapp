import logo from "../../assets/logo.jpg";
import classes from "./Auth.module.css";
import useUsers from "../context/useUsers";
import { IoIosArrowRoundBack } from "react-icons/io";

const Header = () => {
  const { dispatch, state } = useUsers();
  const { step } = state;
  const showBtn = step === "enter_code" || step === "checking_number";
  return (
    <div className={classes.header}>
      <div className={classes.back}>
        <div>
          {showBtn && (
            <IoIosArrowRoundBack
              className={classes.icon}
              onClick={() => dispatch({ type: "BACK" })}
            />
          )}
        </div>
        <div>
          {" "}
          <h2>TAXI | APP</h2>
        </div>
        <div></div>
      </div>

      <img alt="logo" className={classes.logo} src={logo} />
      <h4>
        {step === "enter_number" && "შეიყვანე მობილურის ნომერი"}
        {step === "enter_code" && "შეიყვანე მობილურზე მიღებული კოდი"}
      </h4>
    </div>
  );
};

export default Header;
