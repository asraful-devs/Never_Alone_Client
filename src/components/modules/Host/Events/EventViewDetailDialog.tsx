'use client';

import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { formatDate, formatDateTime, formatTime } from '@/lib/formatters';
import { Event } from '@/types/event.interface';
import {
    Calendar,
    Clock,
    DollarSign,
    ImageIcon,
    MapPin,
    Users,
} from 'lucide-react';
import Image from 'next/image';

interface IEventViewDialogProps {
    open: boolean;
    onClose: () => void;
    event: Event | null;
}

const EventViewDetailDialog = ({
    open,
    onClose,
    event,
}: IEventViewDialogProps) => {
    if (!event) {
        return null;
    }

    const seatsAvailable = event.seats - event.userIds.length;
    const occupancyPercentage = (event.userIds.length / event.seats) * 100;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='min-w-5xl max-h-[90vh] flex flex-col p-0'>
                <DialogHeader className='px-6 pt-6 pb-4'>
                    <DialogTitle>Event Details</DialogTitle>
                </DialogHeader>

                <div className='flex-1 overflow-y-auto px-6 pb-6 space-y-6'>
                    {/* Event Image and Basic Info */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {/* Image */}
                        <div className='md:col-span-1'>
                            <div className='relative w-full h-48 rounded-lg overflow-hidden bg-slate-200 border border-border'>
                                {event.eventImage ? (
                                    <Image
                                        src={event.eventImage}
                                        alt={event.title}
                                        fill
                                        className='object-cover'
                                    />
                                ) : (
                                    <div className='w-full h-full flex items-center justify-center bg-muted'>
                                        <ImageIcon className='h-8 w-8 text-muted-foreground' />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className='md:col-span-2 space-y-4'>
                            <div>
                                <h2 className='text-3xl font-bold text-foreground'>
                                    {event.title}
                                </h2>
                                <div className='flex gap-2 mt-2 flex-wrap'>
                                    {event.category?.name && (
                                        <Badge>{event.category.name}</Badge>
                                    )}
                                    {seatsAvailable <= 0 && (
                                        <Badge variant='destructive'>
                                            Sold Out
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className='grid grid-cols-2 gap-3'>
                                <div className='bg-muted/50 p-3 rounded-lg'>
                                    <p className='text-xs text-muted-foreground'>
                                        Ticket Price
                                    </p>
                                    <p className='text-lg font-bold text-primary'>
                                        ${event.fee}
                                    </p>
                                </div>
                                <div className='bg-muted/50 p-3 rounded-lg'>
                                    <p className='text-xs text-muted-foreground'>
                                        Available Seats
                                    </p>
                                    <p className='text-lg font-bold'>
                                        {seatsAvailable}/{event.seats}
                                    </p>
                                </div>
                            </div>

                            {/* Occupancy Bar */}
                            <div className='space-y-2'>
                                <p className='text-sm font-medium text-muted-foreground'>
                                    Occupancy
                                </p>
                                <div className='w-full bg-secondary rounded-full h-2 overflow-hidden'>
                                    <div
                                        className={`h-full transition-all ${
                                            seatsAvailable <= 0
                                                ? 'bg-destructive'
                                                : 'bg-primary'
                                        }`}
                                        style={{
                                            width: `${occupancyPercentage}%`,
                                        }}
                                    ></div>
                                </div>
                                <p className='text-xs text-muted-foreground'>
                                    {event.userIds.length} of {event.seats}{' '}
                                    seats booked (
                                    {occupancyPercentage.toFixed(0)}%)
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Description */}
                    <div>
                        <h3 className='font-semibold text-lg mb-3'>
                            Description
                        </h3>
                        <p className='text-muted-foreground leading-relaxed whitespace-pre-wrap'>
                            {event.description}
                        </p>
                    </div>

                    <Separator />

                    {/* Location Section */}
                    <div>
                        <div className='flex items-center gap-2 mb-4'>
                            <MapPin className='h-5 w-5 text-primary' />
                            <h3 className='font-semibold text-lg'>Location</h3>
                        </div>
                        <div className='bg-muted/50 p-4 rounded-lg'>
                            <p className='text-foreground font-medium'>
                                {event.location}
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Date & Time Section */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <div className='flex items-center gap-2 mb-3'>
                                <Calendar className='h-5 w-5 text-primary' />
                                <h3 className='font-semibold'>
                                    Start Date & Time
                                </h3>
                            </div>
                            <div className='space-y-1 bg-muted/50 p-4 rounded-lg'>
                                <p className='text-foreground font-medium'>
                                    {formatDate(event.startDateTime)}
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    {formatTime(event.startDateTime)}
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    {new Date(
                                        event.startDateTime
                                    ).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                    })}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className='flex items-center gap-2 mb-3'>
                                <Clock className='h-5 w-5 text-primary' />
                                <h3 className='font-semibold'>
                                    End Date & Time
                                </h3>
                            </div>
                            <div className='space-y-1 bg-muted/50 p-4 rounded-lg'>
                                <p className='text-foreground font-medium'>
                                    {formatDate(event.endDateTime)}
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    {formatTime(event.endDateTime)}
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    {new Date(
                                        event.endDateTime
                                    ).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Statistics Section */}
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        <div className='bg-muted/50 p-4 rounded-lg text-center'>
                            <Users className='h-5 w-5 mx-auto mb-2 text-primary' />
                            <p className='text-xs text-muted-foreground mb-1'>
                                Attendees
                            </p>
                            <p className='text-2xl font-bold'>
                                {event.userIds.length}
                            </p>
                        </div>

                        <div className='bg-muted/50 p-4 rounded-lg text-center'>
                            <DollarSign className='h-5 w-5 mx-auto mb-2 text-primary' />
                            <p className='text-xs text-muted-foreground mb-1'>
                                Fee
                            </p>
                            <p className='text-2xl font-bold'>${event.fee}</p>
                        </div>

                        <div className='bg-muted/50 p-4 rounded-lg text-center'>
                            <Users className='h-5 w-5 mx-auto mb-2 text-primary' />
                            <p className='text-xs text-muted-foreground mb-1'>
                                Capacity
                            </p>
                            <p className='text-2xl font-bold'>{event.seats}</p>
                        </div>

                        <div className='bg-muted/50 p-4 rounded-lg text-center'>
                            <Calendar className='h-5 w-5 mx-auto mb-2 text-primary' />
                            <p className='text-xs text-muted-foreground mb-1'>
                                Available
                            </p>
                            <p className='text-2xl font-bold'>
                                {seatsAvailable}
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Host Information */}
                    {event.host && (
                        <div>
                            <div className='flex items-center gap-2 mb-4'>
                                <Users className='h-5 w-5 text-primary' />
                                <h3 className='font-semibold text-lg'>
                                    Host Information
                                </h3>
                            </div>
                            <div className='bg-muted/50 p-4 rounded-lg space-y-2'>
                                <div>
                                    <p className='text-xs text-muted-foreground'>
                                        Host Name
                                    </p>
                                    <p className='font-medium'>
                                        {event.host.name}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-xs text-muted-foreground'>
                                        Email
                                    </p>
                                    <p className='font-medium'>
                                        {event.host.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <Separator />

                    {/* Meta Information */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg'>
                        {/* <div>
                            <p className='text-xs text-muted-foreground mb-1'>
                                Event ID
                            </p>
                            <p className='text-xs font-mono break-all'>
                                {event.id}
                            </p>
                        </div> */}
                        <div>
                            <p className='text-xs text-muted-foreground mb-1'>
                                Created At
                            </p>
                            <p className='text-xs'>
                                {formatDateTime(event.createdAt)}
                            </p>
                        </div>
                        <div>
                            <p className='text-xs text-muted-foreground mb-1'>
                                Updated At
                            </p>
                            <p className='text-xs'>
                                {formatDateTime(event.updatedAt)}
                            </p>
                        </div>
                        <div>
                            <p className='text-xs text-muted-foreground mb-1'>
                                Host ID
                            </p>
                            <p className='text-xs font-mono break-all'>
                                {event.hostId}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EventViewDetailDialog;
