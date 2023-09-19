import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ProtectedRoute } from './ProtectedRoute';
import { Card, CardDetail } from './pages/Card';
import { Control, ControlDetail } from './pages/Control';
import { Login } from './pages/Login';
import { Partner, PartnerDetail } from './pages/Partner';
import { Pos, PosDetail } from './pages/Pos';
import { Promotion, PromotionDetail } from './pages/Promotion';
import { Target, TargetDetail } from './pages/Target';
import { Token, TokenDetail } from './pages/Token';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/card',
				element: (
					<ProtectedRoute>
						<Card />
					</ProtectedRoute>
				),
			},
			{
				path: '/card/:id',
				element: (
					<ProtectedRoute>
						<CardDetail />
					</ProtectedRoute>
				),
			},
			{
				path: '/control',
				element: (
					<ProtectedRoute>
						<Control />
					</ProtectedRoute>
				),
			},
			{
				path: '/control/:id',
				element: (
					<ProtectedRoute>
						<ControlDetail />
					</ProtectedRoute>
				),
			},

			{
				path: '/partner',
				element: (
					<ProtectedRoute>
						<Partner />
					</ProtectedRoute>
				),
			},
			{
				path: '/partner/:id',
				element: (
					<ProtectedRoute>
						<PartnerDetail />
					</ProtectedRoute>
				),
			},
			{
				path: '/pos',
				element: (
					<ProtectedRoute>
						<Pos />
					</ProtectedRoute>
				),
			},
			{
				path: '/pos/:id',
				element: (
					<ProtectedRoute>
						<PosDetail />
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
			{
				path: '/target/:id',
				element: (
					<ProtectedRoute>
						<TargetDetail />
					</ProtectedRoute>
				),
			},
			{
				path: '/token',
				element: (
					<ProtectedRoute>
						<Token />
					</ProtectedRoute>
				),
			},
			{
				path: '/token/:id',
				element: (
					<ProtectedRoute>
						<TokenDetail />
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
