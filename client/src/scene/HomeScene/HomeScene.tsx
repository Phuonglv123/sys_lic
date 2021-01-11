import React, {useState} from 'react';
import {RouteComponentProps} from '@reach/router';
import Banner from "../../components/Banner/Banner";
import {TeamProvider} from "../../context/team";
import MainView from "./MainView";

export default function HomeScene(_: RouteComponentProps) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Banner/>
            <div className='flex'>
                <div>
                    <input id="name-team" name="nameTeam" type="text" required
                           className="form-input mt-1 block w-full border-2 h-16" placeholder="Name Team"/>
                </div>
                <div>
                    <input id="phone" name="phone" type="text" required
                           className="form-input mt-1 block w-full border-t-2 border-b-2 border-r-2 h-16"
                           placeholder="Phone"/>
                </div>
                <div>
                    <input id="product" name="product" type="text" required
                           className="form-input mt-1 block w-full border-t-2 border-b-2 border-r-2 h-16"
                           placeholder="product"/>
                </div>
                <div>
                    <input id="amount" name="amount" type="text" required
                           className="form-input mt-1 block w-full border-t-2 border-b-2 border-r-2 h-16"
                           placeholder="amount"/>
                </div>
                <div>
                    <input id="limit" name="limit" type="text" required
                           className="form-input mt-1 block w-full border-t-2 border-b-2 border-r-2 h-16"
                           placeholder="limit"/>
                </div>
                <div>
                    <button
                        className='mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-16'>Create
                    </button>
                </div>
            </div>

            <TeamProvider>
                <MainView/>
            </TeamProvider>
        </div>
    );
}
