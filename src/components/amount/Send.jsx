import { useForm } from "react-hook-form";
import Header from "../UI/header";
import classes from "./withdraw/Withdraw.module.css";
const Send = ({ close, header }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()}
      className={classes.withdraw}
    >
      <Header text={header} type="button" onClick={close} />
      <label>აირჩიე ბანკი</label>
      <select {...register("bank")} placeholder="აირჩიე ბანკი">
        <option value="tbc">თიბისი ბანკი</option>
        <option value="bog">საქართველოს ბანკი</option>
        <option value="liberty">ლიბერთი ბანკი</option>
        <option value="other">სხვა ბანკი</option>
      </select>
      <label>ანგარიშის ნომერი</label>
      <input {...register("iban")} placeholder="GE29NB0000000101904917" />
      <label>მიმღების დასახელება</label>
      <input {...register("recipient")} placeholder="სახელი და გვარი" />
      <label>თანხა</label>
      <input {...register("amount")} placeholder="თანხა" />
      <label>დანიშნულება</label>
      <input placeholder="პირადი გადარიცხვა"></input>
      <button className={classes.btn} type="submit">
        გადარიცხვა
      </button>
    </form>
  );
};

export default Send;
