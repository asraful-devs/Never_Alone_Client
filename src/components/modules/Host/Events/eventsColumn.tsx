'use client';

import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/formatters';
import { Event } from '@/types/event.interface';
import { Column } from '../../../common/ManagementTable';
import { DateCell } from '../../../common/cell/DateCell';

export const eventsColumns: Column<Event>[] = [
    {
        header: 'Event',
        accessor: (event) => (
            <div className='flex flex-col'>
                <span className='font-medium text-sm line-clamp-2'>
                    {event.title}
                </span>
                <span className='text-xs text-muted-foreground mt-1'>
                    {event.category?.name && (
                        <Badge variant='secondary' className='text-xs'>
                            {event.category.name}
                        </Badge>
                    )}
                </span>
            </div>
        ),
        sortKey: 'title',
    },
    {
        header: 'Location',
        accessor: (event) => (
            <div className='text-sm'>
                <span>{event.location || 'N/A'}</span>
            </div>
        ),
    },
    {
        header: 'Date & Time',
        accessor: (event) => (
            <div className='flex flex-col text-sm'>
                <span className='font-medium'>
                    {formatDate(event.startDateTime)}
                </span>
                <span className='text-xs text-muted-foreground'>
                    Start:{' '}
                    {new Date(event.startDateTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
        ),
        sortKey: 'startDateTime',
    },
    {
        header: 'Seats / Fee',
        accessor: (event) => {
            const seatsAvailable = event.seats - event.userIds.length;
            const isSoldOut = seatsAvailable <= 0;
            return (
                <div className='flex flex-col text-sm'>
                    <span
                        className={
                            isSoldOut ? 'text-destructive font-medium' : ''
                        }
                    >
                        {seatsAvailable}/{event.seats}
                    </span>
                    <span className='text-xs text-muted-foreground'>
                        ${event.fee}
                    </span>
                </div>
            );
        },
    },
    {
        header: 'Attendees',
        accessor: (event) => (
            <div className='text-sm'>
                <span className='font-medium'>{event.userIds.length}</span>
            </div>
        ),
    },
    {
        header: 'Created',
        accessor: (event) => <DateCell date={event.createdAt} />,
        sortKey: 'createdAt',
    },
];
