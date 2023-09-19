import { fetchHandler } from ".";


import { createQueryParamsString } from "./utils";

export async function fetchGetAll(url: string, params: Api.Params) {
	return await fetchHandler<any[]>(url + '/' + createQueryParamsString(params));
}

export async function fetchGet(url: string, id: number) {
	return await fetchHandler<any>(url + '/' + id);
}

export async function fetchPatch(url: string, id: number, payload: any) {

	return await fetchHandler<any>(url + '/' + id, {
		method: 'PATCH',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export async function fetchAddCard(url: string, payload: any) {
	return await fetchHandler<any>(url + '/', {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export async function fetchDelete(url: string, id: number) {
	return await fetchHandler<Api.Response.Success>(url + '/' + id, {
		method: 'DELETE',
	});
}

export async function fetchGetCount(url: string,) {
	return await fetchHandler<number>(url + '/count/');
}