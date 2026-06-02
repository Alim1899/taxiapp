import classes from "../Amount.module.css";
import Header from "../../UI/Header";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../FormikField";
import isIBAN from "validator/lib/isIBAN";
import BankSelect from "./SavedIbans";
const Withdraw = ({ close, header }) => {
  const WithdrawSchema = Yup.object({
    bank: Yup.string().required("აირჩიე ბანკი"),
     iban: Yup.string()
    .required("აუცილებელი ველი")
    .test("is-iban", "არასწორი IBAN", (value) =>
      value ? isIBAN(value.replace(/\s+/g, "")) : false
    ),
    recipient: Yup.string().required("აუცილებელი ველი"),
    amount: Yup.number()
      .typeError("მხოლოდ რიცხვი")
      .positive("თანხა უნდა იყოს დადებითი")
      .required("აუცილებელი ველი"),
  });
console.log(isIBAN("GE33BG0000000602842703"));
  return (
    <Formik
      initialValues={{
        bank: "",
        iban: "",
        recipient: "",
        amount: "",
      }}
      validationSchema={WithdrawSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ isValid }) => (
        <Form onClick={(e) => e.stopPropagation()} className={classes.withdraw}>
          <Header text={header} type="button" onClick={close} />

        <BankSelect/>  
        

          <FormikField
            name="iban"
            label="ანგარიშის ნომერი"
            placeholder="GE29NB0000000101904917"
          />

          <FormikField
            name="recipient"
            label="მიმღების დასახელება"
            placeholder="მიხეილ მარღიშვილი"
          />

          <FormikField name="amount" label="თანხა" placeholder="თანხა" />

          <button className={classes.btn} type="submit" disabled={!isValid}>
            გატანა
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Withdraw;
