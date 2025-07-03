import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// redux-slice-auth-login
import { IRegister } from '@types/auth'
import { registerUser } from '@features/users/users.slice'

const Register = () => {
    const navigate = useNavigate()
    const [registerError, setRegisterError] = useState<string | null>(null)
    const [credentials, setCredentials] = useState<IRegister>({
        username: '',
        email: '',
        password: '',
        role_id: import.meta.env.VITE_LOCAL_ROLE,
        typeAuth: import.meta.env.VITE_LOCAL_TYPE_AUTH,
    })
    const dispatch = useDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            await dispatch(registerUser(credentials)).unwrap()
            navigate('/login')
        } catch (error) {
            setRegisterError(error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] w-screen">
            {/* error message alert */}
            {registerError && (
                <div className="bg-red-500 border border-red-600 opacity-75 text-white p-2 rounded mb-4 w-96 text-center">
                    {registerError}
                </div>
            )}
            {/* login form */}
            <div className="bg-white p-6 border border-gray-300 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <form
                    className="flex flex-col space-y-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={credentials.username}
                        onInput={handleChange}
                        autoComplete="off"
                        autoFocus
                        className="border border-gray-300 p-2 rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onInput={handleChange}
                        autoComplete="off"
                        className="border border-gray-300 p-2 rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onInput={handleChange}
                        autoComplete="off"
                        className="border border-gray-300 p-2 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register
