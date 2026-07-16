import classes from "../Amount.module.css";
import Header from "../../UI/Header";
import { Formik, Form } from "formik";
import FormikField from "../FormikField";
import SavedIbans from "./SavedIbans";
import useUser from "../../context/UserContext/useUser";
import { withdraw } from "../../../utils/Functions";
import Skeleton from "../../UI/Skeleton";
import CheckBoxes from "./CheckBoxes";
import { createWithdrawSchema } from "./Schema";
import useAuth from "../../context/AuthContext/useAuth";
import { useDriverInfo } from "../../Hooks/useDriverInfo";
const Withdraw = ({ close, header }) => {
  const { state: authState } = useAuth();
  const { token } = authState;
  const { data: userDetails } = useDriverInfo(token);
  const balance = userDetails?.balance;
  const { state, dispatch } = useUser();
  const {
    selectedAccount,
    isSaving,
    isDefault,
    isLoading,
    paymentAccountName,
    isWithdrawing,
    withdrawStatus,
  } = state;

  const isAccountSelected = !!selectedAccount?.id;
  return (
    <Formik
      enableReinitialize
      validateOnMount
      validateOnChange
      initialValues={{
        iban: selectedAccount?.iban || "",
        fullName:
          `${selectedAccount?.receiverFirstName || ""} ${selectedAccount?.receiverLastName || ""}`.trim() ||
          "",
        amount: isAccountSelected ? balance : "",
        accountName: selectedAccount?.name || "",
        isSaving: isAccountSelected ? true : false,
        isDefault: false,
      }}
      validationSchema={createWithdrawSchema(balance)}
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
          setPaymentAccountName: values.accountName,
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
              onChange={() => {
                if (selectedAccount?.id)
                  dispatch({ type: "SET_ACCOUNT", payload: {} }); // 👈 only reset if account was selected
              }}
              style={
                isAccountSelected ? { opacity: 0.6, cursor: "not-allowed" } : {}
              }
              disabled={isAccountSelected}
            />
          )}

          {isLoading ? (
            <Skeleton />
          ) : (
            <FormikField
              name="fullName"
              label="მიმღების დასახელება"
              placeholder="მიხეილ მარღიშვილი"
              onChange={() => {
                if (selectedAccount?.id)
                  dispatch({ type: "SET_ACCOUNT", payload: {} }); // 👈 same here
              }}
              style={
                isAccountSelected ? { opacity: 0.6, cursor: "not-allowed" } : {}
              }
              disabled={isAccountSelected}
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
            />
          )}

          <CheckBoxes
            isDefault={isDefault}
            isSaving={isAccountSelected ? isAccountSelected : isSaving}
            dispatch={dispatch}
            accountName={
              isAccountSelected
                ? selectedAccount?.name || ""
                : paymentAccountName
            }
            isAccountSelected={isAccountSelected}
            isAlreadyDefault={selectedAccount?.default === true}
          />

          <button
            className={classes.btn}
            type="submit"
            disabled={!isValid || isWithdrawing}
          >
            {isWithdrawing ? "🚫თქვენ გაქვთ აქტიური ტრანზაქცია" : "გატანა"}
          </button>

          {withdrawStatus === "success" && (
            <p className={classes.success}>თანხა გადაირიცხა ანგარიშზე!</p>
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
