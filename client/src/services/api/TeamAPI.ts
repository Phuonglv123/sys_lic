import API from "./APIUtils";
import {ITeam, IMembers} from "../../types";

type Teams = {
    teams: Array<ITeam>
    members: Array<IMembers>
}

type Team = {
    team: ITeam
}


export function getListMyTeam(userId: string | undefined) {
    return API.get<Teams>(`/team/my-team/${userId}`)
}

export function getListTeam() {
    return API.get<Teams>('/team/list-team')
}

export function getTeamDetail(teamId: string) {
    return API.get<Teams>(`/team/team-detail/${teamId}`)
}

export function createTeam(team: { nameTeam: string, captain: string, phone: string, product: string, amount: string, limit: string }) {
    return API.post<Team>('/team/create-team-auth', {team})
}
