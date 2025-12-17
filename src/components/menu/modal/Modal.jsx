import { useEffect } from "react";
import { modalComponents } from "./ModalMap";
import Header from "../../UI/Header";
import classes from "./Modal.module.css";

const Modal = ({ close, header, name }) => {
  const Component = modalComponents[name];

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [close]);

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
