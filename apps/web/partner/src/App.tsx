import { Layout, Menu, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { fetchGetUserMe } from './api/login';
import { UserInfo } from './components/UserInfo';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { setUser } from './store/features/user/slice';
const { Header, Content, Footer } = Layout;


const App: React.FC = () => {
    const user = useAppSelector((state) => state.user.data);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true)
    const [menu, setMenu] = useState([{ to: '', content: '', hint: '', disable: false }])
    const link_operator = [
        { to: 'card', content: 'ЕКЖ', hint: '', disable: false },
        { to: 'control', content: 'Контроллеры', hint: '', disable: false },
        { to: 'partner', content: 'Партнеры', hint: '', disable: false },
        { to: 'token', content: 'Внешние сервисы', hint: '', disable: false },

    ]
    const link_partner = [
        { to: 'promotion', content: 'Акции', hint: '', disable: false },
        { to: 'pos', content: 'Точки продаж', hint: '', disable: false },
        { to: 'target', content: 'Целевая аудитория', hint: '', disable: false },
    ]
    useEffect(() => {
        setLoading(true);

        if (user) {
            navigate('/promotion');
        }

        fetchGetUserMe()
            .then((result) => {
                if (result.isError) {
                    console.error(result.data?.detail);

                    navigate('/login');
                    return;
                }

                dispatch(setUser(result.data));
                if (result.data.role === 'operator') setMenu(link_operator)
                if (result.data.role === 'partner') setMenu(link_partner)

            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/promotion');
        }
    }, [location.pathname]);


    if (loading) {
        return <div>loading</div>
    } else
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography.Title level={4} style={{ color: 'white', margin: '0px' }}>{process.env.REACT_APP_TITLE}</Typography.Title>
                    <Menu
                        theme='dark'
                        mode="horizontal"
                    >
                        {menu.map(link => (
                            <Menu.Item key={link.to} disabled={link?.disable}>
                                <Tooltip title={link.hint} mouseEnterDelay={0.75} color='#000000c1'>
                                    <NavLink
                                        to={link.to}
                                        key={link.to}
                                    >
                                        {link.content}
                                    </NavLink>
                                </Tooltip>
                            </Menu.Item>
                        ))}
                    </Menu>
                    <UserInfo />
                </Header>
                <Content style={{ display: "flex", alignItems: 'center', flexDirection: 'column' }}>
                    <Layout style={{ width: '80vw' }}>
                        <Outlet />
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Good  Genius 2023</Footer>
            </Layout>
        )
}
export default App