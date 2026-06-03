import classes from "./Layout.module.css";
import Navbar from "../navbar/Navbar";
import Menu from "../menu/Menu";
import Auth from "../auth/Auth";
import useAuth from "../context/AuthContext/useAuth";
const Layout = () => {
  const { state, dispatch } = useAuth();
  const { step } = state;

  const isLoggedIn = step === "authorized";

  return (
    <div className={classes.layout}>
      <Navbar
        isLoggedIn={isLoggedIn}
        dispatch={() => dispatch({ type: "LOG_OUT" })}
      />

      {isLoggedIn ? <Menu /> : <Auth />}
    </div>
  );
};

export default Layout;
