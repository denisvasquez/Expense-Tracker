import axios from 'axios'

// interfaces
import { ILogin, IRegister } from '@types/auth'

const useAuth = () => {
    const register = async (credentials: IRegister) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,
            JSON.stringify(credentials), {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return response
    }

    return {
        register,
    }
}

export default useAuth
