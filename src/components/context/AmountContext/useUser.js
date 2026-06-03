import { useContext } from "react";
import UserContext from "./UserContext"; // Adjust the path if needed

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a userProvider");
  }
  return context;
};

export default useUser;
