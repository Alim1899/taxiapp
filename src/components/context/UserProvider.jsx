import { useReducer } from "react";
import PropTypes from "prop-types";
import userReducer, { initialState } from "./userReducer"; // Ensure this is correct
import UserContext from "./UserContext"; // Import from the new file

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
