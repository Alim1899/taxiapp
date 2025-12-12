import classes from "./Auth.module.css";
import Error from "../UI/Error";
import Spinner from "../UI/Spinner";
import Login from "./Login";
import useUsers from "../context/useUsers";
import CodeInput from "./CodeInput";
import Header from "./Header";
const Auth = () => {
  const { state } = useUsers();
  const { correctNumber, userNotFound, showSpinner } = state;
  return (
    <div className={classes.auth}>
      <Header correctNumber={correctNumber} />

      {!correctNumber ? (
        <div className={classes.wrapper}>
          {showSpinner ? <Spinner /> : <Login />}
        </div>
      ) : (
        <CodeInput />
      )}

      {userNotFound && <Error />}
    </div>
  );
};

export default Auth;
