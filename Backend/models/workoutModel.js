//Allows moongodb to have schemas
//Mongodb alone is schemeless
const mongoose = require('mongoose')

//Function to create new schema
const Schema = mongoose.Schema

//Sets the requirements when updating/inserting workout
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)

