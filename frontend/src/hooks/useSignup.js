import { useState } from 'react';
import { useAuthContext } from './useAuthorizationContext'

import { postSignup } from '../service/userService';


const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)



    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await postSignup({email, password})
    }   
}

export default useSignup

