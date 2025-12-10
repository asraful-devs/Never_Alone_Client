export interface EventCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface EventHost {
    id: string;
    name: string;
    email: string;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    eventImage: string;
    startDateTime: string;
    endDateTime: string;
    fee: number;
    seats: number;
    location: string;
    hostId: string;
    userIds: string[];
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    category: EventCategory;
    host: EventHost;
}

export interface EventsResponse {
    success: boolean;
    message: string;
    data: {
        meta: {
            total: number;
            page: number;
            limit: number;
        };
        data: Event[];
    };
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
