import {IMembers, IOrder, ITeam, IUser} from '../types';

export type AuthAction =
    | {
    type: 'LOGIN';
}
    | {
    type: 'LOAD_USER';
    user: IUser;
}
    | { type: 'LOGOUT' }
    | { type: 'FETCH_TEAM_BEGIN' }
    | { type: 'FETCH_TEAM_SUCCESS'; payload: { teams: Array<ITeam> }; }
    | { type: 'FETCH_TEAM_ERROR'; error: string }
    | { type: 'ADD_MEMBER', payload: { members: IMembers } }
    | { type: 'CREATE_ORDER', payload: { orders: IOrder | null } }
    | { type: 'LOAD_ORDER', orders: IOrder | null }

export interface AuthState {
    isAuthenticated: boolean;
    user: IUser | null;
    teams: Array<ITeam>;
    members: Array<IMembers>;
    orders: IOrder | null;
    loading: boolean;
    error: string | null;
}

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    teams: [],
    members: [],
    orders: null,
    loading: false,
    error: null
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOGIN': {
            return {...state, isAuthenticated: true};
        }
        case 'LOAD_USER': {
            return {...state, user: action.user};
        }
        case "FETCH_TEAM_BEGIN":
            return {
                ...state,
                loading: true,
                error: null
            }
        case "FETCH_TEAM_SUCCESS":
            return {
                ...state,
                loading: false,
                teams: action.payload.teams,
                // members: action.payload.members
            };
        case 'FETCH_TEAM_ERROR':
            return {
                ...state,
                loading: false,
                error: action.error,
                teams: [],
            };
        case "CREATE_ORDER":
            return {
                ...state,
                orders: action.payload.orders
            }
        case "LOAD_ORDER":
            return {...state, orders: action.orders}
        case "ADD_MEMBER":
            return {
                ...state,
                members: [action.payload.members, ...state.members]
            }
        default:
            return state;
    }
}
