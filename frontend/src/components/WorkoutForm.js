import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { createWorkout } from "../service/workoutService";
import useAuthContext from "../hooks/useAuthorizationContext";

const WorkoutForm = () => {
  const { updateWorkouts } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You Must Be Logged In");
      return;
    }

    //if (title && load && reps) {
    const workout = { title, load, reps };

    try {
      const json = await createWorkout(workout, user.token);
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("New Workout Added", json);
      updateWorkouts({ type: "CREATE_WORKOUT", payload: json });
    } catch (error) {
      setEmptyFields(error.response.data.emptyFields);
      setError("Please fill in all fields");
      console.error("Error in createWorkout", error);
      //throw error;
    }
    /* } else {
      const emptyFieldsArray = [];
      if (!title) emptyFieldsArray.push("title");
      if (!load) emptyFieldsArray.push("load");
      if (!reps) emptyFieldsArray.push("reps");
      setEmptyFields(emptyFieldsArray);
      setError("Please fill in all fields");
    } */
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Load (kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
