import classes from "../Amount.module.css";
import Select from "react-select";
import { Star } from "lucide-react";
import { useField, useFormikContext } from "formik";

const bankOptions = [
  {
    value: "GE29NB0000000101904917",
    label: "GE29NB0000000101904917",
    favourite: false,
  },
  {
    value: "GE33BG0000000602842703",
    label: "GE33BG0000000602842703",
    favourite: true,
  },
];

const CustomOption = ({ innerProps, data }) => (
  <div
    {...innerProps}
    className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100"
  >
    <span>{data.label}</span>

    {data.favourite && (
      <Star
        size={16}
        style={{color:"gold", fontWeight:"bold"}}
      />
    )}
  </div>
);

export default function BankSelect() {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField("bank");
const sortedOptions = [...bankOptions].sort(
  (a, b) => Number(b.favourite) - Number(a.favourite)
);
  return (
    <div className={classes.saved}>
      <label className="block mb-1">
        შენახული ანგარიშები
      </label>

    <Select
  options={sortedOptions}
  placeholder="აირჩიე ბანკი"
  value={
    sortedOptions.find(
      (option) => option.value === field.value
    ) || null
  }
  onChange={(selected) =>
    setFieldValue("bank", selected?.value || "")
  }
  components={{
    Option: CustomOption,
  }}
/>

      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm mt-1">
          {meta.error}
        </p>
      )}
    </div>
  );
}