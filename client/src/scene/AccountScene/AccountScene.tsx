import React from "react";
import {Link, RouteComponentProps, Router,} from "@reach/router";
import MyAccount from "./MyAccount";
import MyTeam from "./MyTeam";


export default function AccountScene(_: RouteComponentProps) {
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
            <div className="grid grid-rows-1 grid-flow-col gap-4 m-10">
                <div className="row-span-3">
                    <div className=" flex flex-row shadow-sm pl-5">
                        <ul className="flex flex-col py-4">
                            <li>
                                <Link to="/account"
                                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="text-sm font-medium">My Account</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="my-team"
                                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="text-sm font-medium">My Team</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="my-order"
                                      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="text-sm font-medium">My Order</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-span-9 bg-blue-100">
                    <Router>
                        <MyAccount default={true}/>
                        <MyTeam path='my-team'/>
                    </Router>
                </div>
            </div>
        </div>
    )
}
