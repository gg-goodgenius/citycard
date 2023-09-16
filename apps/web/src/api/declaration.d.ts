type ISOString = string;

declare namespace Api {
	export interface StringValidator {
		isAcceptable(s: string): boolean;
	}

	type Response<T> = { isError: false; data: T } | { isError: true; data: Api.Response.Error | null };

	type Params = { [key: string]: any };

	namespace Params {
		type Pagination = {
			offset?: number;
			limit?: number;
		};
	}

	namespace Response {
		export interface Error {
			detail: [
				{
					loc: [string, number];
					msg: string;
					type: string;
				},
			];
		}

		export interface Success {
			result: boolean;
		}

		export type User = {
			username: string;
			email: string;
			role: 'operator' | 'partner'
		}

		export type Login = {
			access_token: string;
			access_token_expired_at: ISOString;
			token_type: string;
			refresh_token: string;
			refresh_token_expired_at: ISOString;
			user: User;
		};
	}

	namespace Request {
		export type Login = {
			username: string;
			password: string;
		};
	}
}
