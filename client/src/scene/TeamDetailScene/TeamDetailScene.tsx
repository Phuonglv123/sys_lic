import React, {useEffect} from "react";
import {RouteComponentProps, useParams} from "@reach/router";
import {getTeamDetail} from "../../services/api/TeamAPI";

export default function TeamDetailScene(_: RouteComponentProps) {
    // const teamId = useParams();
    // useEffect(() => {
    //     let ignore = false;
    //
    //     async function fetchTeamDetail() {
    //         try {
    //             const res = await getTeamDetail(teamId.teamId)
    //             console.log(res)
    //         } catch {
    //             console.log('error')
    //         }
    //     }
    //
    //     fetchTeamDetail();
    // })
    return (
        <div>
            team detaul
        </div>
    )
}
