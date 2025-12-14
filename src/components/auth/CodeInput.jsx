import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRef } from "react";
import useUsers from "../context/useUsers";
import Button from "../UI/Button";
import { checkLogin, checkNumber } from "../../utils/Functions";
import Spinner from "../UI/Spinner";
import Error from "../UI/Error";
import classes from "./Auth.module.css";
import Timer from "./Timer";
const CodeInput = () => {
  const { state, dispatch } = useUsers();
  const { arrivedCode, userNumber, step, error } = state;

  const digits = String(arrivedCode).slice(0, 4).split("");
  const initialValues = {
    0: digits[0] || "",
    1: digits[1] || "",
    2: digits[2] || "",
    3: digits[3] || "",
  };

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  return step === "checking_code" ? (
    <Spinner />
  ) : (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values, { resetForm }) => {
        checkLogin(
          userNumber,
          Number(Object.values(values).join("")),
          dispatch
        );
        resetForm({ values: { 0: "", 1: "", 2: "", 3: "" } });
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div className={classes.codeWrapper}>
            <div className={classes.codeBoxes}>
              {[0, 1, 2, 3].map((index) => (
                <Field
                  key={index}
                  name={index}
                  disabled={error === "code_expired"}
                  innerRef={inputRefs[index]}
                  maxLength={1}
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d?$/.test(value)) {
                      setFieldValue(index, value);
                      if (value && index < inputRefs.length - 1) {
                        inputRefs[index + 1].current?.focus();
                      }
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !e.target.value && index > 0) {
                      inputRefs[index - 1].current?.focus();
                    }
                  }}
                  className={classes.codeBox}
                />
              ))}
            </div>
            {error === "code_expired" && <Error />}
            <Timer reSend={() => checkNumber("577090280", dispatch)} />
            <Button
              type="submit"
              disabled={Object.values(values).some((v) => v === "")}
              btnName="დადასტურება"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CodeInput;
