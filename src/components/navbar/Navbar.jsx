import { useState } from "react";
import classes from "./Navbar.module.css";
import logo from "../../assets/logo.jpg";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaUserCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Dropdown from "./Dropdown";

const Navbar = ({
  balance,
  isLoggedIn,
  dispatch,
  firstName,
  lastName,
  token,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const fullName = firstName
    ? `${firstName || ""} ${lastName[0] || ""}.`
    : null;

  return (
    <div className={classes.navbar}>
      <img alt="logo" src={logo} className={classes.logo} />
      <div className={classes.icons}>
        <FaPhoneSquareAlt className={classes.icon} />
        <div
          className={classes.user}
          onClick={() => setShowDropDown(!showDropDown)}
        >
          <FaUserCircle className={classes.icon} />
          <h3>{fullName}</h3>
          {showDropDown ? (
            <FaChevronUp className={classes.icon} />
          ) : (
            <FaChevronDown className={classes.icon} />
          )}
        </div>
        {showDropDown && (
          <Dropdown
            balance={balance}
            setShowDropDown={setShowDropDown}
            isLoggedIn={isLoggedIn}
            dispatch={dispatch}
            token={token}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
