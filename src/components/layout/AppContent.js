import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

function AppContent({ children }) {
    return (
        <Content style={{ 
            margin: '24px 16px 0', 
            overflow: 'initial', 
        }}>
            <div style={{
                padding: 24,
                background: "#fff",
            }}>
                {children}
            </div>
        </Content>
    );
}

export default AppContent;