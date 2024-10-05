import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { deleteWorkout } from "../service/workoutService"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {

    const {dispatch} = useWorkoutsContext()

    //Creats method to control delete button
    const handleClick = async () => {

        try{
            const json = await deleteWorkout(workout._id)
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
        catch(error){
            console.error("Error in handleDeleteClick in frontend, when calling deleteWorkout", error);
        }     
        
    }

    return(
        <div className = "workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>  
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>      
        </div>
    )
}


export default WorkoutDetails

//This file creates a output to the website based on the workout that is passed