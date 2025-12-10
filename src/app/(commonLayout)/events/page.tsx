import Event from '../../../components/modules/Events/Event';
import { queryStringFormatter } from '../../../lib/formatters';
import { getEvents } from '../../../service/events/getEvents';

const EventsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const eventsResult = await getEvents(queryString);

    return (
        <div>
            <Event eventsData={eventsResult} />
        </div>
    );
};

export default EventsPage;
