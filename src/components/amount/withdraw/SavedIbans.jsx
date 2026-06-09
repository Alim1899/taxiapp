import classes from "../Amount.module.css";
import Select from "react-select";
import { Star } from "lucide-react";
import { useFormikContext } from "formik";
import { getPaymentAccount } from "../../../utils/Functions";
import Skeleton from "../../UI/Skeleton";
import { useEffect, useRef } from "react";

const CustomOption = ({ innerProps, data }) => (
  <div
    {...innerProps}
    className="flex items-center justify-between px-3 py-2 cursor-pointer"
  >
    <span>{data.label}</span>
    {data.favourite && (
      <Star size={16} style={{ color: "gold", fill: "gold" }} />
    )}
  </div>
);

export default function SavedIbans({ state, selectedAccount, dispatch }) {
  const { setFieldValue } = useFormikContext();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      getPaymentAccount(dispatch);
    }
  }, [dispatch]);

  const { isLoading } = state;

  const options = state.accounts.map((item) => ({
    value: item.id || "",
    label: item.iban || "",
    favourite: item.default || "",
    account: item || "",
  }));

  const renderSelect = () => {
    if (isLoading) return <Skeleton />;

    if (!options.length) {
      return <p className={classes.noAccounts}>შენახული ანგარიშები არ გაქვს</p>;
    }

    return (
      <Select
        options={options}
        placeholder="აირჩიე ბანკი"
        noOptionsMessage={() => "სია ცარიელია"}
        value={options.find((option) => option.value === selectedAccount?.id) || null}
        onChange={(selected) => {
          const account = selected?.account || null;
          dispatch({ type: "SET_ACCOUNT", payload: account });
          setFieldValue("fullName", `${account?.receiverFirstName} ${account?.receiverLastName}`);
          setFieldValue("iban", account?.iban || "");
          setFieldValue("amount", "");
        }}
        components={{ Option: CustomOption }}
      />
    );
  };

  return (
    <div className={classes.saved}>
      {options.length?<label className="block mb-1">შენახული ანგარიშები</label>:null}
      {renderSelect()}
    </div>
  );
}