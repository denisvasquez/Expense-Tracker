import { ReactNode } from 'react';

// components
import Navbar from '@components/Navbar';

interface ILayout {
    children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
    return (
        <>
            <Navbar />
            <div className='absolute top-[4rem]'>{children}</div>
        </>
    )
}

export default Layout;