import { fetchHandler } from ".";
import { DatabaseType } from "../types/declaration";


import { createQueryParamsString } from "./utils";

export async function fetchGetCardAll(params: Api.Params) {
	return await fetchHandler<DatabaseType.Card[]>('card/' + createQueryParamsString(params));
}

export async function fetchGetCard(id: number) {
	return await fetchHandler<DatabaseType.Card>('card/' + id);
}

export async function fetchPatchCard(id: number, payload: Api.Request.CardUpdate) {
	return await fetchHandler<DatabaseType.Card>('card/' + id, {
		method: 'PATCH',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export async function fetchAddCard(payload: Api.Request.CardCreate) {
	return await fetchHandler<DatabaseType.Card>('card/', {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export async function fetchDeleteCard(id: number) {
	return await fetchHandler<Api.Response.Success>(`card/${id}`, {
		method: 'DELETE',
	});
}

export async function fetchGetCardCount() {
	return await fetchHandler<number>('card/count/');
}