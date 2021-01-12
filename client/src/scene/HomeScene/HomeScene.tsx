import React from 'react';
import {RouteComponentProps} from '@reach/router';
import Banner from "../../components/Banner/Banner";
import {TeamProvider} from "../../context/team";
import MainView from "./MainView";
import FormCreateTeam from "./FormCreateTeam";

export default function HomeScene(_: RouteComponentProps) {

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Banner/>
            <FormCreateTeam/>
            <TeamProvider>
                <MainView/>
            </TeamProvider>
        </div>
    );
}
