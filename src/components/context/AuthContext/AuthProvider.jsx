import { useReducer } from "react";
import PropTypes from "prop-types";
import authReducer, { initialState } from "./authReducer"; // Ensure this is correct
import AuthContext from "./AuthContext"; // Import from the new file

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
