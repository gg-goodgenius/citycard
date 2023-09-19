import { Navigate } from 'react-router-dom';
import { useAppSelector } from './hooks/useAppSelector';

export const ProtectedRoute = ({ children }: any) => {
	const user = useAppSelector((state) => state.user.data);
	if (!user) {
		return <Navigate to='/login' replace />;
	}
	return children;
};
