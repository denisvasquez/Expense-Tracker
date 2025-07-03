import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// pages
import Dashboard from '@pages/Dashboard'
import Login from '@pages/auth/Login'
import Register from '@pages/auth/Register'

// hooks
import useGlobalState from '@hooks/useGlobalState'

// context
import GlobalContext from '@context/GlobalContext'

// containers
import Layout from '@containers/Layout'

// redux-types-module
import { getModulesTypes } from '@features/modules/modules-types.slice'
import { getModules } from '@features/modules/modules.slice'

const App = () => {
    const globalState = useGlobalState()
    const dispatch = useDispatch()
    console.log(globalState);

    useEffect(() => {
        dispatch(getModulesTypes());
        dispatch(getModules(globalState.state?.user?.id));
    }, [dispatch])

    return (
        <GlobalContext.Provider value={globalState}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/add-module" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Layout>
            </Router>
        </GlobalContext.Provider>
    )
}

export default App
