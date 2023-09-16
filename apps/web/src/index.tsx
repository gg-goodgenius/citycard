import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ConfigProvider } from 'antd';
import theme from './theme.json'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<ConfigProvider theme={theme}>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</ConfigProvider>
);
