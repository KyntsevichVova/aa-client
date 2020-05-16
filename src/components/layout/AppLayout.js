import React from 'react';
import { Layout } from 'antd';
import AppContent from './AppContent';
import AppHeader from './AppHeader';
import AppSider from './AppSider';

function AppLayout({ children }) {
    return (
        <Layout>
            <AppSider />
            <Layout style={{
                background: "#fff", 
                marginLeft: 200,
            }}>
                <AppHeader />
                <AppContent>
                    {children}
                </AppContent>
            </Layout>
        </Layout>
    );
}

export default AppLayout;