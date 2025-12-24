import { Field, useFormikContext } from "formik";
import FieldError from "./withdraw/ErrorWrapper";
import classes from "./Amount.module.css";
const FormikField = ({ name, label, as = "input", options, ...props }) => {
  const { errors, touched } = useFormikContext();

  return (
    <div className={classes.fields}>
      {label && (
        <label htmlFor={name} className={classes.fieldLabel}>
          {label}
        </label>
      )}

      {as === "select" ? (
        <Field name={name} as="select" {...props} className={classes.field}>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </Field>
      ) : (
        <Field name={name} as={as} {...props} className={classes.field} />
      )}
      <div className={classes.err}>
        {" "}
        <FieldError error={errors[name]} touched={touched[name]} className />
      </div>
    </div>
  );
};

export default FormikField;
