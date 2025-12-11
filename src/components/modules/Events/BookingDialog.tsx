/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { createBooking } from '@/service/booking/bookingManagement';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

interface Event {
    id: string;
    title: string;
    fee?: number;
    seats: number;
    userIds?: string[];
}

interface BookingDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    event: Event;
    userId: string;
}

const BookingDialog = ({
    open,
    onClose,
    onSuccess,
    event,
    userId,
}: BookingDialogProps) => {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const prevStateRef = useRef<any>(null);
    const [state, setState] = useState<any>(null);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            try {
                const result = await createBooking(null, formData);
                setState(result);
            } catch (error: any) {
                console.error('Booking error:', error);
                setState({
                    success: false,
                    message: error?.message || 'Something went wrong',
                });
            }
        });
    };

    const seatsAvailable = event.seats - (event.userIds?.length || 0);

    useEffect(() => {
        if (!state || state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            if (state?.paymentUrl) {
                window.open(state.paymentUrl, '_blank', 'noopener,noreferrer');
            }
            toast.success('Booking created');
            formRef.current?.reset();
            onSuccess();
            onClose();
            router.push('/user/dashboard/my-bookings');
        } else if (state?.message) {
            toast.error(state.message);
        }
    }, [state, onClose, onSuccess, router]);

    const handleClose = () => {
        formRef.current?.reset();
        prevStateRef.current = null;
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className='max-w-md p-0'>
                <DialogHeader className='px-6 pt-6 pb-4'>
                    <DialogTitle>Complete Your Booking</DialogTitle>
                    <DialogDescription>{event.title}</DialogDescription>
                </DialogHeader>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className='flex flex-col px-6 pb-6 space-y-4'
                >
                    {/* Hidden fields */}
                    <input type='hidden' name='eventId' value={event.id} />
                    <input type='hidden' name='userId' value={userId} />

                    {/* Event Info Display */}
                    <div className='bg-muted p-3 rounded-lg space-y-2 text-sm'>
                        <div className='flex justify-between'>
                            <span className='text-muted-foreground'>
                                Ticket Price
                            </span>
                            <span className='font-semibold'>
                                ${event.fee ?? 0}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-muted-foreground'>
                                Available Seats
                            </span>
                            <span className='font-semibold'>
                                {seatsAvailable}
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className='flex gap-2 pt-4'>
                        <Button
                            type='button'
                            variant='outline'
                            onClick={handleClose}
                            disabled={isPending}
                            className='flex-1'
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            disabled={isPending}
                            className='flex-1'
                        >
                            {isPending ? 'Booking...' : 'Confirm Booking'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BookingDialog;
