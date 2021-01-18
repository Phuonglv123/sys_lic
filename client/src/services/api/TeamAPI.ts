import API from "./APIUtils";
import {ITeam, IMembers, IUser} from "../../types";

type Teams = {
    teams: Array<ITeam>
    members: Array<IMembers>
}

type Team = {
    team: ITeam
    user: IUser
}


export function getListMyTeam(userId: string | undefined) {
    return API.get<Teams>(`/team/my-team/${userId}`)
}

export function getListTeam() {
    return API.get<Teams>('/team/list-team')
}

export function getTeamDetail(teamId: string) {
    return API.get<Team>(`/team/team-detail/${teamId}`)
}

export function createTeam(team: { email: string, phone: string, product: string, amount: number }) {
    return API.post<Team>('/team/create-team', {team})
}

export function createTeamAuth(team:{ email: string, phone: string, product: string, amount: number}) {
    return API.post<Team>('/team/create-team-auth', {team})
}
