import React from 'react';
import { useAuthorized } from '../hooks/auth';
import AuthorizedContext from '../context/AuthorizedContext';
import { Spin } from 'antd';

function AuthorizedPage({ children }) {
    const authStatus = useAuthorized();

    return (
        <AuthorizedContext.Provider value={authStatus}>
            {authStatus.loading
                ? (
                    <div style={{ textAlign: 'center' }}>
                        <Spin size="large"/>
                    </div>)
                : (children)
            }
        </AuthorizedContext.Provider>
    );
}

export default AuthorizedPage;