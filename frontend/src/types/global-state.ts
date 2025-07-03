interface User {
    id: number;
    name: string;
    iat: number,
    exp: number;
}

export interface IGlobalState {
    user: User;
}

