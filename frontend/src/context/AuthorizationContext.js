import { createContext, useReducer, useEffect } from "react";

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if(user){
      updateAuth({type:"LOGIN", payload: user})
    }
  }, [])

  console.log("AuthContext State Change:", state);

  return (
    <AuthContext.Provider value={{ ...state, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
