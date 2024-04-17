const express = require('express')
const Workout = require('../models/workoutModel')
const {
    getWorkouts,
    getWorkout,
    createWorkout,
} = require('../controllers/workoutController')

//creates a router instance
const router = express.Router()

//GET all workouts
router.get('/', (req, res) => {
    res.json({mssg: 'GET all workouts'})
})

//GET a single workout
//id is a dynamic parameter
router.get('/:id', (req, res) => {
    res.json({mssg: 'Get single workout'})
})

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({mssg: 'Delete a workout'})
})

//UPDATE a workout PUT/PATCH
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE/PATCH a workout'})
})



//exports router so other files can use it
module.exports = router

