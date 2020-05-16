import React from 'react';
import { API } from '../lib/api';
import AuthorizedContext from '../context/AuthorizedContext';

const initState = {
    loading: true,
    authorized: false,
};

const authorized = {
    loading: false,
    authorized: true,
}

const unauthorized = {
    loading: false,
    authorized: false,
}

export function useAuthorized() {
    const [authStatus, setAuthStatus] = React.useState(initState);
    React.useEffect(() => {
        API.get('/api/v1/self', {
            credentials: 'include'
        }).then((response) => {
            if (response.status === 200) {
                setAuthStatus(authorized);
            } else {
                setAuthStatus(unauthorized);
            }
        });
    }, []);

    return authStatus;
}

export function useAuthStatus() {
    return React.useContext(AuthorizedContext);
}