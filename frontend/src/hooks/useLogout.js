import useAuthContext from "./useAuthorizationContext";
import { useWorkoutsContext } from "./useWorkoutsContext";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { updateAuth } = useAuthContext();
  const { updateWorkouts } = useWorkoutsContext();
  const navigate = useNavigate()

  const logout = () => {
    updateAuth({ type: "LOGOUT" });
    updateWorkouts({type: "SET_WORKOUTS", payload: []})
    localStorage.removeItem("user");
    navigate("/")
  };

  return { logout };
};

export { useLogout };
