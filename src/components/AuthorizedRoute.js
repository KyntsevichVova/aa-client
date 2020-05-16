import React from 'react';
import { Route } from 'react-router-dom';
import AuthorizedPage from './AuthorizedPage';

function AuthorizedRoute({ children, ...rest }) {
    return (
        <Route {...rest}>
            <AuthorizedPage>
                {children}
            </AuthorizedPage>
        </Route>
    );
}

export default AuthorizedRoute;