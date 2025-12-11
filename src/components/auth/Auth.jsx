import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import classes from "./Auth.module.css";
import Error from "../UI/Error";
import logo from "../../assets/logo.jpg";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import { onSubmit } from "../../utils/Functions";
import Spinner from "../UI/Spinner";
import useUsers from "../context/useUsers";
const Auth = () => {
  const { state, dispatch } = useUsers();

  const [userNotFound, setUserNotFound] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [correctNumber, setCorrectNumber] = useState(false);
  useEffect(() => {
    console.log(state);
  }, [state]);
  const PhoneSchema = Yup.object().shape({
    number: Yup.string()
      .required("აუცილებელი ველი")
      .matches(/^5/, "ნომერი უნდა იწყებოდეს 5-ით")
      .matches(/^\d{9}$/, "ნომერი უნდა შეიცავდეს 9 ციფრს"),
  });
  return (
    <div className={classes.auth}>
      <h2>TAXI | APP</h2>
      <img alt="logo" className={classes.logo} src={logo} />
      <h4>
        {correctNumber ? "შეიყვანე მობილურზე მიღებული კოდი" : "ავტორიზაცია"}
      </h4>
      {}
      {showSpinner ? (
        <Spinner />
      ) : (
        <Formik
          initialValues={{ number: "" }}
          validationSchema={PhoneSchema}
          onSubmit={(values) => {
            onSubmit(
              values,
              setUserNotFound,
              setShowSpinner,
              setCorrectNumber,

              dispatch
            );
          }}
        >
          {({ values, setFieldValue, isValid, errors }) => (
            <Form>
              <div className={classes.field}>
                <span className={classes.prefix}>+995</span>
                <Field
                  name="number"
                  value={values.number.replace(/(\d{3})(?=\d)/g, "$1 ").trim()}
                  onChange={(e) => {
                    setUserNotFound(false);
                    let val = e.target.value.replace(/\D/g, "").slice(0, 9);
                    setFieldValue("number", val);
                  }}
                  placeholder="მობილურის ნომერი"
                  className={classes.input}
                />
              </div>
              <Error errorText={errors.number} />
              <Button
                btnName="შესვლა"
                type="submit"
                disabled={!isValid || !values.number}
              ></Button>
            </Form>
          )}
        </Formik>
      )}

      {userNotFound && (
        <Error errorText="მითითებული ნომრით ანგარიში ვერ მოიძებნა" />
      )}
    </div>
  );
};

export default Auth;
