import EventDetails from '../../../../components/modules/Events/EventDetails';
import { getUserInfo } from '../../../../service/auth/getUserInfo';
import { getEventById } from '../../../../service/events/getEventById';
import { Event } from '../../../../types/event.interface';

const EventDetailsPage = async ({
    params,
}: {
    params: Promise<{ 'event-id': string }>;
}) => {
    const { 'event-id': eventId } = await params;
    const [eventResult, userInfo] = await Promise.all([
        getEventById(eventId),
        getUserInfo(),
    ]);

    if (!eventResult.success || !eventResult.data) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='text-center space-y-4'>
                    <h1 className='text-3xl font-bold text-foreground'>
                        Event Not Found
                    </h1>
                    <p className='text-muted-foreground'>
                        The event you&apos;re looking for doesn&apos;t exist or
                        has been removed.
                    </p>
                </div>
            </div>
        );
    }

    const event: Event = eventResult.data;

    return <EventDetails event={event} userId={userInfo?.id} />;
};

export default EventDetailsPage;
