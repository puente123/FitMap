import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/api/user",
});

const postSignup = async (body) => {
  try {
    const response = apiClient.post("/signup", body);
    return response;
  } catch (error) {
    console.error("Error in posting Signup call from frontend", {
      error: error.message,
    });
    //throw error;
  }
};

const postLogin = async (body) => {
  try {
    const response = apiClient.post("/login", body);
    return response;
  } catch (error) {
    console.error({ error: error.message });
    // throw error;
  }
};

export { postLogin, postSignup };
