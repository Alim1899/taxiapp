import classes from "./Layout.module.css";
import Navbar from "../navbar/Navbar";
const Layour = () => {
  return (
    <div className={classes.layout}>
      <Navbar balance={123.43} />
    </div>
  );
};

export default Layour;
