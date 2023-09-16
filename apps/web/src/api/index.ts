
export const API_URL : string | undefined = process.env.REACT_APP_API_ADDRESS;
const ACCESS_TOKEN_KEY = 'accessToken';

const REFRESH_TOKEN_KEY = 'refreshToken';

export async function fetchHandler<T>(
	input: RequestInfo | URL,
	init?: RequestInit | undefined,
	retry = 2,
): Promise<Api.Response<T>> {
	try {
		const token = localStorage.getItem(ACCESS_TOKEN_KEY);
		console.log(API_URL);
		const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
		const requestHeaders: HeadersInit = new Headers()
		

		if (token) {
			requestHeaders.set('Authorization', `Bearer ${token}`)
		}
		if (!init) {
			init= new Request(input);
			init.headers = requestHeaders;
			init.method = 'GET'
		}
		if (!init.headers) 
		{
			init.headers = requestHeaders;
		}

		const response = await fetch((API_URL || 'http://localhost:9000/') + input, init);

		const data = await response.json();

		if (retry === -1) {
			return { isError: true, data };
		}

		if (response.status === 403) {
			console.log('response.status === 403, trying to fetch again...');
			requestHeaders.set('Authorization', `Bearer ${refreshToken}`)
			init.headers = requestHeaders;
			await updateToken();

			return await fetchHandler(input, init, retry - 1);
		}

		// response.status === 401;

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

		console.error(error);

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
		return;
	}

	try {
		const response = await fetch(process.env.REACT_APP_API_URL + 'auth/update_token', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${refreshToken}`,
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
