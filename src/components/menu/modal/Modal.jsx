import Withdraw from "../../amount/withdraw/Withdraw";
import Header from "../../UI/header";
import classes from "./Modal.module.css";
const Modal = ({ close, header, name }) => {
  console.log(name);
  return (
    <div className={classes.backdrop} onClick={close}>
      {name === "withdraw" && (
        <Withdraw close={close} header={header}></Withdraw>
      )}
      {name !== "withdraw" && (
        <div className={classes.temp}>
          <Header close={close} text={header} />
          <h1 style={{ color: "#c40d0dff", margin: "auto" }}>
            This modal not created yet
          </h1>
        </div>
      )}
    </div>
  );
};

export default Modal;
