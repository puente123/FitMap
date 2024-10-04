import axios from "axios";

//const workoutAPIurl = "http://localhost:4000/api/workouts";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/api/workouts",
});

const handleRequest = async (request, errorMessage) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error(errorMessage, error);
    throw error
  }
};

const getWorkout = (id) => {
  const errorMessage = `Error in getWorkout function in front end, ID: ${id}`;

  const resturn = handleRequest(() => apiClient.get(`/${id}`), errorMessage);
  console.log(resturn)
};

const getWorkouts = () => {
  const errorMessage = `Error in getWorkouts function in front end`;
  return handleRequest(() => apiClient.get('/'), errorMessage);
};

const createWorkout = (body) => {
  const errorMessage = `Error in createWorkout function in front end`;
  return handleRequest(() => apiClient.post('/', body), errorMessage);
};

const deleteWorkout = (id) => {
  const errorMessage = `Error in deleteWorkout function in front end, ID: ${id}`;
  return handleRequest(() => apiClient.delete(`/${id}`), errorMessage);
};

const updateWorkout = (id, body) => {
  const errorMessage = `Error in updateWorkout function in front end, ID: ${id}`;
  return handleRequest(() => apiClient.put(`/${id}`, body), errorMessage);
};

export { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout };
