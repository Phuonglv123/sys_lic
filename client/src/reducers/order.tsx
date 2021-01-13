import {IOrder} from "../types";

export type OrderAction =
    | { type: 'FETCH_ORDER_BEGIN' }
    | { type: 'FETCH_ORDER_SUCCESS'; payload: { teams: Array<IOrder> } }
    | { type: 'FETCH_ORDER_ERROR'; error: string }
    | { type: 'CREATE_ORDER', payload: { orders: IOrder } };

export interface OrderState {
    orders: Array<IOrder>
    loading: boolean;
    error: string | null;
}

export const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null
}

export function orderReducer(state: OrderState, action: OrderAction): OrderState {
    switch (action.type) {
        case "FETCH_ORDER_BEGIN":
            return {
                ...state,
                loading: true,
                error: null
            }

        case "CREATE_ORDER":
            return {
                ...state,
                orders: [action.payload.orders, ...state.orders]
            }
        default:
            return state;
    }
}
