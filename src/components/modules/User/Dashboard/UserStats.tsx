'use client';

import { Card } from '@/components/ui/card';

interface Booking {
    id: string;
    eventId?: string;
    eventName?: string;
    seats?: number;
    totalPrice?: number;
    status?: string;
    createdAt?: string;
    event?: {
        name: string;
        startDate: string;
    };
}

interface Review {
    id: string;
    hostId?: string;
    hostName?: string;
    rating: number;
    comment?: string;
    createdAt?: string;
    host?: {
        name: string;
    };
}

interface UserStatsProps {
    bookings: Booking[];
    reviews: Review[];
}

const Bar = ({
    label,
    value,
    max,
}: {
    label: string;
    value: number;
    max: number;
}) => {
    const pct = max > 0 ? Math.round((value / max) * 100) : 0;
    return (
        <div>
            <div className='flex items-center justify-between mb-1'>
                <span className='text-sm font-medium'>{label}</span>
                <span className='text-sm font-bold text-foreground'>
                    {value}
                </span>
            </div>
            <div className='w-full bg-secondary rounded-full h-2 overflow-hidden'>
                <div
                    className='h-full bg-primary transition-all'
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
};

const StatTile = ({
    title,
    value,
    accent,
}: {
    title: string;
    value: number | string;
    accent: string;
}) => (
    <div className={`p-4 rounded-lg ${accent}`}>
        <p className='text-sm text-muted-foreground mb-1'>{title}</p>
        <p className='text-3xl font-bold'>{value}</p>
    </div>
);

const UserStats = ({ bookings, reviews }: UserStatsProps) => {
    const bookingStatuses: Record<string, number> = {};
    bookings.forEach((b) => {
        const status = b.status || 'pending';
        bookingStatuses[status] = (bookingStatuses[status] || 0) + 1;
    });

    const avgRating =
        reviews.length > 0
            ? (
                  reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
                  reviews.length
              ).toFixed(1)
            : 0;

    const maxBookingStatus = Math.max(...Object.values(bookingStatuses), 1);

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Booking Status Overview */}
            <Card className='p-6'>
                <h3 className='text-lg font-bold text-foreground mb-6'>
                    Booking Status
                </h3>
                <div className='space-y-4'>
                    {Object.entries(bookingStatuses).length > 0 ? (
                        Object.entries(bookingStatuses).map(
                            ([status, count]) => (
                                <Bar
                                    key={status}
                                    label={
                                        status.charAt(0).toUpperCase() +
                                        status.slice(1)
                                    }
                                    value={count}
                                    max={maxBookingStatus}
                                />
                            )
                        )
                    ) : (
                        <p className='text-muted-foreground text-sm text-center py-4'>
                            No bookings yet
                        </p>
                    )}
                </div>
            </Card>

            {/* Reviews & Activity Overview */}
            <Card className='p-6'>
                <h3 className='text-lg font-bold text-foreground mb-6'>
                    Activity Summary
                </h3>
                <div className='space-y-4'>
                    <StatTile
                        title='Total Reviews Given'
                        value={reviews.length}
                        accent='bg-blue-50 dark:bg-blue-950'
                    />
                    <StatTile
                        title='Average Rating'
                        value={`${avgRating}/5`}
                        accent='bg-amber-50 dark:bg-amber-950'
                    />
                </div>
            </Card>
        </div>
    );
};

export default UserStats;
