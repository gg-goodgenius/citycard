
export const API_URL: string | undefined = process.env.REACT_APP_API_ADDRESS;
const ACCESS_TOKEN_KEY = 'accessToken';

const REFRESH_TOKEN_KEY = 'refreshToken';

export async function fetchHandler<T>(
	input: RequestInfo | URL,
	init?: RequestInit | undefined | any,
	retry = 2,
): Promise<Api.Response<T>> {
	try {
		const token = localStorage.getItem(ACCESS_TOKEN_KEY);
		const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
		let requestHeaders: HeadersInit = new Headers()

		if (!init) {
			init = {
				headers: {},
				method: 'GET',
			};
		}

		if (!init.headers) {
			init.headers = {};
		}

		// test

		if (token) {
			init.headers['Authorization'] = `Bearer ${token}`;
		}
		// console.log(input);
		// console.log(init);

		const response = await fetch((API_URL || 'http://localhost:9000/') + input, init);
		// console.log(response);

		const data = await response.json();
		// console.log(data);

		if (retry === -1) {
			return { isError: true, data };
		}

		if (response.status === 403) {
			console.log('response.status === 400, trying to fetch again...');
			requestHeaders.set('Authorization', `Bearer ${refreshToken}`)
			init.headers = requestHeaders;
			await updateToken();
			return await fetchHandler(input, init, retry - 1);
		}


		if (response.ok) {
			return {
				isError: false,
				data,
			};
		}

		return {
			isError: true,
			data,
		};
	} catch (error) {
		const err = error as Error;

		console.error("catch error:", error);

		return {
			isError: true,
			data: {
				detail: [
					{
						loc: ['unknown', 0],
						msg: err.message,
						type: 'unknown',
					},
				],
			},
		};
	}
}

export async function updateToken() {
	const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

	if (!refreshToken) {
		console.log('Forbiden')
		return;
	}

	try {
		const response = await fetch(process.env.REACT_APP_API_ADDRESS + 'operator/auth/refresh_token', {
			method: 'POST',
			headers: {
				Authorization: `${refreshToken}`,
			},
		});

		const data = await response.json();

		if (response.ok) {
			console.log('Success! Updating tokens ...');
			localStorage.setItem('accessToken', data?.access_token);
			localStorage.setItem('refreshToken', data?.refresh_token);
		}
	} catch (error) {
		console.error(error);
	}
}
