require('dotenv').config()

const express = require('express')
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

//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
}) 
