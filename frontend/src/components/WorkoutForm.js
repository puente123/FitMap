import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import {  createWorkout } from "../service/workoutService"

const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext()
   
    const[title, setTitle] = useState('')
    const[load, setLoad] = useState('')
    const[reps, setReps] = useState('')
    const[error, setError] = useState(null)
    const[emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, load, reps}

        try{
            const json = await createWorkout(workout)

            //const json = await response.json()
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('New Workout Added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})  
            
        }
        catch(error){
            //setError(json.error)
            //setEmptyFields(json.emptyFields)
            console.error("Error in createWorkout", error)
            throw error
        }
    }

    return(
       <form className = "create" onSubmit={handleSubmit}>

        
        <h3>Add a New Workout</h3>

        <label>Excersize Title:</label>
        <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : '' }
        />

        <label>Load (kg):</label>
        <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes('load') ? 'error' : '' }
        />

        <label>Reps:</label>
        <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes('reps') ? 'error' : '' }
        />

       
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}

       </form> 
    )
}

export default WorkoutForm