import { URL, TOKEN, PARKID } from "./constants";

export const onSubmit = (data, dispatch) => {
  dispatch({ type: "SPINNER_CHECK", payload: true });
  if (!data) return;
  const number = data.number.replace(/\s/g, "");
  getData(number, dispatch);
};

const getData = async (number, dispatch) => {
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
      dispatch({ type: "SPINNER_CHECK", payload: false });
      if (typeof data === "number") {
        dispatch({ type: "NUMBER_CHECK", payload: true });
        dispatch({ type: "CODE_ARRIVED", payload: data });
      }
      if (data.statusCode === 500)
        dispatch({ type: "USER_CHECK", payload: true });
    })
    .catch((err) => console.error(err.statusCode));
};
