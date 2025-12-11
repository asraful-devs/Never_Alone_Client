'use client';

import { Button } from '@/components/ui/button';
import { deleteBooking } from '@/service/booking/bookingManagement';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

type BookingItem = {
    id: string;
    status?: string; // PENDING/...
    paymentStatus?: string; // UNPAID/PAID
    createdAt?: string;
    event?: {
        id: string;
        title: string;
        category?: { id: string; name: string } | null;
        host?: {
            id: string;
            name: string;
            email: string;
            profilePhoto?: string | null;
            rating?: number | null;
        } | null;
        fee?: number | null;
        startsAt?: string | null;
    };
    payment?: {
        id: string;
        amount: number;
        status: string; // UNPAID/PAID
        transactionId?: string;
        createdAt?: string;
    } | null;
};

const MyBookingsList = ({ bookings }: { bookings: BookingItem[] }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = (id: string) => {
        startTransition(async () => {
            const res = await deleteBooking(id);
            if (res?.success) {
                toast.success(res?.message || 'Booking deleted');
                router.refresh();
            } else {
                toast.error(res?.message || 'Failed to delete');
            }
        });
    };

    return (
        <div className='space-y-3'>
            {bookings.map((b) => (
                <div
                    key={b.id}
                    className='border rounded-lg p-3 flex items-center justify-between'
                >
                    <div className='space-y-1'>
                        <div className='font-medium'>
                            {b.event?.title || 'Event'}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                            {b.event?.startsAt
                                ? new Date(b.event.startsAt).toLocaleString()
                                : ''}
                        </div>
                        <div className='text-sm'>
                            {typeof b.event?.fee === 'number'
                                ? `Fee: $${b.event?.fee}`
                                : null}{' '}
                            {b.status ? `• ${b.status}` : null}{' '}
                            {b.paymentStatus ? `• ${b.paymentStatus}` : null}
                        </div>
                        {b.payment?.createdAt && (
                            <div className='text-xs text-muted-foreground'>
                                Payment created:{' '}
                                {new Date(b.payment.createdAt).toLocaleString()}
                            </div>
                        )}
                    </div>

                    <div className='flex items-center gap-2'>
                        <Button
                            variant='destructive'
                            size='sm'
                            disabled={isPending || b.paymentStatus === 'PAID'}
                            onClick={() => handleDelete(b.id)}
                        >
                            {isPending
                                ? 'Deleting...'
                                : b.paymentStatus === 'PAID'
                                ? 'Locked'
                                : 'Delete'}
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyBookingsList;
