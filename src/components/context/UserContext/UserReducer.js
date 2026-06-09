const initialState = {
  isLoading: false,
  accounts: [],
  transactions: [],
  selectedAccount: {},
  amount: "",
  userDetails: {},
  isSaving: false,
  isDefault: false,
  transactionLoading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACCOUNTS": {
      const defaultAccount =
        action.payload.find((item) => item.default) || action.payload[0] || {};

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
    case "SET_DEFAULT":
      return {
        ...state,
        isDefault: action.payload,
      };
    case "SET_SAVING":
      return {
        ...state,
        isSaving: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload,
      };
    case "SET_TRANSACTIONS_LOADING":
      return { ...state, transactionLoading: action.payload };
    default:
      return state;
  }
};

export { initialState };
export default userReducer;
