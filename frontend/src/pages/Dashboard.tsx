import { Link } from "react-router-dom"

// containers
import ModulesTransactions from "@containers/ModulesTransactions"

// pages
import AddModule from "@pages/modules/AddModules"
import AddTransaction from "@pages/transactions/AddTransaction"

const Home = () => {
    return (
        <div className="container mx-auto px-10 pt-5 h-full">
            {window.location.pathname === '/dashboard' && (
                <>
                    <div className="flex justify-end">
                        <Link to="/add-module" className="text-blue-600 hover:cursor-pointer hover:text-blue-500">+ Create new module</Link>
                    </div>
                    <ModulesTransactions />
                </>
            )}
            {window.location.pathname === '/add-module' && <AddModule />}
            {window.location.pathname === '/add-transaction' && <AddTransaction />}
        </div>
    )
}

export default Home