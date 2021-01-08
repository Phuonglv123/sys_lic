import React, {useEffect} from 'react';
import {Router} from '@reach/router';
import useAuth, {AuthProvider} from "../../context/auth";
import {getCurrentUser} from "../../services/api/AuthAPI";
import HomeScene from "../../scene/HomeScene/HomeScene";
import LoginScene from "../../scene/LoginScene/LoginScene";
import RegisterScene from "../../scene/RegisterScene/RegisterScene";

function AppRoute() {
    const {state: {user, isAuthenticated}, dispatch,} = useAuth();
    useEffect(() => {
        let ignore = false;
        console.log(user)

        async function fetchUser() {
            try {
                const payload = await getCurrentUser();
                const {token, ...user} = payload.data.user;
                if (!ignore) {
                    dispatch({type: 'LOAD_USER', user});
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (!user && isAuthenticated) {
            fetchUser();
        }

        return () => {
            ignore = true;
        };
    }, [dispatch, isAuthenticated, user]);

    if (!user && isAuthenticated) {
        return null;
    }
    return (
        <AuthProvider>
            <Router>
                <HomeScene default path="/"/>
                <LoginScene path="login"/>
                <RegisterScene path="register"/>
            </Router>

        </AuthProvider>
    )
}

export default AppRoute;
