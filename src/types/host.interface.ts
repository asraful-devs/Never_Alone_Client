export interface IHost {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string;
    contactNumber?: string;
    address?: string;
    rating: number;
    isVerified: boolean;
    isDeleted: boolean;

    events?: string[]; // Assuming events are represented by their IDs

    createdAt: Date;
    updatedAt: Date;
}
