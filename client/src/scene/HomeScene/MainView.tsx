import React, {useEffect, useReducer} from "react";
import {initialState, teamReducer} from "../../reducers/team";
import {getListTeam} from "../../services/api/TeamAPI";
import useTeam from "../../context/team";

export default function MainView() {
    const {state: {teams, members, loading, error}, dispatch} = useTeam();

    useEffect(() => {
        dispatch({type: 'FETCH_TEAM_BEGIN'})
        let ignore = false;

        const fetchTeams = async () => {
            try {
                const res = await getListTeam();
                if (!ignore) {
                    dispatch({type: 'FETCH_TEAM_SUCCESS', payload: {teams: res.data.teams}})
                }
            } catch (error) {
                dispatch({
                    type: 'FETCH_TEAM_ERROR',
                    error
                })
            }
        };
        fetchTeams();
        return () => {
            ignore = true;
        };
    }, [dispatch])

    return (
        <div>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name team
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Members
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Limit
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Captain
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {teams.map((k, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="px-6 py-4 whitespace-nowrap">{k.nameTeam}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{k.product}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">0</td>

                                            <td className="px-6 py-4 whitespace-nowrap">{k.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{k.limit}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{k.captain}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
