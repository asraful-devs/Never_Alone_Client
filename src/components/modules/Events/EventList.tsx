'use client';

import { Event } from '@/types/event.interface';
import EventCard from './EventCard';

interface EventListProps {
    events: Event[];
    isLoading?: boolean;
}

const EventList = ({ events, isLoading }: EventListProps) => {
    if (isLoading) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className='bg-slate-200 rounded-lg h-96 animate-pulse'
                    ></div>
                ))}
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center py-16'>
                <svg
                    className='w-16 h-16 text-muted-foreground mb-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                </svg>
                <p className='text-lg font-medium text-muted-foreground'>
                    No events found
                </p>
                <p className='text-sm text-muted-foreground mt-2'>
                    Check back later for upcoming events
                </p>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
};

export default EventList;
