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
import { useState } from "react";

const Withdraw = ({ close, header }) => {
  const { state, dispatch } = useUser();
  const {
    selectedAccount,
    isSaving,
    isDefault,
    isLoading,
    userDetails,
    paymentAccountName,
    isWithdrawing,
    withdrawStatus,
  } = state;
  const { balance } = userDetails;
  const [amount, setAmount] = useState(() => balance || "");

  const WithdrawSchema = Yup.object({
    iban: Yup.string()
      .required("აუცილებელი ველი")
      .test("is-iban", "არასწორი IBAN", (value) =>
        value ? isIBAN(value.replace(/\s+/g, "")) : false,
      ),
    fullName: Yup.string()
      .required("აუცილებელი ველი")
      .matches(/^\S+\s+\S+/, "გთხოვთ შეიყვანოთ სახელი და გვარი"),
    amount: Yup.number()
      .nullable()
      .transform((value, original) => (original === "" ? null : value))
      .typeError("მხოლოდ რიცხვი")
      .positive("თანხა უნდა იყოს დადებითი")
      .required("აუცილებელი ველი")
      .min(1)
      .max(1500, "მაქსიმუმ 1500₾")
      .test("max-balance", "არასაკმარისი ბალანსი", (value) =>
        value ? value <= balance : true,
      ),
    accountName: Yup.string().when("isSaving", {
      is: true,
      then: (schema) => schema.required("სახელი აუცილებელია"),
    }),
  });

  return (
    <Formik
      enableReinitialize
      validateOnMount
      validateOnChange
      initialValues={{
        iban: selectedAccount?.iban || "",
        fullName:
          `${selectedAccount?.receiverFirstName || ""} ${selectedAccount?.receiverLastName || ""}`.trim(),
        amount: amount || "",
        accountName: "",
        isSaving: false,
        isDefault: false,
      }}
      validationSchema={WithdrawSchema}
      onSubmit={(values) => {
        const [firstName, ...lastNameParts] = values.fullName.split(" ");
        const lastName = lastNameParts.join(" ");
        const userSettings = {
          iban: values.iban,
          firstName: firstName,
          lastName: lastName,
          amount: Number(values.amount),
          savePaymentAccount: isSaving,
          setDefaultPaymentAccount: isDefault,
          setPaymentAccountName: paymentAccountName,
        };
        withdraw(userSettings, dispatch);
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

          {isLoading ? (
            <Skeleton />
          ) : (
            <FormikField
              name="iban"
              label="ანგარიშის ნომერი"
              placeholder="GE29NB0000000101904917"
            />
          )}

          {isLoading ? (
            <Skeleton />
          ) : (
            <FormikField
              name="fullName"
              label="მიმღების დასახელება"
              placeholder="მიხეილ მარღიშვილი"
            />
          )}

          {isLoading ? (
            <Skeleton />
          ) : (
            <FormikField
              name="amount"
              label="თანხა"
              placeholder="მინ. 0 - მაქს. 1500"
              min={1}
              max={1500}
              onChange={(e) => {
                setAmount(e.target.value); // 👈 keep local copy
              }}
            />
          )}

          <CheckBoxes
            isDefault={isDefault}
            isSaving={isSaving}
            dispatch={dispatch}
            accountName={paymentAccountName}
          />

         <button
  className={classes.btn}
  type="submit"
  disabled={!isValid || isWithdrawing}
>
  {isWithdrawing ? "მიმდინარეობს..." : "გატანა"}
</button>

{withdrawStatus === "success" && (
  <p className={classes.success}>თანხა წარმატებით გაიტანა!</p>
)}
{withdrawStatus === "error" && (
  <p className={classes.error}>შეცდომა, სცადეთ თავიდან</p>
)}
        </Form>
      )}
    </Formik>
  );
};

export default Withdraw;
