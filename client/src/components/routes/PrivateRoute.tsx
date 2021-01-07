import React from 'react';
import {RouteComponentProps} from '@reach/router';
import HomeScene from "../../scene/HomeScene/HomeScene";
import useAuth from "../../context/auth";

interface PrivateRouteProps extends RouteComponentProps {
    as: React.ElementType<any>;
}

export default function PrivateRoute({as: Comp, ...props}: PrivateRouteProps) {
    const {state: {user},} = useAuth();
    return user ? <Comp {...props} /> : <HomeScene/>;
}
