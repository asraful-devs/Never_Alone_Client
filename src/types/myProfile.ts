export type AdminProfile = {
    data: {
        id: string;
        name: string;
        email: string;
        profilePhoto?: string;
        contactNumber?: string;
        isDeleted?: boolean;
        createdAt: string;
        updatedAt: string;
    };
};

export type HostProfile = {
    data: {
        id: string;
        name: string;
        email: string;
        profilePhoto?: string;
        contactNumber?: string;
        address?: string;
        rating: number;
        isVerified: boolean;
        createdAt: string;
        updatedAt: string;
        isDeleted?: boolean;
    };
};

export type UserProfile = {
    data: {
        id: string;
        name: string;
        email: string;
        profilePhoto?: string;
        contactNumber?: string;
        address?: string;
        age?: number;
        createdAt: string;
        updatedAt: string;
        isDeleted?: boolean;
    };
};

export type Role = 'ADMIN' | 'HOST' | 'USER';
