import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';

// types
import { IGlobalState } from '@types/global-state';

const token = localStorage.getItem('token');
const initialUser = token ? decodeToken(token) : null;

const useGlobalState = () => {
    const [state, setState] = useState<IGlobalState>({ user: initialUser });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decodeToken(token);
            setState({ user: decoded ?? null });
        } else {
            setState({ user: null });
        }
        setLoading(false);
    }, []); // Se ejecuta solo una vez al montar

    return { state, loading };
};

export default useGlobalState;
