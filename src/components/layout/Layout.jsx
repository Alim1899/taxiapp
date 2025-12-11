import classes from "./Layout.module.css";
import Navbar from "../navbar/Navbar";
import Menu from "../menu/Menu";
import Auth from "../auth/Auth";
import { useState } from "react";
const Layour = () => {
  const [userAuthorized, setUserAuthorized] = useState(false);
  const balance = 123.5;
  return (
    <div className={classes.layout}>
      <Navbar balance={balance} authorized={userAuthorized} />
      {userAuthorized ? <Menu balance={balance} /> : <Auth />}
    </div>
  );
};

export default Layour;
