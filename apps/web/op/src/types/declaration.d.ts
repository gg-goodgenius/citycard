import { BaseButtonProps } from "antd/es/button/button";
import type { ColumnGroupType, ColumnType } from 'antd/es/table';


declare namespace DatabaseType {
    export type User = {
        id: number;
        username: string;
        email: string;
        role: 'operator' | 'partner' | 'control' | 'external';
        password: string;
    }
    export type Token = {
        access_token: string;
        refresh_token: string;
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
        is_active: boolean;
    }
    export type CardHistory = {
        id: number;
        card_id: Card['id'];
        date: string;
        action: string;
        type_action: 'info' | 'alert' | 'block';
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

declare namespace TableDataType {
    type Button = {
        title: string;
        type?: BaseButtonProps['type'];
        danger?: boolean;
        onClick?: () => void;
        onClickWithSelectedRow?: (ids: React.Key[]) => void;
    }
    type Column = (ColumnGroupType<any> | ColumnType<any>)
    type Title = string;
    type RouteDetail = string;
    type Pagination = {
        page: number;
        pageSize: number;
        total: number;
        setPage: (number) => void;
        setPageSize: (number) => void;
    }
}