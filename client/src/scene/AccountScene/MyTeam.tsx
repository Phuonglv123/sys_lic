import React, {useEffect, useState} from "react";
import {RouteComponentProps} from "@reach/router";
import {getListMyTeam} from "../../services/api/TeamAPI";
import useAuth from "../../context/auth";
import {ITeam} from "../../types";

export default function MyTeam(_: RouteComponentProps) {
    const {state: {user}} = useAuth();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<ITeam[] | null>(null)

    useEffect(() => {
        let ignore = false;

        async function fetchMyTeam() {
            setLoading(true)
            try {
                const userId = user ? user.id : undefined;
                const res = await getListMyTeam(userId);
                if (!ignore) {
                    setData(res.data.teams)
                    console.log(res.data.teams)
                }
            } catch (e) {
                console.log(e)
            }
            setLoading(false)
        }

        fetchMyTeam();
        return () => {
            ignore = true
        }
    }, [])
    return (
        <div>
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
                            {data?.map((k, i) => {
                                return (
                                    <tr key={i}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {k.nameTeam}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{k.product}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{k.members.length}</td>

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
    )
}
