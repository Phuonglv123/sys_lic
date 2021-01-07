import React from 'react';
import {
    authReducer,
    initialState,
    AuthAction,
    AuthState,
} from '../reducers/auth';
import {getLocalStorageValue} from '../utils';
import {logout} from "../services/api/AuthAPI";
import {isTokenValid, setToken, TOKEN_KEY} from "../services/api/APIUtils";


type AuthContextProps = {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
};

const AuthContext = React.createContext<AuthContextProps>({
    state: initialState,
    dispatch: () => initialState,
});

export function AuthProvider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = React.useReducer(authReducer, initialState);
    React.useEffect(() => {
        const token = getLocalStorageValue(TOKEN_KEY);

        if (!token) return;

        if (isTokenValid(token)) {
            setToken(token);
            dispatch({type: 'LOGIN'});
        } else {
            dispatch({type: 'LOGOUT'});
            logout();
        }
    }, []);

    return <AuthContext.Provider value={{state, dispatch}} {...props} />;
}

export default function useAuth() {
    return React.useContext(AuthContext);
}
