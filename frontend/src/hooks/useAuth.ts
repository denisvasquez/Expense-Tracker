import axios from 'axios'

// interfaces
import { ILogin } from '@types/auth'

const useAuth = () => {
    const login = async (credentials: ILogin) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,
            JSON.stringify(credentials), {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return response
    }

    return {
        login,
    }
}

export default useAuth
