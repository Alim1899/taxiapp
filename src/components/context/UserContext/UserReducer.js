const initialState = {
  isLoading: false,
  accounts: [],
  selectedAccount: {},
  amount: "",
  isSaving: false,
  isDefault: false,
  paymentAccountName: "",
  isWithdrawing: false,
  withdrawStatus: null,
  toast: null,
  pendingTransaction: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACCOUNTS": {
      const defaultAccount = action.payload.find((item) => item.default) || {}; // || action.payload[0] თუ გვინდა პირველი ანგგარიში მოინიშნოს დეფოლტად

      return {
        ...state,
        accounts: action.payload,
        selectedAccount: defaultAccount,
      };
    }
    case "SET_PENDING_TRANSACTION":
      return { ...state, pendingTransaction: action.payload };
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
    case "SET_PAYMENT_ACCOUNT_NAME":
      return { ...state, paymentAccountName: action.payload };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_WITHDRAWING":
      return { ...state, isWithdrawing: action.payload };
    case "SET_TOAST":
      return { ...state, toast: action.payload };
    case "SET_WITHDRAW_STATUS":
      return { ...state, withdrawStatus: action.payload };
    case "RESET_PAYMENT_ACCOUNT_NAME":
      return { ...state, paymentAccountName: state.payload };
    default:
      return state;
  }
};

export { initialState };
export default userReducer;
