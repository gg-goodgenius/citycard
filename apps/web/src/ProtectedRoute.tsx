import { useAppSelector } from './hooks/useAppSelector';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: any) => {
	const user = useAppSelector((state) => state.user.data);
	console.log('Login User', user);
	
	if (!user) {
		return <Navigate to='/login' replace />;
	}
	return children;
};
