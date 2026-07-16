import classes from "../Amount.module.css";
import Select from "react-select";
import { Star } from "lucide-react";
import { useFormikContext } from "formik";
import { getPaymentAccount } from "../../../utils/Functions";
import Skeleton from "../../UI/Skeleton";
import { useEffect, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { CiBank } from "react-icons/ci";
import tbc from "../../../assets/banks/tbc.svg";
import bog from "../../../assets/banks/bog.svg";
import liberty from "../../../assets/banks/liberty.svg";

const CustomOption = ({ innerProps, data }) => {
  return (
    <div {...innerProps} className={classes.list}>
      {data.img && (
        <img src={data.img} alt={data.imgAlt} className={classes.bankImg} />
      )}
      {!data.img && data.icon && <data.icon className={classes.icon} />}
      <span className={classes.label}>{data.label}</span>
      {data.favourite && (
        <Star size={16} style={{ color: "gold", fill: "gold" }} />
      )}
    </div>
  );
};

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
  const options = [
    { value: "new", label: "ახალი ანგარიში", icon: IoMdAdd, account: "null" }, // 👈
    ...state.accounts.map((item) => {
      const isBog = item.iban.includes("BG");
      const isTbc = item.iban.includes("TB");
      const isLiberty = item.iban.includes("LB");
      return {
        value: item.id || "",
        label: item.name || "",
        favourite: item.default || "",
        account: item || "",
        img: isBog ? bog : isTbc ? tbc : isLiberty ? liberty : null,
        imgAlt: isBog ? "bog" : isTbc ? "tbc" : isLiberty ? "liberty" : null,
        icon: !isBog && !isTbc ? CiBank : null,
      };
    }),
  ];

  const renderSelect = () => {
    if (isLoading) return <Skeleton />;

    if (!options.length) {
      return <p className={classes.noAccounts}>შენახული ანგარიშები არ გაქვს</p>;
    }
    return (
      <Select
        options={options}
        placeholder="აირჩიე ანგარიში"
        noOptionsMessage={() => "სია ცარიელია"}
        value={
          options.find((option) => option.value === selectedAccount?.id) || null
        }
        onChange={(selected) => {
          if (selected?.value === "new") {
            
            dispatch({ type: "SET_ACCOUNT", payload: {} });
            dispatch({ type: "SET_PAYMENT_ACCOUNT_NAME", payload: "" });
            setFieldValue("fullName", "");
            setFieldValue("iban", "");
            setFieldValue("amount", "");
            setFieldValue("isSaving", false);
            return;
          }
          const account = selected?.account || null;
          dispatch({ type: "SET_ACCOUNT", payload: account });
          dispatch({
            type: "SET_PAYMENT_ACCOUNT_NAME",
            payload: selected?.label || "",
          });
          setFieldValue(
            "fullName",
            `${account?.receiverFirstName} ${account?.receiverLastName}`,
          );
          setFieldValue("iban", account?.iban || "");
          setFieldValue("amount", "");
          setFieldValue("isSaving", true);
          setFieldValue("accountName", selected?.label || "");
        }}
        components={{ Option: CustomOption }}
      />
    );
  };

  return (
    <div className={classes.saved}>
      {options.length ? (
        <label>შენახული ანგარიშები</label>
      ) : null}
      {renderSelect()}
    </div>
  );
}
