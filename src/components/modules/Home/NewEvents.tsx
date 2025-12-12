'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { formatDateTime } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { Event } from '@/types/event.interface';
import Link from 'next/link';

interface NewEventsProps {
    events: Event[];
    className?: string;
}

const NewEvents = ({ events = [], className }: NewEventsProps) => {
    const topThree = Array.isArray(events) ? events.slice(0, 3) : [];

    if (topThree.length === 0) return null;

    return (
        <section
            className={cn(
                'space-y-6 rounded-2xl bg-muted/40 p-4 md:p-6',
                className
            )}
            aria-label='Top Events'
        >
            <div className='text-center space-y-2'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
                    Trending
                </p>
                <h2 className='text-2xl font-semibold'>Top Events</h2>
                <p className='text-sm text-muted-foreground'>
                    Discover trending activities near you
                </p>
            </div>

            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                {topThree.map((ev) => (
                    <Card
                        key={ev.id}
                        className='overflow-hidden border-none shadow-lg shadow-black/5 transition hover:-translate-y-1 hover:shadow-xl'
                    >
                        <CardHeader className='gap-3 pb-2'>
                            <CardTitle className='text-lg leading-tight'>
                                {ev.title}
                            </CardTitle>
                            <CardDescription className='flex items-center gap-2 text-sm'>
                                <span className='inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-primary'>
                                    {ev.location}
                                </span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted'>
                                {ev.eventImage ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={ev.eventImage}
                                        alt={ev.title}
                                        className='h-full w-full object-cover transition duration-500 hover:scale-105'
                                        loading='lazy'
                                    />
                                ) : (
                                    <div className='flex h-full w-full items-center justify-center text-muted-foreground'>
                                        No image
                                    </div>
                                )}
                                <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent' />
                            </div>

                            <div className='flex items-center justify-between text-sm'>
                                <span className='font-semibold text-foreground'>
                                    {ev.fee > 0 ? `${ev.fee} ৳` : 'Free'}
                                </span>
                                <span className='text-muted-foreground'>
                                    Seats: {ev.seats}
                                </span>
                            </div>

                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Avatar className='size-9'>
                                        <AvatarFallback>
                                            {ev.host?.name
                                                ?.slice(0, 2)
                                                ?.toUpperCase() || 'HN'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className='text-sm font-semibold leading-tight'>
                                            {ev.host?.name || 'Host'}
                                        </p>
                                        <p className='text-xs text-muted-foreground leading-tight'>
                                            {formatDateTime(ev.startDateTime)}
                                        </p>
                                    </div>
                                </div>

                                <Button asChild size='sm' variant='secondary'>
                                    <Link href={`/events/${ev.id}`}>
                                        View details
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className='flex justify-center pt-2'>
                <Button asChild size='lg'>
                    <Link href='/events'>Explore more events</Link>
                </Button>
            </div>
        </section>
    );
};

export default NewEvents;
