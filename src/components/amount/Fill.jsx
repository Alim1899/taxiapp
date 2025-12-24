import { Formik, Form } from "formik";
import Header from "../UI/Header";
import classes from "./Amount.module.css";
import { MdOutlineAddCard } from "react-icons/md";
import FormikField from "./FormikField";

const Fill = ({ close, headerText }) => {
  return (
    <Formik
      initialValues={{
        card: "",
        amount: "",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ isValid }) => (
        <Form onClick={(e) => e.stopPropagation()} className={classes.withdraw}>
          <Header text={headerText} type="button" onClick={close} />

          <FormikField
            name="card"
            label="აირჩიე ბარათი"
            as="select"
            options={[
              { value: "", label: "აირჩიე ბარათი", disabled: true },
              { value: "tbc", label: "xxxx5132" },
              { value: "bog", label: "xxxx1652" },
            ]}
          />

          <FormikField
            name="amount"
            label="შეიყვანე თანხა"
            type="number"
            placeholder="0.00"
          />

          <button type="button" className={classes.add}>
            <MdOutlineAddCard />
            ახალი ბარათის დამატება
          </button>

          <button className={classes.btn} type="submit" disabled={!isValid}>
            შევსება
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Fill;
