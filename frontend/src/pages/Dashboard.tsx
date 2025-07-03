import { Link } from "react-router-dom"

// components
import TableModules from "@components/TableModules"

// pages
import AddModule from "@pages/modules/AddModules"

const Home = () => {
    return (
        <div className="container mx-auto px-10 pt-5 h-full">
            {window.location.pathname === '/dashboard' && (
                <>
                    <div className="flex justify-end">
                        <Link to="/add-module" className="text-blue-600 hover:cursor-pointer hover:text-blue-500">+ Create new module</Link>
                    </div>
                    <TableModules />
                </>
            )}
            {window.location.pathname === '/add-module' && (
                <AddModule />
            )}
        </div>
    )
}

export default Home