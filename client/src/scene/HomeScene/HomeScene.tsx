import React from 'react';
import {RouteComponentProps} from '@reach/router';
import Banner from "../../components/Banner/Banner";
import MainView from "./MainView";
import FormCreateTeam from "./FormCreateTeam";
import style from './style.module.scss'

export default function HomeScene(_: RouteComponentProps) {

    return (
        <div className={style.homeScene}>
            <Banner/>
            <FormCreateTeam/>
            <MainView/>
        </div>
    );
}
