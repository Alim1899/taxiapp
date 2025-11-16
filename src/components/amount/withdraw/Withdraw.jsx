import { useForm } from "react-hook-form";
import Header from "../../UI/header";
import classes from "./Withdraw.module.css";
const Withdraw = ({ close }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className={classes.backdrop} onClick={close}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
        className={classes.withdraw}
      >
        <Header text="თანხის გატანა" type="button" onClick={close} />
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
        <input {...register("recipient")} placeholder="მიხეილ მარღიშვილი" />
        <label>თანხა</label>
        <input {...register("amount")} placeholder="თანხა" />
        <button className={classes.btn} type="submit">
          გატანა
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
