//Imports workoutModel, whichis the required format a workout needs to be in
const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//Create a seperate controller file/folder to not make route code to messy

//CREATE FUNCTIONS to be called in routes

//Get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

//Get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  //Checks if the id that was passed is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

//Create a new workout
const createWorkout = async (req, res) => {
  const user_id = req.user._id;
  const { title, load, reps } = req.body;

  //Checks if field is empty on creating input
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  //if any field is emtpy
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete a workout
const deleteWorkout = async (req, res) => {
  //Gets id that was passed
  const { id } = req.params;

  //Checks if the id that was passed is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  //Mongodb used _id so it checks if id is eqal to _id
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

//Update a workout
const updateWorkout = async (req, res) => {
  //gets id that was passed
  const { id } = req.params;

  //Checks if the id that was passed is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      //Gets the request body the ... spreads them
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

//Exports the functions
module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
