import classes from "./Amount.module.css";
import Header from "../UI/Header";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "./FormikField";

const Send = ({ close, headerText }) => {
  const SendSchema = Yup.object({
    bank: Yup.string().required("აირჩიე ბანკი"),
    iban: Yup.string()
      .required("აუცილებელი ველი")
      .matches(/^GE\d{2}[A-Z0-9]{16,}$/, "არასწორი IBAN ფორმატი"),
    recipient: Yup.string().required("აუცილებელი ველი"),
    amount: Yup.number()
      .typeError("მხოლოდ რიცხვი")
      .positive("თანხა უნდა იყოს დადებითი")
      .required("აუცილებელი ველი"),
    purpose: Yup.string().required("აუცილებელი ველი"),
  });

  return (
    <Formik
      initialValues={{
        bank: "",
        iban: "",
        recipient: "",
        amount: "",
        purpose: "პირადი გადარიცხვა",
      }}
      validationSchema={SendSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ isValid }) => (
        <Form onClick={(e) => e.stopPropagation()} className={classes.send}>
          <Header text={headerText} type="button" onClick={close} />

          <FormikField
            name="bank"
            label="აირჩიე ბანკი"
            as="select"
            options={[
              { value: "", label: "აირჩიე ბანკი", disabled: true },
              { value: "tbc", label: "თიბისი ბანკი" },
              { value: "bog", label: "საქართველოს ბანკი" },
              { value: "liberty", label: "ლიბერთი ბანკი" },
              { value: "other", label: "სხვა ბანკი" },
            ]}
          />

          <FormikField
            name="iban"
            label="ანგარიშის ნომერი"
            placeholder="GE29NB0000000101904917"
          />

          <FormikField
            name="recipient"
            label="მიმღების დასახელება"
            placeholder="სახელი და გვარი"
          />

          <FormikField name="amount" label="თანხა" placeholder="თანხა" />

          <FormikField
            name="purpose"
            label="დანიშნულება"
            placeholder="პირადი გადარიცხვა"
          />

          <button className={classes.btn} type="submit" disabled={!isValid}>
            გადარიცხვა
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Send;
