import React from 'react';
import { Layout, Menu, Button, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { actions, selectors } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';

const { Sider } = Layout;

function AppSider() {
    const menu = useSelector(selectors.menu.selectMenu);
    const authorized = useSelector(selectors.status.selectAuthorized);
    const dispatch = useDispatch();

    const dispatchSelected = React.useCallback((selected) => {
        dispatch(actions.menu.select({
            selected,
        }));
    }, [dispatch]);
    const dispatchLogout = React.useCallback(() => {
        dispatch(actions.auth.signOut());
    }, [dispatch]);
    
    const location = useLocation();
    if (menu.selected !== location.pathname) {
        dispatchSelected(location.pathname);
    }
    
    return (
        <Sider style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
        }}>
            <div style={{
                  height: "32px",
                  background: "rgba(255, 255, 255, 0.2)",
                  margin: "16px",
            }} />
            <Menu theme="dark" mode="inline" selectedKeys={[menu.selected]}>
                <Menu.Item key="/">
                    <Link to="/" onClick={() => dispatchSelected('/')}>
                        Articles
                    </Link>
                </Menu.Item>
                {
                /*<Menu.Item key="/authors">
                    <Link to="/authors" onClick={() => dispatchSelected('/authors')}>
                        Authors
                    </Link>
                </Menu.Item>*/
                }
                <Menu.Item key="/notifications">
                    <Link to="/notifications" onClick={() => dispatchSelected('/notifications')}>
                        Notifications
                    </Link>
                </Menu.Item>
                <Menu.Item key="/subscriptions">
                    <Link to="/subscriptions" onClick={() => dispatchSelected('/subscriptions')}>
                        Subscriptions
                    </Link>
                </Menu.Item>
            </Menu>
            <div style={{
                display: 'flex',
                flexDirection: 'column-reverse',
                justifyContent: 'flex-start',
                height: '60vh',
                alignItems: 'center'
            }}>
                {authorized
                    ? (
                        <Button ghost style={{width: '120px'}} onClick={dispatchLogout}>
                            Sign Out
                        </Button>
                    )
                    : (
                        <Space direction="vertical" size="middle">
                            <Link to="/signin">
                                Sign In
                            </Link>
                            <Link to="/signup">
                                Sign Up
                            </Link>
                        </Space>
                    )
                }
            </div>
        </Sider>
    );
}

export default AppSider;