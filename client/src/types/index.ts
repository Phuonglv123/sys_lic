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
    amount: number;
    phone: string;
    email: string;
    members: IMembers[];
    createdAt: Date;
}

export interface IOrder {
    _id: string;
    email: string;
    fullName: string;
    phone: string;
    amount: number;
    teamId: string
    isPaid: boolean;
    renew: Date;
    createdAt: Date;
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
