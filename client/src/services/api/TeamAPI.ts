import API from "./APIUtils";
import {ITeam, IMembers} from "../../types";

// type Teams = {
//     teams: Array<ITeam>
// }

type Teams = {
    teams: Array<ITeam>
    members: Array<IMembers>
}

export function getListTeam() {
    return API.get<Teams>('/team/list-team')
}
