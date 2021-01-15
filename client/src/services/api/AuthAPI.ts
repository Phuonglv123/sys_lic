import API, {TOKEN_KEY} from './APIUtils';
import {setToken} from './APIUtils';
import {IUser} from "../../types";
import {setLocalStorage} from "../../utils";

type User = {
    user: IUser & { token: string };
};

type Users = {
    user: IUser
}

function handleUserResponse({user: {token, ...user}}: User) {
    setLocalStorage(TOKEN_KEY, token);
    setToken(token);
    return user;
}

export function getCurrentUser() {
    return API.get<User>('/auth/user');
}

export function getProfileCaptain(id: string|undefined) {
    return API.get<Users>(`/auth/user/${id}`)
}

export function login(email: string, password: string) {
    return API.post<User>('/auth/login', {
        email, password
    }).then((user) => handleUserResponse(user.data));
}

export function register(user: {
    email: string;
    fullName: string;
    phone: string;
    password: string;
}) {
    return API.post<User>('/auth/register', {user}).then((user) =>
        handleUserResponse(user.data),
    );
}

export function updateUser(user: IUser & Partial<{ password: string }>) {
    return API.put<User>('/auth/user', {user});
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
}
