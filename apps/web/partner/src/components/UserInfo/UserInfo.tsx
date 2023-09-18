import { Typography, Button } from "antd"
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from './../../hooks/useAppDispatch';
import { useAppSelector } from './../../hooks/useAppSelector';
import { setUser } from './../../store/features/user/slice';
const UserInfo = () => {
	const user = useAppSelector((state) => state.user.data);
	const dispatch = useAppDispatch();
    const handleExit = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload();
        dispatch(setUser(null))
    }
    if (user) {
        return <div style={{display: 'flex', flexDirection:'row', alignItems:'center', gap:25}}>
            <Typography style={{color: 'white'}}>{user.username} ({user.role})</Typography>
            <Button onClick={handleExit}> Выйти</Button>
        </div>
    } else {
        return <NavLink to='login' title="Вход" />
    }
}

export default  UserInfo