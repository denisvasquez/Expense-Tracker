export interface ILogin {
    username: string;
    password: string;
}

export interface IRegister {
    username: string;
    password: string;
    email: string;
    typeAuth: number;
    role_id: number;
}

export interface User {
    token: string;
    username: string
}