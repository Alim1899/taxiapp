import classes from "./Layout.module.css";
import Navbar from "../navbar/Navbar";
import Menu from "../menu/Menu";
import Auth from "../auth/Auth";
import useAuth from "../context/AuthContext/useAuth";
import Toast from "../UI/Toast";
import { useDriverInfo } from "../Hooks/useDriverInfo";

const Layout = () => {
  const { state, dispatch } = useAuth();
  const { step, token } = state;
  const isLoggedIn = step === "authorized";
  const { data: userDetails } = useDriverInfo(token);

  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <div className={classes.layout}>
      <Navbar isLoggedIn={isLoggedIn} dispatch={handleLogout} />
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