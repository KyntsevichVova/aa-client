import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { actions, selectors } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';

const { Sider } = Layout;

function AppSider() {
    const menu = useSelector(selectors.menu.selectMenu);
    const dispatch = useDispatch();
    const dispatchSelected = React.useCallback((selected) => {
        const action = actions.menu.select({
            selected,
        });
        dispatch(action);
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
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="/kek">
                    <Link to="/kek" onClick={() => dispatchSelected('/kek')}>
                        Kek
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default AppSider;