import { fetchHandler } from ".";


export async function fetchLogin(payload: Api.Request.Login) {
	return await fetchHandler<Api.Response.Login>('operator/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload)
	});
}


export async function fetchGetUserMe() {
	return await fetchHandler<Api.Response.User>('me');
}