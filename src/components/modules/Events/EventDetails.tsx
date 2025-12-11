'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatDate, formatTime } from '@/lib/formatters';
import { Event } from '@/types/event.interface';
import { Calendar, Clock, DollarSign, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface EventDetailsProps {
    event: Event;
}

const EventDetails = ({ event }: EventDetailsProps) => {
    const seatsAvailable = event.seats - event.userIds.length;
    const isSoldOut = seatsAvailable <= 0;
    const occupancyPercentage = (event.userIds.length / event.seats) * 100;

    return (
        <div className='min-h-screen bg-background py-8 px-4 md:px-8'>
            {/* Back Button */}
            <Link href='/events'>
                <Button variant='outline' className='mb-6'>
                    ← Back to Events
                </Button>
            </Link>

            <div className='max-w-6xl mx-auto space-y-8'>
                {/* Hero Section */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Main Image */}
                    <div className='lg:col-span-2 space-y-4'>
                        <div className='relative h-96 w-full rounded-lg overflow-hidden bg-slate-200'>
                            <Image
                                src={event.eventImage}
                                alt={event.title}
                                fill
                                className='object-cover'
                                priority
                            />
                        </div>

                        {/* Event Title and Category */}
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-start justify-between gap-4 flex-wrap'>
                                <div className='flex-1'>
                                    <h1 className='text-3xl md:text-4xl font-bold text-foreground mb-2'>
                                        {event.title}
                                    </h1>
                                    {event?.category?.name && (
                                        <div className='flex items-center gap-2'>
                                            <Badge className='text-base'>
                                                {event.category.name}
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                                <div className='text-right'>
                                    <p className='text-3xl font-bold text-primary'>
                                        ${event.fee}
                                    </p>
                                    <p className='text-sm text-muted-foreground'>
                                        per ticket
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Booking Card */}
                    <div>
                        <Card className='p-6 sticky top-4 space-y-6'>
                            {/* Price and CTA */}
                            <div className='space-y-3'>
                                <div className='border-b pb-3'>
                                    <div className='flex justify-between mb-2'>
                                        <span className='text-muted-foreground'>
                                            Price per ticket
                                        </span>
                                        <span className='font-semibold'>
                                            ${event.fee}
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    className='w-full h-12'
                                    disabled={isSoldOut}
                                    size='lg'
                                >
                                    {isSoldOut ? 'Sold Out' : 'Register Now'}
                                </Button>
                            </div>

                            {/* Availability */}
                            <div className='space-y-3 border-t pt-4'>
                                <h3 className='font-semibold text-foreground'>
                                    Availability
                                </h3>
                                <div className='space-y-2'>
                                    <div className='flex justify-between text-sm'>
                                        <span className='text-muted-foreground'>
                                            Seats
                                        </span>
                                        <span className='font-medium'>
                                            {seatsAvailable} of {event.seats}{' '}
                                            left
                                        </span>
                                    </div>
                                    <div className='w-full bg-secondary rounded-full h-2 overflow-hidden'>
                                        <div
                                            className={`h-full transition-all ${
                                                isSoldOut
                                                    ? 'bg-destructive'
                                                    : 'bg-primary'
                                            }`}
                                            style={{
                                                width: `${occupancyPercentage}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Share */}
                            <div className='border-t pt-4'>
                                <p className='text-sm font-medium text-muted-foreground mb-3'>
                                    Share Event
                                </p>
                                <div className='flex gap-2'>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        className='flex-1'
                                    >
                                        Facebook
                                    </Button>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        className='flex-1'
                                    >
                                        Twitter
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Content Sections */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Main Content */}
                    <div className='lg:col-span-2 space-y-8'>
                        {/* About the Event */}
                        <Card className='p-6 space-y-4'>
                            <h2 className='text-2xl font-bold text-foreground'>
                                About this Event
                            </h2>
                            <p className='text-muted-foreground leading-relaxed whitespace-pre-wrap'>
                                {event.description}
                            </p>
                        </Card>

                        {/* Date & Time */}
                        <Card className='p-6 space-y-4'>
                            <h2 className='text-2xl font-bold text-foreground mb-4'>
                                Date & Time
                            </h2>
                            <div className='space-y-4'>
                                <div className='flex items-start gap-4'>
                                    <Calendar className='text-primary mt-1 shrink-0' />
                                    <div>
                                        <p className='font-semibold text-foreground'>
                                            Start Date
                                        </p>
                                        <p className='text-muted-foreground'>
                                            {formatDate(event.startDateTime)}
                                        </p>
                                        <p className='text-sm text-muted-foreground'>
                                            {formatTime(event.startDateTime)}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-start gap-4'>
                                    <Clock className='text-primary mt-1 shrink-0' />
                                    <div>
                                        <p className='font-semibold text-foreground'>
                                            End Date
                                        </p>
                                        <p className='text-muted-foreground'>
                                            {formatDate(event.endDateTime)}
                                        </p>
                                        <p className='text-sm text-muted-foreground'>
                                            {formatTime(event.endDateTime)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Location */}
                        <Card className='p-6 space-y-4'>
                            <h2 className='text-2xl font-bold text-foreground mb-4'>
                                Location
                            </h2>
                            <div className='flex items-start gap-4'>
                                <MapPin
                                    className='text-primary mt-1 shrink-0'
                                    size={24}
                                />
                                <div className='flex-1'>
                                    <p className='font-semibold text-foreground text-lg'>
                                        {event.location}
                                    </p>
                                    <p className='text-muted-foreground text-sm mt-2'>
                                        Open in maps
                                    </p>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className='w-full h-64 bg-slate-200 rounded-lg mt-4 flex items-center justify-center'>
                                <p className='text-muted-foreground'>
                                    Map Integration Coming Soon
                                </p>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className='space-y-6'>
                        {/* Host Card */}
                        <Card className='p-6 space-y-4'>
                            <h2 className='text-xl font-bold text-foreground'>
                                Event Host
                            </h2>
                            {event?.host ? (
                                <div className='space-y-3'>
                                    <div className='flex items-start gap-3'>
                                        <div className='w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold'>
                                            {event.host.name?.charAt(0) || 'H'}
                                        </div>
                                        <div className='flex-1'>
                                            <p className='font-semibold text-foreground'>
                                                {event.host.name || 'Host'}
                                            </p>
                                            <p className='text-sm text-muted-foreground break-all'>
                                                {event.host.email ||
                                                    'No email provided'}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        className='w-full'
                                        variant='outline'
                                    >
                                        Contact Host
                                    </Button>
                                </div>
                            ) : (
                                <p className='text-muted-foreground'>
                                    Host information not available
                                </p>
                            )}
                        </Card>

                        {/* Quick Info */}
                        <Card className='p-6 space-y-4'>
                            <h2 className='text-xl font-bold text-foreground'>
                                Quick Info
                            </h2>
                            <div className='space-y-4'>
                                <div className='flex items-center justify-between'>
                                    <span className='text-muted-foreground flex items-center gap-2'>
                                        <Users
                                            size={18}
                                            className='text-primary'
                                        />
                                        Attendees
                                    </span>
                                    <span className='font-semibold'>
                                        {event.userIds.length}
                                    </span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-muted-foreground flex items-center gap-2'>
                                        <DollarSign
                                            size={18}
                                            className='text-primary'
                                        />
                                        Ticket Price
                                    </span>
                                    <span className='font-semibold'>
                                        ${event.fee}
                                    </span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-muted-foreground flex items-center gap-2'>
                                        <Users
                                            size={18}
                                            className='text-primary'
                                        />
                                        Total Capacity
                                    </span>
                                    <span className='font-semibold'>
                                        {event.seats}
                                    </span>
                                </div>
                            </div>
                        </Card>

                        {/* Event ID */}
                        {/* <Card className='p-4 bg-slate-50 dark:bg-slate-900'>
                            <p className='text-xs text-muted-foreground mb-1'>
                                Event ID
                            </p>
                            <p className='text-xs font-mono break-all text-foreground'>
                                {event.id}
                            </p>
                        </Card> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
