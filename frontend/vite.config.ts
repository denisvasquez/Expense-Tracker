import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 5173,
    },
    resolve: {
        alias: {
            '@components': '/src/components',
            '@hooks': '/src/hooks',
            '@context': '/src/context',
            '@pages': '/src/pages',
            '@containers': '/src/containers',
            '@types': '/src/types',
            '@features': '/src/app/features',
        },
    },
})
