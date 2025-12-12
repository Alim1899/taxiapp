import { Formik, Form, Field } from "formik";
import { useRef } from "react";
import useUsers from "../context/useUsers";
import Button from "../UI/Button";
import classes from "./Auth.module.css";

const CodeInput = () => {
  const { state } = useUsers();
  const { arrivedCode } = state;

  const digits = String(arrivedCode).slice(0, 4).split("");
  const initialValues = {
    0: digits[0] || "",
    1: digits[1] || "",
    2: digits[2] || "",
    3: digits[3] || "",
  };

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  return (
    <Formik initialValues={initialValues} enableReinitialize>
      {({ setFieldValue, values }) => (
        <Form>
          <div className={classes.codeWrapper}>
            <div className={classes.codeBoxes}>
              {[0, 1, 2, 3].map((index) => (
                <Field
                  key={index}
                  name={index}
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

            <Button
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
