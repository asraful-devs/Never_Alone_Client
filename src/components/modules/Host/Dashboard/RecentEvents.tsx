'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatDate, formatTime } from '@/lib/formatters';
import { Event } from '@/types/event.interface';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface RecentEventsProps {
    events: Event[];
}

const RecentEvents = ({ events }: RecentEventsProps) => {
    const upcomingEvents = events
        .filter((e) => new Date(e.startDateTime) > new Date())
        .slice(0, 5);

    return (
        <Card className='p-6'>
            <div className='flex items-center justify-between mb-6'>
                <h3 className='text-lg font-bold text-foreground'>
                    Upcoming Events
                </h3>
                <Link href='/host/events'>
                    <Button variant='ghost' size='sm' className='gap-2'>
                        View All
                        <ArrowRight size={16} />
                    </Button>
                </Link>
            </div>

            {upcomingEvents.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-8'>
                    <Calendar className='h-12 w-12 text-muted-foreground mb-2 opacity-50' />
                    <p className='text-muted-foreground text-sm'>
                        No upcoming events
                    </p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {upcomingEvents.map((event) => {
                        const seatsAvailable =
                            event.seats - event.userIds.length;
                        const isSoldOut = seatsAvailable <= 0;

                        return (
                            <Link
                                key={event.id}
                                href={`/host/events`}
                                className='block'
                            >
                                <div className='p-4 rounded-lg border border-border hover:border-primary hover:bg-accent transition-all group'>
                                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                                        {/* Image */}
                                        <div className='relative h-20 rounded-lg overflow-hidden bg-muted'>
                                            {event.eventImage ? (
                                                <Image
                                                    src={event.eventImage}
                                                    alt={event.title}
                                                    fill
                                                    className='object-cover group-hover:scale-110 transition-transform'
                                                />
                                            ) : (
                                                <div className='w-full h-full flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900'>
                                                    <Calendar className='h-8 w-8 text-muted-foreground opacity-30' />
                                                </div>
                                            )}
                                        </div>

                                        {/* Title & Info */}
                                        <div className='flex flex-col justify-between'>
                                            <div>
                                                <h4 className='font-semibold text-foreground group-hover:text-primary line-clamp-1'>
                                                    {event.title}
                                                </h4>
                                                <div className='flex items-center gap-2 mt-1'>
                                                    <Calendar className='h-3 w-3 text-muted-foreground' />
                                                    <span className='text-xs text-muted-foreground'>
                                                        {formatDate(
                                                            event.startDateTime
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            {event.category?.name && (
                                                <Badge
                                                    variant='secondary'
                                                    className='w-fit text-xs'
                                                >
                                                    {event.category.name}
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Location & Time */}
                                        <div>
                                            <div className='flex items-start gap-2'>
                                                <MapPin className='h-4 w-4 text-muted-foreground shrink-0 mt-0.5' />
                                                <div>
                                                    <p className='text-xs text-muted-foreground'>
                                                        Location
                                                    </p>
                                                    <p className='text-sm font-medium line-clamp-1'>
                                                        {event.location}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-2 mt-2'>
                                                <Calendar className='h-3 w-3 text-muted-foreground' />
                                                <span className='text-xs text-muted-foreground'>
                                                    {formatTime(
                                                        event.startDateTime
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Seats & Registration */}
                                        <div className='flex flex-col items-end justify-between'>
                                            <div className='text-right'>
                                                <p className='text-xs text-muted-foreground'>
                                                    Registrations
                                                </p>
                                                <div className='flex items-center gap-2 mt-1'>
                                                    <Users className='h-4 w-4 text-primary' />
                                                    <span className='text-lg font-bold'>
                                                        {event.userIds.length}
                                                    </span>
                                                </div>
                                            </div>
                                            {isSoldOut ? (
                                                <Badge variant='destructive'>
                                                    Sold Out
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    variant='outline'
                                                    className={
                                                        seatsAvailable <=
                                                        event.seats * 0.2
                                                            ? 'border-orange-500 text-orange-700'
                                                            : ''
                                                    }
                                                >
                                                    {seatsAvailable} left
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </Card>
    );
};

export default RecentEvents;
