import API from './APIUtils';
import {IOrder, IUser} from "../../types";

type Orders = {
    orders: IOrder
}

type Order = {
    orders: IOrder
    user: IUser & { token: string };
}


export function createOrder(order: { email: string, fullName: string, phone: string, amount: number, teamId: string }) {
    return API.post<Order>('/order/create-order', order)
}

export function createOrderAuth(order: { email: string, fullName: string, phone: string, amount: number, teamId: string }) {
    return API.post<Order>('/order/create-order-auth', order)
}

export function getOrderItem(id:string) {
    return API.get<Order>(`/order/${id}`)
}

export function updateOrder(id: string | undefined) {
    return API.post<Orders>(`/order/update-order/${id}`)
}
