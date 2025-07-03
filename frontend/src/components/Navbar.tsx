import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import config from '../config'

// context
import useGlobalState from '@hooks/useGlobalState'

// interfaces
import { INavLinks } from '@types/config'

const Navbar = () => {
    const [navLinks, setNavLinks] = useState<INavLinks[]>([])
    const { state } = useGlobalState()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login', { replace: true })
    }

    useEffect(() => {
        const navLinks = config.navLinks.filter(link => link.component === 'Navbar' && window.location.pathname !== link.path)
        setNavLinks(navLinks)
    }, [window.location.pathname])

    return (
        <nav className="fixed w-full h-[4rem] bg-white border-b border-t border-gray-300">
            <div className="container h-full mx-auto flex justify-between items-center">
                <div className="text-gray-900 text-lg font-bold">My App</div>
                <div className="space-x-4">
                    {!state.user &&
                        navLinks
                            .filter(link => link.auth === false)
                            .map(link => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-gray-900 hover:text-gray-700"
                                >
                                    {link.name}
                                </Link>
                            ))}
                    {state.user &&
                        navLinks
                            .filter(link => link.auth === true)
                            .map(link => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-gray-900 hover:text-gray-700"
                                >
                                    {link.name}
                                </Link>
                            ))}
                    {state.user && (
                        <button
                            onClick={logout}
                            className="text-gray-900 hover:text-gray-700 cursor-pointer"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
