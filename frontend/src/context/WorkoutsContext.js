//check this file

import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
    switch(action.type){
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return{
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                //Makes array and keeps each one that is not equal to the id
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }

}

export const WorkoutsContextProvider = ({ children }) => {

    const [state, updateWorkouts] = useReducer( workoutsReducer, {
        workouts: null
    })

    //updateWorkouts({type: 'SET_WORKOUTS', payload: [{}, {}]})

    return(
        <WorkoutsContext.Provider value={{...state, updateWorkouts}}>
            { children }
        </WorkoutsContext.Provider>
    )
}
