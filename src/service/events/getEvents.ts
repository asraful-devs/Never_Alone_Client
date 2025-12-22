import { serverFetch } from '../../lib/serverFetchHelper';

/**
 * GET ALL EVENTS
 * API: GET /event?queryParams
 */
export async function getEvents(queryString?: string) {
    try {
        const response = await serverFetch.get(
            `/event/get-all-events${queryString ? `?${queryString}` : ''}`
        );
        const result = await response.json();
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        // console.log(error);
        return {
            success: false,
            message: `${
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong'
            }`,
        };
    }
}
