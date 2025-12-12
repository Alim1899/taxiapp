import classes from "./Layout.module.css";
import Navbar from "../navbar/Navbar";
import Menu from "../menu/Menu";
import Auth from "../auth/Auth";
import useUsers from "../context/useUsers";
const Layour = () => {
  const { state, dispatch } = useUsers();
  const { userAuthorized } = state;
  const token = sessionStorage.getItem("token");
  if (token && token.length > 0) {
    sessionStorage.getItem("token", token);
    dispatch({
      type: "LOG_IN",
      payload: true,
    });
  }
  const balance = 123.5;
  return (
    <div className={classes.layout}>
      <Navbar balance={balance} authorized={userAuthorized} />
      {userAuthorized ? <Menu balance={balance} /> : <Auth />}
    </div>
  );
};

export default Layour;
