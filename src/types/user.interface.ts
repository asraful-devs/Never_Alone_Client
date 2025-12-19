import { UserRole } from '@/lib/auth-utils';

export interface UserInfo {
    id: string;
    name?: string;
    email: string;
    role: UserRole;
    phoneNumber?: string;
    location?: string;
    profilePhoto?: string;
    bio?: string;
    createdAt?: string;
}

export interface IUser {
    id?: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
    address?: string | null;
    age?: number | null;
    contactNumber: string;
    isDeleted: boolean;

    reviews?: string[];

    createdAt: string;
    updatedAt: string;
}
