import classes from "./Layout.module.css";
import Navbar from "../navbar/Navbar";
import Menu from "../menu/Menu";
import Auth from "../auth/Auth";
import useAuth from "../context/AuthContext/useAuth";
import useUser from "../context/UserContext/useUser";
import { getDriverInfo } from "../../utils/Functions";
import { useEffect } from "react";
import Toast from "../UI/Toast";
const Layout = () => {
  const { state, dispatch } = useAuth();
  const { state: userState, dispatch: userDispatch } = useUser();
  const { userDetails } = userState;
  const { firstName, lastName, balance, rating } = userDetails;
  const { step, token } = state;
  const isLoggedIn = step === "authorized";
  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });
  };
  useEffect(() => {
    if (!isLoggedIn || !token) return;
    getDriverInfo(userDispatch, token);
  }, [isLoggedIn, token, userDispatch]);

  return (
    <div className={classes.layout}>
      <Navbar isLoggedIn={isLoggedIn} dispatch={handleLogout} />
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
      <Toast/>
    </div>
  );
};

export default Layout;