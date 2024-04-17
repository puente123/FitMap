//allows moongodb to have schemas
//mongodb alone is schemeless
const mongoose = require('mongoose')

//function to create new schema
const Schema = mongoose.Schema


//sets the requirements when updating/inserting workout
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

