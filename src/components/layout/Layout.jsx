import classes from "./Layout.module.css";
import Navbar from "../navbar/Navbar";
import Menu from "../menu/Menu";
const Layour = () => {
  const balance = 123.5;
  return (
    <div className={classes.layout}>
      <Navbar balance={balance} />
      <Menu balance={balance} />
    </div>
  );
};

export default Layour;
