'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { deleteBooking } from '@/service/booking/bookingManagement';
import {
    Calendar,
    DollarSign,
    ExternalLink,
    Mail,
    MapPin,
    Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface Booking {
    id: string;
    eventId: string;
    paymentStatus: 'PAID' | 'UNPAID';
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
    createdAt: string;
    event: {
        title: string;
        location?: string;
        startDate: string;
        fee: number;
        host: {
            name: string;
            email: string;
        };
    };
    payment?: {
        amount: number;
        status: string;
        transactionId?: string;
    };
}

interface Props {
    bookings: Booking[];
    userEmail?: string; // ✅ User email pass করুন
}

export default function MyBookingsList({ bookings, userEmail }: Props) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleDelete = async (bookingId: string) => {
        if (!confirm('Are you sure you want to cancel this booking?')) return;

        setLoadingId(bookingId);

        toast.promise(deleteBooking(bookingId), {
            loading: 'Cancelling booking...',
            success: (result) => {
                if (result.success) {
                    router.refresh();
                    return 'Booking cancelled successfully!';
                }
                throw new Error(result.message || 'Failed to cancel');
            },
            error: (err) => err.message || 'Failed to cancel booking',
        });

        setLoadingId(null);
    };

    const handleCheckEmail = () => {
        if (userEmail) {
            // ✅ Gmail/Outlook/Yahoo automatically খুলবে
            const mailtoLink = `mailto:${userEmail}`;
            window.open(mailtoLink, '_blank');

            toast.success('Opening your email...', {
                description: 'Check your inbox for the payment link',
                duration: 4000,
            });
        } else {
            toast.info('Check your email inbox', {
                description:
                    'Payment link has been sent to your registered email',
                duration: 4000,
            });
        }
    };

    return (
        <div className='grid gap-4'>
            {bookings.map((booking) => (
                <Card
                    key={booking.id}
                    className='overflow-hidden border-border'
                >
                    <CardHeader className='bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-b border-border'>
                        <div className='flex items-start justify-between gap-4'>
                            <div className='flex-1 min-w-0'>
                                <CardTitle className='text-lg mb-2 text-foreground'>
                                    {booking.event.title}
                                </CardTitle>
                                <div className='flex flex-wrap gap-3 text-sm text-muted-foreground'>
                                    <span className='flex items-center gap-1'>
                                        <Calendar className='w-4 h-4 shrink-0' />
                                        <span className='truncate'>
                                            {new Date(
                                                booking.event.startDate
                                            ).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </span>
                                    {booking.event.location && (
                                        <span className='flex items-center gap-1'>
                                            <MapPin className='w-4 h-4 shrink-0' />
                                            <span className='truncate'>
                                                {booking.event.location}
                                            </span>
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 items-end shrink-0'>
                                <Badge
                                    variant={
                                        booking.paymentStatus === 'PAID'
                                            ? 'default'
                                            : 'destructive'
                                    }
                                    className='text-xs'
                                >
                                    {booking.paymentStatus}
                                </Badge>
                                <Badge
                                    variant={
                                        booking.status === 'CONFIRMED'
                                            ? 'default'
                                            : booking.status === 'PENDING'
                                            ? 'secondary'
                                            : 'destructive'
                                    }
                                    className='text-xs'
                                >
                                    {booking.status}
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className='pt-4 bg-card'>
                        <div className='space-y-3'>
                            {/* Host Info */}
                            <div className='flex items-center justify-between text-sm'>
                                <span className='text-muted-foreground'>
                                    Host:
                                </span>
                                <span className='font-medium text-foreground'>
                                    {booking.event.host.name}
                                </span>
                            </div>

                            {/* Amount */}
                            <div className='flex items-center justify-between text-sm'>
                                <span className='text-muted-foreground'>
                                    Amount:
                                </span>
                                <span className='font-semibold text-lg flex items-center gap-1 text-foreground'>
                                    <DollarSign className='w-4 h-4' />
                                    {booking.event.fee} BDT
                                </span>
                            </div>

                            {/* Transaction ID (if paid) */}
                            {booking.payment?.transactionId && (
                                <div className='text-xs text-muted-foreground bg-muted/50 p-2 rounded border border-border'>
                                    <span className='font-medium'>
                                        Transaction:
                                    </span>{' '}
                                    {booking.payment.transactionId}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className='flex gap-2 pt-2'>
                                {booking.paymentStatus === 'UNPAID' && (
                                    <Button
                                        className='flex-1 flex items-center gap-2'
                                        variant='default'
                                        onClick={handleCheckEmail}
                                    >
                                        <Mail className='w-4 h-4' />
                                        Check Email for Payment
                                        <ExternalLink className='w-3 h-3 ml-auto' />
                                    </Button>
                                )}

                                <Button
                                    variant='destructive'
                                    size='icon'
                                    onClick={() => handleDelete(booking.id)}
                                    disabled={loadingId === booking.id}
                                    className='shrink-0'
                                >
                                    <Trash2 className='w-4 h-4' />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
