import AuthContextProvider from "../context/AuthorizationContext";
import { useContext } from "react";

const useAuthContext = () => {
  const context = useContext(AuthContextProvider);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context
};

export default useAuthContext;
