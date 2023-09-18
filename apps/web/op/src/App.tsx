import { Outlet } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { Layout, Menu, Tooltip, Typography } from 'antd';
import { useAppSelector } from './hooks/useAppSelector';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserInfo } from './components/UserInfo';
import { fetchGetUserMe } from './api/login';
const { Header, Content, Footer } = Layout;


const App: React.FC = () => {
	const user = useAppSelector((state) => state.user.data);
	const location = useLocation();
	const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const link_operator = [
        {to: 'card', content:'ЕКЖ', hint:'', disable: false},
        {to: 'control', content:'Контроллеры', hint:'', disable: false},
        {to: 'partner', content:'Партнеры', hint:'', disable: false},
        {to: 'token', content:'Внешние сервисы', hint:'', disable: false},
        
    ]
    const link_partner = [
        {to: 'promotion', content:'Акции', hint:'', disable: false},
        {to: 'pos', content:'Точки продаж', hint:'', disable: false},
        {to: 'target', content:'Целевая аудитория', hint:'', disable: false},
    ]
    const getNavLinks = (role: Api.Response.User['role'] | undefined) => {
        switch (role) {
            case 'operator':
                return link_operator
            case 'partner':
                return link_partner
            case undefined:
                return []
        }
    }
    useEffect(() => {
		if (user) {
			navigate('/about');
            setLoading(false)
		} else {
            navigate('/login')
            setLoading(false)
        }
	}, []);
    if (loading) {
        return <div>loading</div>
    } else
    return (
        <Layout style={{minHeight:'100vh'}}>
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography.Title level={4} style={{color: 'white', margin:'0px'}}>{process.env.REACT_APP_API_ADDRESS}</Typography.Title>
                <Menu
                theme='dark'
                mode="horizontal"
                >
                {getNavLinks(user?.role).map(link => (
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
            <Content style={{ display: "flex", alignItems: 'center', flexDirection: 'column'}}>
                <Layout style={{width: '80vw'}}>
                    <Outlet />
                </Layout>
            </Content>
            <Footer style={{textAlign:'center'}}>Good  Genius 2023</Footer>
        </Layout>
    )
}
export default App