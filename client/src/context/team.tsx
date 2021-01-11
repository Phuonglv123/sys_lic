import React from "react";
import {
    teamReducer,
    initialState,
    TeamAction,
    TeamState
} from "../reducers/team";

type TeamListContentProps = {
    state: TeamState;
    dispatch: React.Dispatch<TeamAction>;
}

const TeamContext = React.createContext<TeamListContentProps>({
    state: initialState,
    dispatch: () => initialState,
});

export function TeamProvider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = React.useReducer(teamReducer, initialState);
    return <TeamContext.Provider value={{state, dispatch}} {...props}/>;
}

export default function useTeam() {
    const context = React.useContext(TeamContext);
    if (!context) {
        throw new Error(`useArticles must be used within an ArticlesProvider`);
    }
    return context;
}


