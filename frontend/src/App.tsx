import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// pages
import Dashboard from '@pages/Dashboard'
import Login from '@pages/auth/Login'

// hooks
import useGlobalState from '@hooks/useGlobalState'

// context
import GlobalContext from '@context/GlobalContext'

// containers
import Layout from '@containers/Layout'

const App = () => {
    const globalState = useGlobalState()

    return (
        <GlobalContext.Provider value={globalState}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Layout>
            </Router>
        </GlobalContext.Provider>
    )
}

export default App
