import { serverFetch } from '../../lib/serverFetchHelper';

/**
 * GET SINGLE EVENT BY ID
 * API: GET /event/:id
 */
export async function getEventById(eventId: string) {
    try {
        const response = await serverFetch.get(
            `/event/get-single-event/${eventId}`
        );
        const result = await response.json();
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
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
