import queryClient from "../queryClient";
import {
  CHECK_NUMBER,
  CHECK_CODE,
  TOKEN,
  PARKID,
  PAYMENT_ACCOUNT,
  WITHDRAW,
  TRANSACTIONS,
} from "./Constants";

export const onSubmit = (data, dispatch) => {
  if (!data) return;
  const number = data.number.replace(/\s/g, "");
  checkNumber(number, dispatch);
};

// |||||||||   CHECK ARRIVED CODE
export const checkLogin = async (number, code, dispatch) => {
  dispatch({ type: "CHECKING_CODE" });
  try {
    const res = await fetch(`${CHECK_CODE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        phoneNumber: String(number),
        parkId: String(PARKID),
        code: String(code),
        roleId: 0,
      }),
    });

    if (!res.ok) throw new Error(res.status);

    const data = await res.json();
    const token = data.access_token;

    if (!token) {
      dispatch({ type: "WRONG_CODE" });
      return;
    }

    sessionStorage.setItem("token", token);

    dispatch({
      type: "CODE_SUCCESS",
      payload: data,
    });
  } catch (err) {
    console.error(err, "Invalid Code");
    dispatch({ type: "WRONG_CODE" });
  }
};

// CHECK NUMBER IS CORRET OR NOT |||||||||||||||||

export const checkNumber = async (number, dispatch) => {
  dispatch({ type: "CHECKING_NUMBER" });
  await fetch(`${CHECK_NUMBER}`, {
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
    .then((res) => {
      if (res.status === 201 && res.ok) {
        dispatch({
          type: "NUMBER_SUCCESS",
          payload: `+995${number}`,
        });
      } else if (res.statusCode === 500) {
        dispatch({ type: "WRONG_NUMBER" });
      }
    })
    .catch((err) => console.error(err.statusCode));
};

//  GET DRIVER NAME LASTNAME AND BALANCE  |||||||||||||||||||||

// GET USERS SAVED PAYMENT IBANS  ||||||||||||||||||||||||||||
export const getPaymentAccount = async (dispatch) => {
  try {
    const res = await fetch(`${PAYMENT_ACCOUNT}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch payment account");
    }

    const data = await res.json();
    dispatch({
      type: "SET_ACCOUNTS",
      payload: data,
    });

    return data;
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ type: "SET_LOADING", payload: false }); // 👈 always runs
  }
};
// WITHDRAW MONEY FROM BALANCE TO IBAN |||||||||||||||||||||
export const withdraw = async (userDetails, dispatch) => {
  const {
    iban,
    firstName,
    lastName,
    amount,
    savePaymentAccount,
    setDefaultPaymentAccount,
    setPaymentAccountName,
  } = userDetails;
  const dataFetch = {
    iban: iban,
    firstName: firstName,
    lastName: lastName,
    amount: amount,
    savePaymentAccount: savePaymentAccount,
    setDefaultPaymentAccount: setDefaultPaymentAccount,
    paymentAccountName: setPaymentAccountName,
  };
  dispatch({
    type: "SET_PENDING_TRANSACTION",
    payload: {
      amount: userDetails.amount,
      time: new Date().toISOString(),
    },
  });
  dispatch({ type: "SET_WITHDRAWING", payload: true });

  try {
    const res = await fetch(`${WITHDRAW}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(dataFetch),
    });

    if (!res.ok) throw new Error(res.status);
    console.log(res);
    dispatch({
      type: "SET_TOAST",
      payload: {
        message: "თანხის გატანა წარმატებით დასრულდა!",
        type: "success",
      },
    });
    queryClient.invalidateQueries({ queryKey: ["transactions"] }); // 👈 refetch transactions
    queryClient.invalidateQueries({ queryKey: ["driverInfo"] });
  } catch (err) {
    console.error(err);
    dispatch({
      type: "SET_TOAST",
      payload: {
        message: "შეცდომა, შეამოწმეთ დეტალები და სცადეთ თავიდან",
        type: "error",
      },
    });
  } finally {
    dispatch({ type: "SET_WITHDRAWING", payload: false });
    setTimeout(() => dispatch({ type: "SET_TOAST", payload: null }), 5000);
    dispatch({ type: "SET_PENDING_TRANSACTION", payload: null });
  }
};

// GET TRANSACTION HYSTORY |||||||||||||||||\
export const getTransactions = async (take, skip, token, dispatch) => {
  dispatch({ type: "SET_TRANSACTIONS_LOADING", payload: true });
  try {
    const res = await fetch(`${TRANSACTIONS}?take=${take}&skip=${skip}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch transactions");

    const data = await res.json();
    dispatch({ type: "SET_TRANSACTIONS", payload: data });
    return data;
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ type: "SET_TRANSACTIONS_LOADING", payload: false });
  }
};
