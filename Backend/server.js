require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts.js')

//express app
const app = express()


//Middlewear: functions that have acces to req and res 
//middlewear//USED FOR POST, PUT, allows to use json body data
app.use(express.json())

//middlewear
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)

//connect to database
mongoose.connect(process.env.MONGO_URI)

    //fires method when connection is complete
    .then(() => {
        //listen for requests//after inserting in then() it only listens for request after connecting to database
        app.listen(process.env.PORT, () => {
            console.log('connected to database and listening on port', process.env.PORT);
        }) 
    })

    //fires error if connection fails
    .catch((error) => {
        console.log(error)
    })

