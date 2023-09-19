import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from './pages/Login';
import { Pos } from './pages/Pos';
import { Promotion, PromotionDetail } from './pages/Promotion';
import { Target } from './pages/Target';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/pos',
				element: (
					<ProtectedRoute>
						<Pos />
					</ProtectedRoute>
				),
			},
			{
				path: '/promotion',
				element: (
					<ProtectedRoute>
						<Promotion />
					</ProtectedRoute>
				),
			},
			{
				path: '/promotion/:id',
				element: (
					<ProtectedRoute>
						<PromotionDetail />
					</ProtectedRoute>
				),
			},
			{
				path: '/target',
				element: (
					<ProtectedRoute>
						<Target />
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '*',
		element: <Navigate to='/' />,
	},
]);
