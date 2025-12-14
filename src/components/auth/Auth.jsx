import classes from "./Auth.module.css";
import Error from "../UI/Error";
import Spinner from "../UI/Spinner";
import Login from "./Login";
import useUsers from "../context/useUsers";
import CodeInput from "./CodeInput";
import Header from "./Header";
const Auth = () => {
  const { state } = useUsers();
  const { error, showSpinner, step } = state;
  return (
    <div className={classes.auth}>
      <Header />

      <div className={classes.wrapper}>
        {step === "checking_number" || showSpinner ? (
          <Spinner />
        ) : step === "enter_code" ? (
          <CodeInput />
        ) : (
          <Login />
        )}
      </div>

      {error === "number" && <Error />}
    </div>
  );
};

export default Auth;
