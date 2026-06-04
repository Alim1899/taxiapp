import classes from "./Layout.module.css";
import Navbar from "../navbar/Navbar";
import Menu from "../menu/Menu";
import Auth from "../auth/Auth";
import useAuth from "../context/AuthContext/useAuth";
import useUser from "../context/UserContext/useUser";
import { getDriverInfo } from "../../utils/Functions";
import { useEffect } from "react";
const Layout = () => {
  const { state, dispatch } = useAuth();
  const { state: userState, dispatch: userDispatch } = useUser();
  const { userDetails } = userState;
  const { firstName, lastName, balance, rating } = userDetails;

  const { step } = state;

  const isLoggedIn = step === "authorized";

  useEffect(() => {
    
    if (isLoggedIn) getDriverInfo(userDispatch);
  }, [userDispatch, isLoggedIn]);
  return (
    <div className={classes.layout}>
      <Navbar
        isLoggedIn={isLoggedIn}
        dispatch={() => dispatch({ type: "LOG_OUT" })}
      />

      {isLoggedIn ? (
        <Menu
          balance={balance}
          lastName={lastName}
          firstName={firstName}
          rating={rating}
        />
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default Layout;
