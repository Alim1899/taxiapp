import { useFormikContext } from "formik";
import classes from "../Amount.module.css";
import FormikField from "../FormikField";
const CheckBoxes = ({
  isDefault,
  isSaving,
  dispatch,
  accountName,
  isAccountSelected,
  isAlreadyDefault,
}) => {
  const { setFieldValue } = useFormikContext();
  const handleSaving = () => {
    const newValue = !isSaving;
    dispatch({ type: "SET_SAVING", payload: newValue });
    setFieldValue("isSaving", newValue);
    if (!newValue) {
      dispatch({ type: "SET_DEFAULT", payload: false });
      setFieldValue("isDefault", false);
      setFieldValue("accountName", "");
    }
  };

  const handleDefault = () => {
    const newValue = !isDefault;
    dispatch({ type: "SET_DEFAULT", payload: newValue });
    setFieldValue("isDefault", newValue);
    if (newValue && !isSaving) {
      dispatch({ type: "SET_SAVING", payload: true });
      setFieldValue("isSaving", true);
    }
  };

return (
  <div className={classes.checkboxes}>
    <label className={classes.checkSave}>
      <FormikField
        type="checkbox"
        name="isSaving"
        checked={isAccountSelected || isSaving} // 👈 visually checked when account selected
        onChange={handleSaving}
        disabled={isAccountSelected}
      />
      <span>შენახვა</span>
    </label>

   {isAlreadyDefault ? (
  <label className={classes.favorite}>
    <FormikField
      type="checkbox"
      name="isDefault"
      checked={true}
      disabled={true}
      onChange={() => {}}
    />
    <span>ძირითადი ანგარიში </span>
  </label>
) : (
  <label className={classes.favorite}>
    <FormikField
      type="checkbox"
      name="isDefault"
      checked={isDefault}
      onChange={handleDefault}
    />
    <span>შენახვა როგორც ძირითადი</span>
  </label>
)}

    {(isSaving || isAccountSelected) && ( // 👈 show when either
      <div className={classes.accountNameWrap}>
        <FormikField
          type="text"
          name="accountName"
          placeholder="მაგ: ჩემი TBC"
          value={accountName}
          onChange={(e) => {
            dispatch({ type: "SET_PAYMENT_ACCOUNT_NAME", payload: e.target.value });
            setFieldValue("accountName", e.target.value);
          }}
        />
      </div>
    )}
  </div>
);
};

export default CheckBoxes;
