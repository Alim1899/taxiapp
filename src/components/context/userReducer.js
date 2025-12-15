const storedToken = sessionStorage.getItem("token");
const initialState = {
  step: storedToken ? "authorized" : "enter_number",
  token: null,
  userNumber: "",
  arrivedCode: "",
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECKING_NUMBER":
      return {
        ...state,
        step: "checking_number",
        error: null,
      };
    case "NUMBER_SUCCESS":
      return {
        ...state,
        step: "enter_code",
        userNumber: action.payload.userNumber,
        arrivedCode: action.payload.arrivedCode,
        error: null,
      };
    case "WRONG_NUMBER":
      return {
        ...state,
        step: "enter_number",
        userNumber: "",
        error: "number",
      };

    case "CHECKING_CODE":
      return {
        ...state,
        step: "checking_code",
        error: null,
      };
    case "CODE_SUCCESS":
      return {
        ...state,
        step: "authorized",
        token: action.payload,
        error: null,
      };
    case "CODE_ERROR":
      return {
        ...state,
        step: "enter_code",
        arrivedCode: "",
        error: "code",
      };
    case "CODE_TIMEOUT":
      return {
        ...state,
        arrivedCode: "",
        error: "code_expired",
      };
    case "LOG_OUT":
      return {
        step: "enter_number",
        token: null,
        userNumber: "",
        arrivedCode: "",
        error: null,
      };
    case "BACK":
      return {
        ...state,
        error: null,
        arrivedCode: "",
        step: "enter_number",
      };

    default:
      return state;
  }
};

export { initialState };
export default userReducer;
