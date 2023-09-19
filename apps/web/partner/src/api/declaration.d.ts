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
		type PaginationWithSearch = {
			offset?: number;
			limit?: number;
			search_text?: string;
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
			] | {
				diff?: number;
				message?: string;
			};
		}

		export interface Success {
			result: boolean;
		}

		export interface User {
			created_at: ISOString;
			update_at: ISOString;
			username: string;
			email: string;
			role: Entity.User.Role;
			id: number;
			is_active: boolean;
		}
		export type Users = Array<User>;

		export type UpdateFromFile = string;

		export type Login = {
			access_token: string;
			access_token_expired_at: ISOString;
			token_type: string;
			refresh_token: string;
			refresh_token_expired_at: ISOString;
			user: User;
		};

		export type Card = {
			id: number;
			tagid: string;
			lastname: string;
			firstname: string;
			middlename: string;
			birthday: ISOString;
			gender: string;
			snils: string;
			age: number;
		}

		export type Cards = Card[]
	}

	namespace Request {
		export interface User {
			first_name: string;
			last_name: string;
			email: string;
			role: string;
			password: string;
		}

		export interface UserUpdate {
			first_name?: string;
			last_name?: string;
			email?: string;
			role?: Entity.User.Role;
			is_active?: boolean;
		}

		// name , username ?
		export type SignUp = {
			first_name: string;
			last_name: string;
			password: string;
			email: string;
			role: string;
		};

		export type Login = {
			username: string;
			password: string;
		};

		export type CardCreate = {
			tagid: string;
			lastname: string;
			firstname: string;
			middlename: string;
			birthday: ISOString;
			gender: string;
			snils: string;
		}

		export type CardUpdate = {
			is_active?: boolean;
			tagid?: string;
			lastname?: string;
			firstname?: string;
			middlename?: string;
			birthday?: ISOString;
			gender?: string;
			snils?: string;
		}

	}
}
