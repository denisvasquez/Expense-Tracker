import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// types
import { ILogin } from '@types/auth'

// hooks
import useAuth from '@hooks/useAuth'

const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState<ILogin>({
        username: '',
        password: '',
    })
    const [loginError, setLoginError] = useState<string | null>(null)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()

        const { name, value } = event.target

        setCredentials(current => ({
            ...current,
            [name]: value,
        }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const response = await login(credentials)
            localStorage.setItem('token', response.data.body.token)
            localStorage.setItem(
                'user',
                JSON.stringify(response.data.body.user),
            )
            navigate('/dashboard')
        } catch (error) {
            setLoginError(error.response.data.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] w-screen">
            {/* error message alert */}
            {loginError && (
                <div className="bg-red-500 border border-red-600 opacity-75 text-white p-2 rounded mb-4 w-96 text-center">
                    {loginError}
                </div>
            )}
            {/* login form */}
            <div className="bg-white p-6 border border-gray-300 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form
                    className="flex flex-col space-y-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onInput={handleInputChange}
                        placeholder="Username"
                        autoComplete="off"
                        className="border border-gray-300 p-2 rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onInput={handleInputChange}
                        placeholder="Password"
                        autoComplete="off"
                        className="border border-gray-300 p-2 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-500">
                        Register
                    </a>
                </p>
                <p className="mt-2 text-sm text-gray-600">
                    Forgot your password?{' '}
                    <a href="/reset-password" className="text-blue-500">
                        Reset it
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login
