import API from './APIUtils';
import {IOrder} from "../../types";

type Orders = {
    orders: Array<IOrder>
}

type Order = {
    order: IOrder
}

export function createOrder(order: { email: string, fullName: string, phone: string, amount: string, teamId: string }) {
    return API.post<Order>('/order/create-order', order)
}
