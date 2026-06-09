import {
  CHECK_NUMBER,
  CHECK_CODE,
  TOKEN,
  PARKID,
  DRIVER_INFO,
  PAYMENT_ACCOUNT,
  WITHDRAW,
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
    .then((res) => res.json())
    .then((data) => {
      if (typeof data === "number") {
        dispatch({
          type: "NUMBER_SUCCESS",
          payload: {
            userNumber: `+995${number}`,
            arrivedCode: data,
          },
        });
      } else if (data.statusCode === 500) {
        dispatch({ type: "WRONG_NUMBER" });
      }
    })
    .catch((err) => console.error(err.statusCode));
};

//  GET DRIVER NAME LASTNAME AND BALANCE  |||||||||||||||||||||
export const getDriverInfo = async (dispatch,token) => {
  try {
    const res = await fetch(`${DRIVER_INFO}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch driver info");
    }

    const data = await res.json();
    dispatch({
      type: "SET_USER_DETAILS",
      payload: data,
    });

    return data;
  } catch (err) {
    console.error(err);
  }
};

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

export const withdraw = async (userDetails) => {
  try {
    const res = await fetch(`${WITHDRAW}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(userDetails),
    });

    if (!res.ok) throw new Error(res.status);

  } catch (err) {
    console.error(err, "Something went wrong");
  }
};
