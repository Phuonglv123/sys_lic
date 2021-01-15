import React, {useEffect, useState} from "react";
import {RouteComponentProps, useParams} from "@reach/router";
import {getTeamDetail} from "../../services/api/TeamAPI";
import style from './style.module.scss'
import {IProfile, ITeam} from "../../types";
import {getProfileCaptain} from "../../services/api/AuthAPI";

export default function TeamDetailScene(_: RouteComponentProps) {
    const teamId = useParams();
    const [data, setData] = useState<ITeam | null>(null);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<IProfile | null>(null)
    useEffect(() => {
        let ignore = false;
        setLoading(true)

        async function fetchTeamDetail() {
            try {
                const res = await getTeamDetail(teamId.teamId)
                if (!ignore) {
                    setData(res.data.team);
                }
            } catch {
                console.log('error')
            }
            setLoading(false)
        }

        fetchTeamDetail();
        return () => {
            ignore = true;
        };

    }, [])

    const getProfile = async (id: string | undefined) => {
        const res = await getProfileCaptain(id)
        if (res){
            return <span>{res.data.user.email}</span>
        }
    }
    return (
        <div className={style.TeamDetailScene}>
            <div className={style.row}>
                <div className={style.col2}>
                    <div className={style.card}>

                    </div>
                </div>
                <div className={style.col3}>
                    <div className={style.title}>
                        Members
                    </div>

                    <div className=' m-5'>
                        {data && <ul className="list-none m-0 p-0">
                            <li className="mb-2">
                                <div className="flex items-center mb-1">
                                    <div className="bg-gray-500 rounded-full h-10 w-10 text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1 ml-4 font-medium">Captain</div>
                                </div>
                                <div className="ml-12 flex justify-between items-center">
                                    <span>Email:</span>
                                    {getProfile(data.captain)}
                                    <span></span>
                                </div>
                                <div className="ml-12 flex justify-between items-center">
                                    <span>Product:</span>
                                    <span>{data.product}</span>
                                </div>
                            </li>
                            {data.members ? data.members.map((i, index) => (
                                <React.Fragment key={index}>
                                    <div className='top-0 border-r-2 h-12 w-1 ml-3 border-gray-500'/>
                                    <li className="mb-2">
                                        <div className="flex items-center mb-1">
                                            <div className="bg-gray-500 rounded-full h-10 w-10 text-white mt-2 mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                     fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            </div>
                                            <div className="flex-1 ml-4 font-medium">Members</div>
                                        </div>
                                        <div className="ml-12 flex justify-between items-center">
                                            <span>Email:</span>
                                            <span>{i.email}</span>
                                        </div>
                                        <div className="ml-12 flex justify-between items-center">
                                            <span>Phone:</span>
                                            <span>{i.phone}</span>
                                        </div>
                                    </li>
                                </React.Fragment>
                            )) : null}
                        </ul>}
                    </div>
                </div>
            </div>
        </div>
    )
}
