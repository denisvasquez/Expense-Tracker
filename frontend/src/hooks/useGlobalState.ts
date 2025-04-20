import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';

// types
import { IGlobalState } from '@types/global-state.ts';

const globalState = {
    user: null,
}

const useGlobalState = () => {
    const [state, setState] = useState<IGlobalState>(globalState);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken) {
                setState((prevState) => ({
                    ...prevState,
                    user: decodedToken,
                }));
            }
        } else {
            setState((prevState) => ({
                ...prevState,
                user: null,
            }));
        }
    }, [window.location.pathname]);

    return { state };

}

export default useGlobalState;