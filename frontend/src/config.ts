import { INavLinks } from '@types/config'

export default {
    navLinks: <INavLinks>[
        // { name: 'Home', path: '/', auth: true, component: 'Navbar' },
        { name: 'Login', path: '/login', auth: false, component: 'Navbar' },
        {
            name: 'Register',
            path: '/register',
            auth: false,
            component: 'Navbar',
        },
        {
            name: 'Dashboard',
            path: '/dashboard',
            auth: true,
            component: 'Sidebar',
        },
        { name: 'Profile', path: '/profile', auth: true, component: 'Sidebar' },
        {
            name: 'Settings',
            path: '/settings',
            auth: true,
            component: 'Sidebar',
        },
    ],
    test: 'test',
}
