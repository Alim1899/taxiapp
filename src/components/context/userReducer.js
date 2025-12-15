const storedToken = sessionStorage.getItem("token");
const STEPS = {
  ENTER_NUMBER: "enter_number",
  CHECKING_NUMBER: "checking_number",
  ENTER_CODE: "enter_code",
  CHECKING_CODE: "checking_code",
  AUTHORIZED: "authorized",
};
const initialState = {
  step: storedToken ? STEPS.AUTHORIZED : STEPS.ENTER_NUMBER,
  isCheckingCode: false,
  token: storedToken,
  userNumber: "",
  arrivedCode: "",
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECKING_NUMBER":
      return {
        ...state,
        step: STEPS.CHECKING_NUMBER,
        error: null,
      };
    case "NUMBER_SUCCESS":
      return {
        ...state,
        step: STEPS.ENTER_CODE,
        userNumber: action.payload.userNumber,
        arrivedCode: action.payload.arrivedCode,
        error: null,
      };
    case "WRONG_NUMBER":
      return {
        ...state,
        step: STEPS.ENTER_NUMBER,
        userNumber: "",
        error: "number",
      };

    case "CHECKING_CODE":
      return {
        ...state,
        isCheckingCode: true,
        error: null,
      };
    case "WRONG_CODE":
      return {
        ...state,
        isCheckingCode: false,
        error: "code",
      };
    case "CODE_SUCCESS":
      return {
        ...state,
        step: STEPS.AUTHORIZED,
        isCheckingCode: false,
        token: action.payload,
        error: null,
      };
    case "CODE_ERROR":
      return {
        ...state,
        step: STEPS.ENTER_CODE,
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
        step: STEPS.ENTER_NUMBER,
        token: null,
        userNumber: "",
        arrivedCode: "",
        error: null,
      };
    case "ERROR_RESET":
      return {
        ...state,
        error: null,
      };
    case "BACK":
      return {
        ...state,
        error: null,
        arrivedCode: "",
        step: STEPS.ENTER_NUMBER,
      };

    default:
      return state;
  }
};

export { initialState };
export default userReducer;
