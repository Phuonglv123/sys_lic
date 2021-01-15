export interface IProfile {
    email: string;
    fullName: string;
    phone: string
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

export interface IMembers {
    id: string;
    email: string;
    phone: string;
    fullName: string;
}

export interface ITeam {
    id: string;
    product: string;
    amount: string;
    phone: string;
    captain: string;
    members: IMembers[];
    createdAt: Date;
}

export interface IOrder {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    amount: string;
    teamId: string;
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
