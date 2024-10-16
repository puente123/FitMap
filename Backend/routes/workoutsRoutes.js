const express = require("express");

//Imports methods created in /backend/controllers/workoutcontroller to create routes
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const requireAuth = require('../middleware/requireAuth')

//creates a router instance
const router = express.Router();

//Require authorization for all workout routes
router.use(requireAuth)

//GET all workouts , calls the function made in workoutController.js for each
router.get("/", getWorkouts);

//GET a single workout
//id is a dynamic parameter
router.get("/:id", getWorkout);

//POST a new workout
router.post("/", createWorkout);

//DELETE a workout
router.delete("/:id", deleteWorkout);

//UPDATE a workout PUT/PATCH
router.patch("/:id", updateWorkout);

//exports router so other files can use it
module.exports = router;
