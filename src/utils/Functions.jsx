import { NUMBER, CODE, TOKEN, PARKID } from "./Constants";

export const onSubmit = (data, dispatch) => {
  if (!data) return;
  const number = data.number.replace(/\s/g, "");
  checkNumber(number, dispatch);
};

// |||||||||   CHECK ARRIVED CODE
export const checkLogin = async (number, code, dispatch) => {
  dispatch({ type: "CHECKING_CODE" });
  try {
    const res = await fetch(`${CODE}`, {
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
      dispatch({ type: "CODE_ERROR" });
      return;
    }

    sessionStorage.setItem("token", token);

    dispatch({
      type: "CODE_SUCCESS",
      payload: token,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    dispatch({ type: "CODE_ERROR" });
  }
};

// CHECK NUMBER IS CORRET OR NOT |||||||||||||||||

export const checkNumber = async (number, dispatch) => {
  dispatch({ type: "CHECKING_NUMBER" });
  await fetch(`${NUMBER}`, {
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
