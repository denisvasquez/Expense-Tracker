export interface INavLinks {
    name: string;
    path: string;
    auth: boolean;
    component: 'Navbar' | 'Sidebar';
}