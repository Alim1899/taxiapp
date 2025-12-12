const initialState = {
  correctNumber: false,
  userNotFound: false,
  showSpinner: false,
  arrivedCode: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NUMBER_CHECK":
      return {
        ...state,
        correctNumber: action.payload,
      };
    case "USER_CHECK":
      return {
        ...state,
        userNotFound: action.payload,
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
