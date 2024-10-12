import { useState } from "react";
import useAuthContext from "./useAuthorizationContext";

import { postSignup } from "../service/userService";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { updateAuth } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await postSignup({ email, password });
      const json = response.data;
      console.log(response);
      console.log(response);

      if (response.status != 200) {
        setIsLoading(false);
        setError(json.error);
      } else {
        //Save the user to lcoal storage
        localStorage.setItem("user", JSON.stringify(json));
        console.log(json);
        updateAuth({ type: "LOGIN", payload: json });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      //Sets to the response error (remember this)
      console.log(error.response.data.error);
      // other way is error.message
      setError(error.response.data.error);
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
