import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect, use } from 'react'

import config from "../config";

// interfaces
import { INavLinks } from '@types/config'

// context
import useGlobalState from '@hooks/useGlobalState'

const Sidebar = () => {
    const { state } = useGlobalState()

    const [showSidebar, setShowSidebar] = useState<boolean>(true)
    const [navLinks, setNavLinks] = useState<INavLinks[]>([])

    const toggleSidebar = () => setShowSidebar(!showSidebar)

    useEffect(() => {
        const navLinks = config.navLinks.filter(link => link.component === 'Sidebar')
        setNavLinks(navLinks)
    }, [window.location.pathname])


    return (
        <>
            <div
                className={`
relative w-[25rem] h-[calc(100vh-4rem)] border-r border-gray-300 transition-all duration-300 ease-in-out 
bg-white ${showSidebar ? 'left-0' : '-left-[25rem]'}
                `}
            >
                <div className='block'>
                    {state.user &&
                        navLinks
                            .filter(link => link.auth === true)
                            .map(link => (
                                <div className='py-1'>
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className="block text-gray-900 hover:text-gray-500 w-full py-2 px-4"
                                    >
                                        {link.name}
                                    </Link>
                                </div>
                            ))}
                </div>
            </div>
        </>
    )
}

export default Sidebar
