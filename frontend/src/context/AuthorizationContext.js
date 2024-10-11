import { createContext, useReducer } from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };

    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, updateAuth] = useReducer(authReducer, {
    user: null,
  });

  console.log("AuthContext State Change:", state);

  return (
    <AuthContext.Provider value={{ ...state, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
