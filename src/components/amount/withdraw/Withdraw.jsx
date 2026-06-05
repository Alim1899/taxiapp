import classes from "../Amount.module.css";
import Header from "../../UI/Header";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../FormikField";
import isIBAN from "validator/lib/isIBAN";
import SavedIbans from "./SavedIbans";
import useUser from "../../context/UserContext/useUser";
import Skeleton from "../../UI/Skeleton";
const Withdraw = ({ close, header }) => {
  const { state, dispatch } = useUser();
  const { selectedAccount,amount } = state;
  console.log(selectedAccount);
  const WithdrawSchema = Yup.object({
    iban: Yup.string()
      .required("აუცილებელი ველი")
      .test("is-iban", "არასწორი IBAN", (value) =>
        value ? isIBAN(value.replace(/\s+/g, "")) : false,
      ),
    fullName: Yup.string().required("აუცილებელი ველი"),
    amount: Yup.number()
      .nullable()
      .typeError("მხოლოდ რიცხვი")
      .positive("თანხა უნდა იყოს დადებითი")
      .required("აუცილებელი ველი"),
  });

  return (
    <Formik
      enableReinitialize
      validateOnMount
      validateOnChange
      initialValues={{
        iban: selectedAccount?.iban || "",
        fullName: `${selectedAccount?.receiverFirstName} ${selectedAccount.receiverLastName}`,
        amount: amount,
      }}
      validationSchema={WithdrawSchema}
      onSubmit={(values) => {
        console.log(values);
        const [firstName, ...lastNameParts] = values.fullName.split(" ");
        const lastName = lastNameParts.join(" ");
        console.log(firstName); // Amirani
        console.log(lastName); // Gachechiladze
      }}
    >
      {({ isValid }) => (
        <Form onClick={(e) => e.stopPropagation()} className={classes.withdraw}>
          <Header text={header} type="button" onClick={close} />

          <SavedIbans
            state={state}
            selectedAccount={selectedAccount}
            dispatch={dispatch}
          />
          {selectedAccount.iban ? (
            <FormikField
              name="iban"
              label="ანგარიშის ნომერი"
              placeholder="GE29NB0000000101904917"
            />
          ) : (
            <Skeleton />
          )}

          {selectedAccount.iban ? (
            <FormikField
              name="fullName"
              label="მიმღების დასახელება"
              placeholder="მიხეილ მარღიშვილი"
            />
          ) : (
            <Skeleton />
          )}

          {selectedAccount.iban ? (
            <FormikField name="amount" label="თანხა" placeholder="თანხა" />
          ) : (
            <Skeleton />
          )}

          <button className={classes.btn} type="submit" disabled={!isValid}>
            გატანა
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Withdraw;
