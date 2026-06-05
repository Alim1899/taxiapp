const initialState = {
  accounts: [],
  selectedAccount: {},
  amount: 0,
  userDetails: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case "SET_ACCOUNTS": {
      const defaultAccount =
        action.payload.find(
          (item) => item.default
        ) || action.payload[0] || {};

      return {
        ...state,
        accounts: action.payload,
        selectedAccount: defaultAccount,
      };
    }
    case "SET_ACCOUNT":
      return {
        ...state,
        selectedAccount: action.payload,
        amount:0
      };


    case "SET_USER_DETAILS":
      return {
        ...state,
        userDetails: action.payload,
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
export default userReducer;
