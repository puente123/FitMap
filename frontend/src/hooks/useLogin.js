import { useState } from "react";
import useAuthContext from "./useAuthorizationContext";
import { postLogin } from "../service/userService";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { state, updateAuth } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    try{
        const response = await postLogin({email, password})
        console.log(response)
        const json = response.data
        updateAuth({type: "LOGIN", payload: json})
        localStorage.setItem("user", JSON.stringify(json))
        setError(null)
        setIsLoading(false)
    }   
    catch(error){
        //Check if specific errors exist
        setError(error.response.data.error)
        setIsLoading(false)
    }
  }

  return { login, isLoading, error };
};

export { useLogin };
