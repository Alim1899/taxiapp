const accounts = [
  {
    id: 1,
    fullName: "Alim Akhchanogli",
    iban: "GE29NB0000000101904917",
    favourite: false,
  },
  {
    id: 2,
    fullName: "Jumber Tkabladze",
    iban: "GE33BG0000000602842703",
    favourite: true,
  },
];

const sortedAccounts = [...accounts].sort(
  (a, b) => Number(b.favourite) - Number(a.favourite)
);

const defaultAccount =
  sortedAccounts.length === 1
    ? sortedAccounts[0]
    : sortedAccounts.find((item) => item.favourite) ||
      null;

const initialState = {
  accounts: sortedAccounts,
  selectedAccount: defaultAccount,
  amount: 0,
};

const UserReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "SET_ACCOUNTS": {
      const sortedAccounts = [
        ...action.payload,
      ].sort(
        (a, b) =>
          Number(b.favourite) -
          Number(a.favourite)
      );

      const defaultAccount =
        sortedAccounts.length === 1
          ? sortedAccounts[0]
          : sortedAccounts.find(
              (item) => item.favourite
            ) || null;

      return {
        ...state,
        accounts: sortedAccounts,
        selectedAccount: defaultAccount,
      };
    }

    case "SET_ACCOUNT":
      return {
        ...state,
        selectedAccount: action.payload,
      };

    case "SET_AMOUNT":
      return {
        ...state,
        amount: action.payload,
      };

    default:
      return state;
  }
};

export { initialState };
export default UserReducer;