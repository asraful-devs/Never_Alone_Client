import EventsFilter from '@/components/modules/Host/Events/EventsFilter';
import EventsManagementHeader from '@/components/modules/Host/Events/EventsManagementHeader';
import EventsTable from '@/components/modules/Host/Events/EventsTable';
import { queryStringFormatter } from '@/lib/formatters';
import { getCategories } from '@/service/admin/CategoriesManagement';
import { getUserInfo } from '../../../../../service/auth/getUserInfo';
import { getEvents } from '../../../../../service/events/eventsManagement';

const HostEventsManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const params = await searchParams;
    const queryString = queryStringFormatter(params);
    const hostData = await getUserInfo();

    // console.log(hostData, '.................................');

    const [eventsRes, categoriesRes] = await Promise.all([
        getEvents(queryString),
        getCategories(),
    ]);

    // Normalize events array from API response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let events: any[] = [];
    if (Array.isArray(eventsRes)) {
        events = eventsRes;
    } else if (Array.isArray(eventsRes?.data?.data)) {
        // API shape: { success, message, data: { meta, data: [] } }
        events = eventsRes.data.data;
    } else if (Array.isArray(eventsRes?.data)) {
        events = eventsRes.data;
    } else if (eventsRes?.success === false) {
        console.error('Failed to fetch events:', eventsRes.message);
        events = [];
    }

    const categories = Array.isArray(categoriesRes?.data)
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          categoriesRes.data.map((cat: any) => ({
              id: cat.id,
              name: cat.name,
          }))
        : [];

    return (
        <div className='space-y-6'>
            <EventsManagementHeader
                categories={categories}
                hostData={hostData}
            />

            <EventsFilter categories={categories} />

            <EventsTable
                events={events}
                categories={categories}
                hostData={hostData}
            />
        </div>
    );
};

export default HostEventsManagementPage;
