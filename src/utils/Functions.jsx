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
const pollTransactionStatus = async (maxAttempts = 30, intervalMs = 2000) => {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((resolve) => setTimeout(resolve, intervalMs));

    const res = await fetch(`${TRANSACTIONS}?take=1&skip=0`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!res.ok) continue;

    const data = await res.json();
    const latest = data?.data?.[0];

    if (!latest) continue;
    if (latest.statusId === 5) return "success";
    if (latest.statusId === 6) return "failed";
    // still pending, continue polling
  }

  return "timeout";
};
export const withdraw = async (userDetails, dispatch) => {
  const dataFetch = {
    iban: userDetails.iban,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    amount: userDetails.amount,
    savePaymentAccount: userDetails.savePaymentAccount,
    setDefaultPaymentAccount: userDetails.setDefaultPaymentAccount,
    paymentAccountName: userDetails.setPaymentAccountName,
  };

  try {
    const res = await fetch(`${WITHDRAW}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(dataFetch),
    });

    if (!res.ok) {
      if (res.status === 409) {
        dispatch({
          type: "SET_TOAST",
          payload: {
            message: "გატანა უკვე მიმდინარეობს, გთხოვთ მოიცადოთ",
            type: "error",
          },
        });
      } else if (res.status === 422) {
        dispatch({
          type: "SET_TOAST",
          payload: {
            message:
              "ბოლო გატანიდან უნდა გავიდეს მინიმუმ 1 საათი, გთხოვთ მოიცადოთ",
            type: "error",
          },
        });
        return;
      }
      throw new Error(res.status);
    }

    // request accepted — now show pending state
    dispatch({ type: "SET_WITHDRAWING", payload: true });
    dispatch({
      type: "SET_PENDING_TRANSACTION",
      payload: { amount: userDetails.amount, time: new Date().toISOString() },
    });
    queryClient.invalidateQueries({ queryKey: ["transactions"] });

    // poll until resolved
    const status = await pollTransactionStatus();
    console.log(status);
    if (status === "success") {
      dispatch({
        type: "SET_TOAST",
        payload: {
          message: "თანხის გატანა წარმატებით დასრულდა!",
          type: "success",
        },
      });
    } else if (status === "failed") {
      dispatch({
        type: "SET_TOAST",
        payload: { message: "თანხის გატანა ვერ შესრულდა", type: "error" },
      });
    }

    queryClient.invalidateQueries({ queryKey: ["transactions"] });
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
    dispatch({ type: "SET_PENDING_TRANSACTION", payload: null });
    setTimeout(() => dispatch({ type: "SET_TOAST", payload: null }), 5000);
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
