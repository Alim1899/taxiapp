import classes from "../Amount.module.css";
import Select from "react-select";
import { Star } from "lucide-react";
import { useFormikContext } from "formik";
import { getPaymentAccount } from "../../../utils/Functions";
import Skeleton from "../../UI/Skeleton";
import { useEffect } from "react";

const CustomOption = ({ innerProps, data }) => (
  <div
    {...innerProps}
    className="flex items-center justify-between px-3 py-2 cursor-pointer"
  >
    <span>{data.label}</span>

    {data.favourite && (
      <Star
        size={16}
        style={{
          color: "gold",
          fill: "gold",
        }}
      />
    )}
  </div>
);

export default function SavedIbans({ state, selectedAccount, dispatch }) {
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    if(!selectedAccount.iban){
      getPaymentAccount(dispatch); 
    }
   
  }, [dispatch,selectedAccount]);

  const options = state.accounts.map((item) => ({
    value: item.id || "",
    label: item.iban || "",
    favourite: item.default || "",
    account: item || "",
  }));

  return (
    <div className={classes.saved}>
      <label className="block mb-1">შენახული ანგარიშები</label>

      {selectedAccount.iban ? (
        <Select
          options={options}
          placeholder={options.length ? "აირჩიე ბანკი" : "სია ცარიელია"}
          noOptionsMessage={() => "სია ცარიელია"}
          value={
            options.find(
              (option) => option.value === state.selectedAccount?.id,
            ) || null
          }
          onChange={(selected) => {
            const account = selected?.account || null;
            dispatch({
              type: "SET_ACCOUNT",
              payload: account,
            });

            setFieldValue(
              "fullName",
              `${account?.receiverFirstName} ${account?.receiverLastName}`,
            );

            setFieldValue("iban", account?.iban || "");
          }}
          components={{
            Option: CustomOption,
          }}
        />
      ) : (
        <Skeleton />
      )}
    </div>
  );
}
