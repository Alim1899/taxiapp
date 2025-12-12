const initialState = {
  correctNumber: false,
  userNotFound: false,
  showSpinner: false,
  userAuthorized: false,
  correctCode: true,
  token: "",
  userNumber: "",
  arrivedCode: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NUMBER_CHECK":
      return {
        ...state,
        correctNumber: action.payload,
      };
    case "CODE_CHECK":
      return {
        ...state,
        correctCode: action.payload.correctCode,
        userAuthorized: action.payload.correctCode === true,
        token: action.payload.token || null,
      };
    case "LOG_OUT":
      return {
        state: initialState,
        userAuthorized: action.payload,
      };
    case "LOG_IN":
      return {
        ...state,
        userAuthorized: action.payload,
      };
    case "CORRECT_CODE":
      return {
        ...state,
        userAuthorized: action.payload,
      };
    case "USER_CHECK":
      return {
        ...state,
        userNotFound: action.payload,
      };
    case "CORRECT_NUMBER":
      return {
        ...state,
        userNumber: action.payload,
      };
    case "SPINNER_CHECK":
      return {
        ...state,
        showSpinner: action.payload,
      };

    case "CODE_ARRIVED":
      return {
        ...state,
        arrivedCode: action.payload,
      };

    default:
      return state;
  }
};

export { initialState };
export default userReducer;
