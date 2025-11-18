import { modalComponents } from "./modalMap";
import Header from "../../UI/Header";
import classes from "./Modal.module.css";

const Modal = ({ close, header, name }) => {
  const Component = modalComponents[name];

  return (
    <div className={classes.backdrop} onClick={close}>
      {Component ? (
        <Component close={close} header={header} />
      ) : (
        <div className={classes.temp}>
          <Header close={close} text={header} />
          <h1 style={{ color: "#c40d0dff", margin: "auto" }}>
            This modal is not created yet
          </h1>
        </div>
      )}
    </div>
  );
};

export default Modal;
