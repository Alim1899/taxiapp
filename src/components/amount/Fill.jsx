import { useForm } from "react-hook-form";
import Header from "../UI/Header";
import classes from "./withdraw/Withdraw.module.css";

import { MdOutlineAddCard } from "react-icons/md";

const Fill = ({ header }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()}
      className={classes.withdraw}
    >
      <Header text={header} type="button" onClick={close} />
      <label>აირჩიე ბარათი</label>
      <select {...register("card")} placeholder="აირჩიე ბარათი">
        <option value="tbc">xxxx5132</option>
        <option value="bog">xxxx1652</option>
      </select>
      <label>შეიყვანე თანხა</label>
      <input {...register("amoount")} type="number" placeholder="0.00"></input>
      <button className={classes.add}>
        <MdOutlineAddCard />
        ახალი ბარათის დამატება
      </button>
      <button className={classes.btn} type="submit">
        შევსება
      </button>
    </form>
  );
};

export default Fill;
