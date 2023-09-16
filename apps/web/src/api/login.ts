import { fetchHandler } from ".";


export async function fetchLogin(payload: Api.Request.Login) {
	const formData = new URLSearchParams();

	for (const [key, value] of Object.entries(payload)) {
		formData.append(key, value);
	}

	return await fetchHandler<Api.Response.Login>('auth/signin', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: formData.toString(),
	});
}


export async function fetchGetUserMe() {
	return await fetchHandler<Api.Response.User>('users/me/');
}