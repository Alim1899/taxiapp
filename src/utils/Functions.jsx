import { URL, TOKEN, PARKID } from "./constants";

export const onSubmit = (
  data,
  setUserNotFound,
  setShowSpinner,
  setCorrectNumber,
  dispatch
) => {
  setShowSpinner(true);
  if (!data) return;
  const number = data.number.replace(/\s/g, "");
  getData(number, setUserNotFound, setShowSpinner, setCorrectNumber, dispatch);
};

const getData = async (
  number,
  setUserNotFound,
  setShowSpinner,
  setCorrectNumber,
  dispatch
) => {
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
      setShowSpinner(false);
      if (typeof data === "number") {
        setCorrectNumber(true);
        dispatch({ type: "NUMBER_CHECK", payload: true });
        dispatch({ type: "CODE_ARRIVED", payload: data });
      } else console.log("pppp");
      if (data.statusCode === 500) setUserNotFound(true);
    })
    .catch((err) => console.error(err.statusCode));
};
