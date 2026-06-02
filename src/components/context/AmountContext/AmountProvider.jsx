import { useReducer } from "react";
import PropTypes from "prop-types";
import amountReducer, { initialState } from "./amountReducer"; // Ensure this is correct
import AmountContext from "./AmountContext"; // Import from the new file

const AmountProvider = ({ children }) => {
  const [state, dispatch] = useReducer(amountReducer, initialState);

  return (
    <AmountContext.Provider value={{ state, dispatch }}>
      {children}
    </AmountContext.Provider>
  );
};

AmountProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AmountProvider;
