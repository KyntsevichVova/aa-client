import React from 'react';
import { useAuthStatus } from '../../../hooks/auth';

function HomePage() {
    const authStatus = useAuthStatus();
    return (
        <p>
            {authStatus.authorized ? "auth" : "unauth"}
        </p>
    );
}

export default HomePage;