import classes from "../Amount.module.css";
import FormikField from "../FormikField";

const CheckBoxes = ({ isDefault, isSaving, dispatch }) => {
  return (
    <div className={classes.checkboxes}>
      <label className={classes.checkSave}>
        <input
          type="checkbox"
          name="isSaving"
          checked={isSaving}
          onChange={() => dispatch({ type: "SET_SAVING", payload: !isSaving })}
        />

        <span>შენახვა</span>
      </label>

      <label className={classes.favorite}>
        <input
          type="checkbox"
          name="isDefault"
          checked={isDefault}
          onChange={() =>
            dispatch({ type: "SET_DEFAULT", payload: !isDefault })
          }
        />

        <span>შენახვა როგორც ძირითადი</span>
      </label>
    </div>
  );
};

export default CheckBoxes;

