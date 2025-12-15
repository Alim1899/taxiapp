import classes from "./Auth.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useUsers from "../context/useUsers";
import { onSubmit } from "../../utils/Functions";
import Button from "../UI/Button";
import Error from "../UI/Error";
const Login = ({ children }) => {
  const { state, dispatch } = useUsers();
  const { userNumber, error } = state;
  const PhoneSchema = Yup.object().shape({
    number: Yup.string()
      .required("აუცილებელი ველი")
      .matches(/^5/, "ნომერი უნდა იწყებოდეს 5-ით")
      .matches(/^\d{9}$/, "ნომერი უნდა შეიცავდეს 9 ციფრს"),
  });

  return (
    <Formik
      initialValues={{
        number: userNumber.replace(/^\+995/, ""),
      }}
      validationSchema={PhoneSchema}
      onSubmit={(values) => {
        onSubmit(values, dispatch);
      }}
    >
      {({ values, setFieldValue, isValid, errors }) => {
        const formattedNumber = values.number.replace(/(\d{3})(?=\d)/g, "$1 ");

        return (
          <Form>
            <div className={classes.field}>
              <span className={classes.prefix}>+995</span>

              <Field
                name="number"
                value={formattedNumber}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, "").slice(0, 9);
                  setFieldValue("number", cleaned);
                }}
                onClick={() => dispatch({ type: "ERROR_RESET" })}
                placeholder="მობილურის ნომერი"
                className={classes.input}
              />
            </div>
            {errors.number && error !== "number" && (
              <Error errorText={errors.number} />
            )}
            {error === "number" && <Error />}
            {children}
            <div className={classes.btn}>
              <Button
                btnName="შესვლა"
                type="submit"
                disabled={!isValid || !values.number}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Login;
