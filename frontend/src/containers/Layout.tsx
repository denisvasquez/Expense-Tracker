import { ReactNode, useState } from 'react'

// components
import Navbar from '@components/Navbar'
import Sidebar from '@components/Sidebar'

interface ILayout {
    children: ReactNode
}

const Layout = ({ children }: ILayout) => {
    return (
        <>
            <Navbar />
            <div className="flex absolute top-[4rem] w-full">
                <Sidebar />
                <div className='w-full transition-all duration-300'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout
