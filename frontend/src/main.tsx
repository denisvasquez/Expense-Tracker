import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'tailwindcss/index.css'
import { store } from './app/store.ts'
import { Provider } from 'react-redux'

const container = document.getElementById("root");

if (container) {
    const root = createRoot(container)

    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    )
} else {
    throw new Error("Root element wasn't found in the document.")
}
