import { getCookie } from '../service/auth/tokenHandler';

const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api/v1';

const serverFetchHelper = async (
    endpoint: string,
    options?: RequestInit
): Promise<Response> => {
    const { headers, ...restOptions } = options || {};

    const accessToken = await getCookie('accessToken');

    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        headers: {
            // 'Content-Type': 'application/json',
            ...headers,
            // ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            // ...(accessToken ? { Authorization: ` ${accessToken}` } : {}),
            Cookie: accessToken ? `accessToken=${accessToken}` : '',
        },
        ...restOptions,
    });

    return response;
};

export const serverFetch = {
    get: (endpoint: string, options?: RequestInit): Promise<Response> => {
        return serverFetchHelper(endpoint, {
            method: 'GET',
            ...options,
        });
    },

    post: (endpoint: string, options?: RequestInit): Promise<Response> => {
        return serverFetchHelper(endpoint, {
            method: 'POST',
            ...options,
        });
    },

    put: (endpoint: string, options?: RequestInit): Promise<Response> => {
        return serverFetchHelper(endpoint, {
            method: 'PUT',
            ...options,
        });
    },

    patch: (endpoint: string, options?: RequestInit): Promise<Response> => {
        return serverFetchHelper(endpoint, {
            method: 'PATCH',
            ...options,
        });
    },

    delete: (endpoint: string, options?: RequestInit): Promise<Response> => {
        return serverFetchHelper(endpoint, {
            method: 'DELETE',
            ...options,
        });
    },
};
