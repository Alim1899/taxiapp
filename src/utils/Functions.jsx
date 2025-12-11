import { URL, TOKEN, PARKID } from "./constants";

export const onSubmit = (data, setUserNotFound, setShowSpinner) => {
  console.log(data);
  setShowSpinner(true);
  if (!data) return;
  const number = data.number.replace(/\s/g, "");
  getData(number, setUserNotFound, setShowSpinner);
};

const getData = async (number, setUserNotFound, setShowSpinner) => {
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
      console.log(data);
      if (data.statusCode === 500) setUserNotFound(true);
    })
    .catch((err) => console.error(err.statusCode));
};
