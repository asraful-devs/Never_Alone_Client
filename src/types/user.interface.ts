import { UserRole } from '@/lib/auth-utils';

export interface UserInfo {
    id: string;
    email: string;
    role: UserRole;
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
