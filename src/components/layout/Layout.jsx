import classes from "./Layout.module.css";
import Navbar from "../navbar/Navbar";
import Menu from "../menu/Menu";
import Auth from "../auth/Auth";
import useAuth from "../context/AuthContext/useAuth";
import Toast from "../UI/Toast";
import { useDriverInfo } from "../Hooks/useDriverInfo";
import { refreshLogin } from "../../utils/Functions";

import { useEffect, useState } from "react";

const Layout = () => {
  const { state, dispatch } = useAuth();
  const { step, token } = state;
  const isLoggedIn = step === "authorized";
  const { data: userDetails } = useDriverInfo(token);
  const [isRefreshing, setIsRefreshing] = useState(true);

  useEffect(() => {
    refreshLogin()
      .then((data) => {
        if (data?.access_token) {
          dispatch({ type: "CODE_SUCCESS", payload: data }); // 👈 auto login
        }
      })
      .finally(() => setIsRefreshing(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 👈 only on mount

  const handleLogout = () => dispatch({ type: "LOG_OUT" });

  if (isRefreshing) return <div>იტვირთება...</div>;

  return (
    <div className={classes.layout}>
      <Navbar
        isLoggedIn={isLoggedIn}
        dispatch={handleLogout}
        firstName={userDetails?.firstName}
        lastName={userDetails?.lastName}
      />
      {isLoggedIn ? (
        <Menu
          balance={userDetails?.balance}
          lastName={userDetails?.lastName}
          firstName={userDetails?.firstName}
          rating={userDetails?.rating}
        />
      ) : (
        <Auth />
      )}
      <Toast />
    </div>
  );
};

export default Layout;
