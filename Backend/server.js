require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

//Imports routes from Backend/routes/workout.js, wrote in seperate folder to simplify
const workoutRoutes = require('./routes/workoutsRoutes.js')
const cors = require('cors');



//express app
const app = express()

// Enable CORS for all route
app.use(cors());
//Middlewear: functions that have acces to req and res 
//Middlewear//USED FOR POST, PUT, allows to use json body data
app.use(express.json())

//Middlewear
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.use('/api/workouts', workoutRoutes)

//Connect to database
mongoose.connect(process.env.MONGO_URI)

    //Fires method when connection is complete
    .then(() => {
        //Listen for requests//after inserting in then() it only listens for request after connecting to database
        app.listen(process.env.PORT, () => {
            console.log('connected to database and listening on port', process.env.PORT);
        }) 
    })

    //Fires error if connection fails
    .catch((error) => {
        console.log(error)
    })

