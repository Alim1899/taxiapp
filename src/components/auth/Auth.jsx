import { useForm } from "react-hook-form";
import classes from "./Auth.module.css";
import Error from "../UI/Error";
import logo from "../../assets/logo.jpg";
import { useState } from "react";
import { TOKEN, URL, PARKID } from "./constants";

const Auth = () => {
  const [userNotFound, setUserNotFound] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const formatNumber = (value) => {
    let digits = value.replace(/\D/g, "").slice(0, 9); // max 9 digits
    return digits.replace(/(\d{3})(?=\d)/g, "$1 ");
  };
  const handleInput = (e) => {
    setUserNotFound(false);
    const formatted = formatNumber(e.target.value);
    setValue("number", formatted, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    if (!data) return;
    const number = data.number.replace(/\s/g, "");
    getData(number);
  };

  const getData = async (number) => {
    console.log(number);
    await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        phoneNumber: `+995${number}`,
        parkId: `${PARKID}`,
        roleId: 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.statusCode === 500) setUserNotFound(true);
      })
      .catch((err) => console.error(err.statusCode));
  };

  return (
    <div className={classes.auth}>
      <h2>TAXI | APP</h2>
      <img alt="logo" className={classes.logo} src={logo} />
      <h4>ავტორიზაცია</h4>

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.number}>
          <div className={classes.field}>
            <span className={classes.prefix}>+995</span>
            <input
              placeholder="მობილურის ნომერი"
              defaultValue=""
              {...register("number", {
                required: "აუცილებელი ველი",
                pattern: {
                  value: /^5\d{2}\s\d{3}\s\d{3}$/,
                  message: "ნომერი უნდა იყოს ფორმატში: 5XX XXX XXX",
                },
              })}
              onInput={handleInput}
              className={classes.input}
            />
          </div>

          {errors.number && <Error errorText={errors.number.message} />}
        </div>

        <button
          className={classes.submit}
          disabled={
            !getValues("number") ||
            getValues("number").length === 0 ||
            errors.number ||
            userNotFound
              ? true
              : false
          }
          type="submit"
        >
          შესვლა
        </button>
      </form>
      {userNotFound && (
        <Error errorText="მითითებული ნომრით ანგარიში ვერ მოიძებნა" />
      )}
    </div>
  );
};

export default Auth;
