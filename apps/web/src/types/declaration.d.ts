declare namespace Database {
    export type User = {
        id: number;
        username: string;
        email: string;
        role: 'operator' | 'partner' | 'control' | 'external';
        password: string;
    }
    export type Token = {
        access_token : string;
        refresh_token : string;
        expired_at: string;
    }
    export type Card = {
        id: number;
        tag_id: string;
        last_name: string;
        first_name: string;
        middle_name: string;
        birthday: string;
        gender: 'male' | 'female';
        age: number;
        snils: string;
    }
    export type CadHistory = {
        id: number;
        card_id: Card['id'];
        date: string;
        action: string;
        type_action: 'info' | 'alert' | 'block' ;
        lat: number;
        lon: number;
        user_id: User['id'];
        promotion_id?: number;
    }
    export type Control = User;
    export type Partner = User;
    export type Promotion = {
        id: number;
        name: string;
        value: number;
    }
    export type PromotionCondition = {
        id: number;
        promotion_id: Promotion['id'];
        field: 'age' | 'gender' | 'pos' | 'time' | 'city' | 'target';
        condition: 'eq' | 'ne' | 'gt' | 'lt' | 'ge' | 'le'
        value: string
    }
    export type Pos = {
        id: number;
        user_id: User['id'];
        name: string;
        address: string;
        lat: number;
        lon: number;
    }
    export type Target = {
        id: number;
        city: string;
        min_age: number;
        max_age: number;
        gender?: 'male' | 'female'
    }
    export type Work = {
        id: number;
        start_datetime: string;
        end_datetime: string;
        user_id: User['id']
    }
    export type Path = {
        id: number;
        work_id: Work['id'];
        gov_number: string;
        path_number: string;
        user_id: User['id']
        start_datetime: string;
        end_datetime: string;
    }
}