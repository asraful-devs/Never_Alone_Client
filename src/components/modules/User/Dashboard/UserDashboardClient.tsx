/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { getUserInfo } from '@/service/auth/getUserInfo';
import { getUserBookings } from '@/service/booking/bookingManagement';
import { getReviews } from '@/service/review/reviewManagement';
import { UserInfo as UserInfoType } from '@/types/user.interface';
import { Bookmark, MessageSquare, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import HostStatsCard from '../../Host/Dashboard/HostStatsCard';
import RecentActivityList from './RecentActivityList';
import UserInfoCard from './UserInfo';
import UserStats from './UserStats';

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

const UserDashboardClient = () => {
    const [user, setUser] = useState<UserInfoType | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const extractList = (response: any) => {
        if (!response || !response.success) return [];
        if (Array.isArray(response.data)) return response.data;
        if (Array.isArray(response.data?.data)) return response.data.data;
        return [];
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                // Fetch user info
                const userInfo = await getUserInfo();
                if (userInfo) {
                    setUser(userInfo);
                }

                // Fetch user bookings and reviews
                const [bookingsResponse, reviewsResponse] = await Promise.all([
                    getUserBookings({}).catch(() => null),
                    getReviews().catch(() => null),
                ]);

                // Process Bookings
                const bookingsData = extractList(bookingsResponse);
                setBookings(bookingsData);

                // Process Reviews
                const reviewsData = extractList(reviewsResponse);
                setReviews(reviewsData);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className='space-y-8'>
                <Skeleton className='h-32 w-full' />
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className='h-28' />
                    ))}
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <Skeleton className='h-80' />
                    <Skeleton className='h-80' />
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className='flex items-center justify-center min-h-[40vh]'>
                <p className='text-muted-foreground'>
                    Please login to view your dashboard
                </p>
            </div>
        );
    }

    const averageRating =
        reviews.length > 0
            ? (
                  reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
                  reviews.length
              ).toFixed(1)
            : 0;

    return (
        <div className='space-y-8'>
            {/* User Profile Card */}
            <UserInfoCard
                name={user.name || 'User'}
                email={user.email}
                profilePhoto={user.profilePhoto}
                createdAt={user.createdAt}
            />

            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <HostStatsCard
                    title='Total Bookings'
                    value={bookings.length}
                    description='Events booked'
                    icon={Bookmark}
                    bgColor='bg-blue-50 dark:bg-blue-950'
                    iconColor='text-blue-600 dark:text-blue-400'
                    trend={{
                        value: bookings.length > 0 ? 1 : 0,
                        isPositive: true,
                    }}
                />
                <HostStatsCard
                    title='My Reviews'
                    value={reviews.length}
                    description='Hosts reviewed'
                    icon={MessageSquare}
                    bgColor='bg-emerald-50 dark:bg-emerald-950'
                    iconColor='text-emerald-600 dark:text-emerald-400'
                    trend={{
                        value: reviews.length > 0 ? 1 : 0,
                        isPositive: true,
                    }}
                />
                <HostStatsCard
                    title='Average Rating Given'
                    value={averageRating}
                    description='Rating average'
                    icon={Star}
                    bgColor='bg-amber-50 dark:bg-amber-950'
                    iconColor='text-amber-600 dark:text-amber-400'
                />
            </div>

            {/* Stats Overview */}
            <UserStats bookings={bookings} reviews={reviews} />

            {/* Recent Activity */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <RecentActivityList
                    title='Recent Bookings'
                    items={bookings.map((b) => ({
                        id: b.id,
                        name: b.event?.name || b.eventName || 'Unknown Event',
                        email: `${b.seats || 1} seat(s)`,
                        detail: b.status || 'Pending',
                        createdAt: b.createdAt,
                    }))}
                    emptyText='No bookings found'
                    viewAllHref='/user/dashboard/my-bookings'
                    icon='booking'
                />
                <RecentActivityList
                    title='My Reviews'
                    items={reviews.map((r) => ({
                        id: r.id,
                        name: r.host?.name || r.hostName || 'Unknown Host',
                        email: `Rating: ${r.rating}/5`,
                        detail: r.comment || 'No comment',
                        createdAt: r.createdAt,
                    }))}
                    emptyText='No reviews found'
                    viewAllHref='/user/dashboard/my-reviews'
                    icon='review'
                />
            </div>
        </div>
    );
};

export default UserDashboardClient;
