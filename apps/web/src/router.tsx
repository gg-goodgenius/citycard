import { ProtectedRoute } from './ProtectedRoute';
import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { CardDetail, Card } from './pages/Card';
import { ControlDetail, Control } from './pages/Control';
import { Login } from './pages/Login';
import { PartnerDetail, Partner } from './pages/Partner';
import { PosDetail, Pos } from './pages/Pos';
import { PromotionDetail, Promotion } from './pages/Promotion';
import { TargetDetail, Target } from './pages/Target';
import { TokenDetail, Token } from './pages/Token';
import { About } from './pages/About';

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
			{
				path: '/about',
				element: (
					<ProtectedRoute>
						<About />
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
