import classes from "../Amount.module.css";
import Select from "react-select";
import { Star } from "lucide-react";
import { useFormikContext } from "formik";
import useAmount from "../../context/AmountContext/useAmount";

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

export default function BankSelect() {
  const { state, dispatch } = useAmount();

  const { setFieldValue } = useFormikContext();

  const options = state.accounts.map((item) => ({
    value: item.id,
    label: item.iban,
    favourite: item.favourite,
    account: item,
  }));

  return (
    <div className={classes.saved}>
      <label className="block mb-1">
        შენახული ანგარიშები
      </label>

      <Select
        options={options}
        placeholder={
          options.length
            ? "აირჩიე ბანკი"
            : "სია ცარიელია"
        }
        noOptionsMessage={() => "სია ცარიელია"}
        value={
          options.find(
            (option) =>
              option.value === state.selectedAccount?.id
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
    account?.fullName || ""
  );

  setFieldValue(
    "iban",
    account?.iban || ""
  );

  
}}
        components={{
          Option: CustomOption,
        }}
      />
    </div>
  );
}