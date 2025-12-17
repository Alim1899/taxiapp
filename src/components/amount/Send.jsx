import classes from "./Amount.module.css";
import Header from "../UI/Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Error from "../UI/Error";
import FieldError from "./withdraw/ErrorWrapper";

const Send = ({ close, headerText }) => {
  const SendSchema = Yup.object().shape({
    bank: Yup.string().required("აირჩიე ბანკი"),
    iban: Yup.string()
      .required("აუცილებელი ველი")
      .matches(/^GE\d{2}[A-Z0-9]{16,}$/, "არასწორი IBAN ფორმატი"),
    recipient: Yup.string().required("აუცილებელი ველი"),
    amount: Yup.number()
      .typeError("მხოლოდ რიცხვი")
      .positive("თანხა უნდა იყოს დადებითი")
      .required("აუცილებელი ველი"),
    purpose: Yup.string(),
  });

  return (
    <Formik
      initialValues={{
        bank: "",
        iban: "",
        recipient: "",
        amount: "",
        purpose: "",
      }}
      validationSchema={SendSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ isValid, errors, touched }) => (
        <Form onClick={(e) => e.stopPropagation()} className={classes.send}>
          <Header text={headerText} type="button" onClick={close} />
          <label>აირჩიე ბანკი</label>
          <Field as="select" name="bank">
            <option value="" disabled>
              აირჩიე ბანკი
            </option>
            <option value="tbc">თიბისი ბანკი</option>
            <option value="bog">საქართველოს ბანკი</option>
            <option value="liberty">ლიბერთი ბანკი</option>
            <option value="other">სხვა ბანკი</option>
          </Field>
          <FieldError error={errors.bank} touched={touched.bank} />

          <label>ანგარიშის ნომერი</label>
          <Field name="iban" placeholder="GE29NB0000000101904917" />
          <FieldError error={errors.iban} touched={touched.iban} />

          <label>მიმღების დასახელება</label>
          <Field name="recipient" placeholder="სახელი და გვარი" />

          <FieldError error={errors.recipient} touched={touched.recipient} />

          <label>თანხა</label>
          <Field name="amount" placeholder="თანხა" />
          <FieldError error={errors.amount} touched={touched.amount} />

          <label>დანიშნულება</label>
          <Field
            name="purpose"
            placeholder="პირადი გადარიცხვა"
            defaultValue="პირადი გადარიცხვა"
          />
          <FieldError error={errors.purpose} touched={touched.purpose} />

          <button className={classes.btn} type="submit" disabled={!isValid}>
            გადარიცხვა
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Send;
