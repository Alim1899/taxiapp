import { NUMBER, CODE, TOKEN, PARKID } from "./constants";

export const onSubmit = (data, dispatch) => {
  dispatch({ type: "SPINNER_CHECK", payload: true });
  if (!data) return;
  const number = data.number.replace(/\s/g, "");
  checkNumber(number, dispatch);
};
export const checkLogin = async (number, code, dispatch) => {
  try {
    const res = await fetch(`${CODE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        phoneNumber: String(number), // ensure string
        parkId: String(PARKID),
        code: String(code),
        roleId: 0,
      }),
    });

    if (!res.ok) throw new Error(res.status);

    const data = await res.json();
    const token = data.access_token;

    if (token && token.length > 0) {
      sessionStorage.setItem("token", token);
      dispatch({
        type: "CODE_CHECK",
        payload: { correctCode: true, token },
      });
    } else {
      dispatch({
        type: "CODE_CHECK",
        payload: { correctCode: false, token: null },
      });
    }
  } catch (err) {
    console.error("Login error:", err.message);
  }
};

// WORKS|||||||||||||||||||||||||||||||||||||||||||||||||||||||||

const checkNumber = async (number, dispatch) => {
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
      dispatch({ type: "SPINNER_CHECK", payload: false });
      if (typeof data === "number") {
        dispatch({ type: "NUMBER_CHECK", payload: true });
        dispatch({ type: "CORRECT_NUMBER", payload: `+995${number}` });
        dispatch({ type: "CODE_ARRIVED", payload: data });
      }
      if (data.statusCode === 500)
        dispatch({ type: "USER_CHECK", payload: true });
    })
    .catch((err) => console.error(err.statusCode));
};
