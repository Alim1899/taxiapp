import { useContext } from "react";
import AmountContext from "./AmountContext"; // Adjust the path if needed

const useAmount = () => {
  const context = useContext(AmountContext);
  if (!context) {
    throw new Error("useAmount must be used within a AmountProvider");
  }
  return context;
};

export default useAmount;
