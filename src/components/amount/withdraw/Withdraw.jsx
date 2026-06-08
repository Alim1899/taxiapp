import classes from "../Amount.module.css";
import Header from "../../UI/Header";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../FormikField";
import isIBAN from "validator/lib/isIBAN";
import SavedIbans from "./SavedIbans";
import useUser from "../../context/UserContext/useUser";
import { withdraw } from "../../../utils/Functions";
import Skeleton from "../../UI/Skeleton";
import CheckBoxes from "./CheckBoxes";
const Withdraw = ({ close, header }) => {
  const { state, dispatch } = useUser();
  const { selectedAccount, amount, isSaving, isDefault } = state;

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
        isSaving: isSaving,
        isDefault: isDefault,
      }}
      validationSchema={WithdrawSchema}
      onSubmit={(values) => {
        const [firstName, ...lastNameParts] = values.fullName.split(" ");
        const lastName = lastNameParts.join(" ");
        const userSettings = {
          iban:values.iban,
          firstName:firstName,
          lastName:lastName,
          amount:Number(values.amount),
          savePaymentAccount:isSaving,
          setDefaultPaymentAccount:isDefault
        }
        withdraw(userSettings)
     
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
          <CheckBoxes
            isDefault={isDefault}
            isSaving={isSaving}
            dispatch={dispatch}
          />

          <button className={classes.btn} type="submit" disabled={!isValid}>
            გატანა
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Withdraw;
