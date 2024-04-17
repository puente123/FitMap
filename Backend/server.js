require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts.js')

//express app
const app = express()

//middlewear
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(workoutRoutes)

//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
}) 
