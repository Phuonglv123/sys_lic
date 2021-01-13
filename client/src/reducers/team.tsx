import {IMembers, IOrder, ITeam} from "../types";

export type TeamAction =
    | { type: 'FETCH_TEAM_BEGIN' }
    | { type: 'FETCH_TEAM_SUCCESS'; payload: { teams: Array<ITeam> }; }
    | { type: 'FETCH_TEAM_ERROR'; error: string }
    | { type: 'ADD_MEMBER', payload: { members: IMembers } }
    | { type: 'CREATE_ORDER', payload: { orders: {} } }

export interface TeamState {
    teams: Array<ITeam>;
    members: Array<IMembers>;
    orders: {};
    loading: boolean;
    error: string | null;
}

export const initialState: TeamState = {
    teams: [],
    members: [],
    orders: {},
    loading: false,
    error: null
}

export function teamReducer(state: TeamState, action: TeamAction): TeamState {
    switch (action.type) {
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
        case "ADD_MEMBER":
            return {
                ...state,
                members: [action.payload.members, ...state.members]
            }
        case "CREATE_ORDER":
            return {
                ...state,
                orders: action.payload.orders
            }
        default:
            return state;
    }
}


