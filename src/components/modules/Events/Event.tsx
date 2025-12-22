'use client';

import { EventsResponse } from '@/types/event.interface';
import EventList from './EventList';
import EventPagination from './EventPagination';

interface EventProps {
    eventsData?: EventsResponse;
    isLoading?: boolean;
}

const Event = ({ eventsData, isLoading }: EventProps) => {
    const events = eventsData?.data?.data || [];
    const meta = eventsData?.data?.meta;

    // Calculate totalPages
    const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1;
    const paginationMeta = meta
        ? {
              total: meta.total,
              page: meta.page,
              limit: meta.limit,
              totalPages,
          }
        : {
              total: 0,
              page: 1,
              limit: 10,
              totalPages: 1,
          };

    return (
        <div className='min-h-screen bg-background py-12 px-4 md:px-8'>
            <div className='max-w-7xl mx-auto space-y-12'>
                {/* Header */}
                <div className='space-y-2 text-center'>
                    <h1 className='text-4xl md:text-5xl font-bold text-foreground'>
                        Discover Events
                    </h1>
                    <p className='text-lg text-muted-foreground'>
                        Find and join amazing events near you....
                    </p>
                </div>

                {/* Events Grid */}
                <EventList events={events} isLoading={isLoading} />

                {/* Pagination */}
                {events.length > 0 && <EventPagination meta={paginationMeta} />}
            </div>
        </div>
    );
};

export default Event;
