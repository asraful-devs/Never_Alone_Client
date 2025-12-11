'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/formatters';
import { Event } from '@/types/event.interface';
import { Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface EventCardProps {
    event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
    const seatsAvailable = event.seats - event.userIds.length;
    const isSoldOut = seatsAvailable <= 0;

    return (
        <Card className='overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group'>
            {/* Image Container */}
            <div className='relative h-48 w-full overflow-hidden bg-slate-200'>
                <Image
                    src={event.eventImage}
                    alt={event.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
                {/* Category Badge */}
                <div className='absolute top-3 left-3'>
                    <Badge
                        className={`bg-${event.category.color}-500 hover:bg-${event.category.color}-600`}
                    >
                        {event.category.name}
                    </Badge>
                </div>

                {/* Sold Out Badge */}
                {isSoldOut && (
                    <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                        <Badge
                            variant='destructive'
                            className='text-lg py-2 px-4'
                        >
                            Sold Out
                        </Badge>
                    </div>
                )}

                {/* Fee Badge */}
                <div className='absolute top-3 right-3 bg-white rounded-lg px-3 py-1 font-bold text-black'>
                    ${event.fee}
                </div>
            </div>

            {/* Content Container */}
            <div className='p-4 flex flex-col grow space-y-3'>
                {/* Title */}
                <h3 className='text-lg font-bold line-clamp-2 text-foreground hover:text-primary transition-colors'>
                    {event.title}
                </h3>

                {/* Host Info */}
                <div className='text-sm text-muted-foreground'>
                    <p className='font-medium text-foreground'>
                        By {event.host.name}
                    </p>
                </div>

                {/* Description */}
                <p className='text-sm text-muted-foreground line-clamp-2'>
                    {event.description}
                </p>

                {/* Date and Time */}
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <Calendar size={16} className='text-primary' />
                    <span>{formatDate(event.startDateTime)}</span>
                </div>

                {/* Location */}
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <MapPin size={16} className='text-primary' />
                    <span className='truncate'>{event.location}</span>
                </div>

                {/* Seats Available */}
                <div className='flex items-center gap-2 text-sm'>
                    <Users size={16} className='text-primary' />
                    <span
                        className={
                            isSoldOut
                                ? 'text-destructive font-medium'
                                : 'text-muted-foreground'
                        }
                    >
                        {seatsAvailable > 0
                            ? `${seatsAvailable} of ${event.seats} seats available`
                            : 'No seats available'}
                    </span>
                </div>

                {/* Divider */}
                <div className='border-t border-border mt-2'></div>

                {/* View Details Button */}
                <Link href={`/events/${event.id}`} className='mt-auto'>
                    <Button
                        className='w-full'
                        disabled={isSoldOut}
                        variant={isSoldOut ? 'secondary' : 'default'}
                    >
                        View Details
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default EventCard;
