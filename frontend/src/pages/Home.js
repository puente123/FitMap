import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { getWorkouts } from "../service/workoutService";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  //const [workouts, setWorkouts] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      /*const response = await fetch('/api/workouts')
            const json = await response.json() */
      try {
        const json = await getWorkouts();
        dispatch({ type: "SET_WORKOUTS", payload: json });
      } catch (error) {
        console.error("Failed to fetch workouts", error);
      }

      //setWorkouts(json)
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {/* cycles through workouts, but checks if workout exists
                {}: This is JSX syntax for embedding JavaScript expressions within JSX.*/}
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
