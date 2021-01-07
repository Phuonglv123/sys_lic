export interface IProfile {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}

export interface IArticle {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: Date;
    updatedAt: Date;
    favorited: boolean;
    favoritesCount: number;
    author: IProfile;
}

export interface IComment {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    body: string;
    author: IProfile;
}

export interface IUser {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    bio: string;
    image: string;
}

export interface IErrors {
    [key: string]: string[];
}
