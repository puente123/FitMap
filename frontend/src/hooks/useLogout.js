import useAuthContext from "./useAuthorizationContext";

const useLogout = () => {
  const { updateAuth } = useAuthContext();

  const logout = () => {
    updateAuth({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  return { logout };
};

export { useLogout };
