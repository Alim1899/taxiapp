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
  paymentAccountName: "",
  isWithdrawing: false,
  withdrawStatus: null,
  toast: null,
  pendingTransaction: null,
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
    case "SET_PAYMENT_ACCOUNT_NAME":
      return { ...state, paymentAccountName: action.payload };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_TRANSACTIONS": {
      const incoming = Array.isArray(action.payload)
        ? action.payload
        : (action.payload?.data ?? []);
      const existing = state.transactions.map((t) => t.id);
      const filtered = incoming.filter((t) => !existing.includes(t.id)); // 👈 no duplicates
      return {
        ...state,
        transactions: [...state.transactions, ...filtered],
      };
    }
    case "SET_WITHDRAWING":
      return { ...state, isWithdrawing: action.payload };
    case "SET_TOAST":
      return { ...state, toast: action.payload };
    case "SET_WITHDRAW_STATUS":
      return { ...state, withdrawStatus: action.payload };
    case "SET_TRANSACTIONS_LOADING":
      return { ...state, transactionLoading: action.payload };
    case "RESET_TRANSACTIONS":
      return { ...state, transactions: [] };
    case "RESET_PAYMENT_ACCOUNT_NAME":
      return { ...state, paymentAccountName: state.payload };
    default:
      return state;
  }
};

export { initialState };
export default userReducer;
