import {FilterCategories, OrderCategories, Orders} from '@/enums';

export interface Filter {
    category: FilterCategories;
    term: string;
}

export interface Ordering {
    category: OrderCategories;
    order: Orders;
}

export interface Error {
    name: string;
    address: string;
}

export interface Address {
    name: string;
    address: string;
    balance: number;
}

export interface ConfirmDialog {
    content: string;
    action: Function;
    title: string;
    isActive: boolean;
}