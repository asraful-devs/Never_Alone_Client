'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { getUserInfo } from '@/service/auth/getUserInfo';

import { Event } from '@/types/event.interface';
import { UserInfo } from '@/types/user.interface';
import { Calendar, DollarSign, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getEvents } from '../../../../service/events/eventsManagement';
import EventsChart from './EventsChart';
import HostInfo from './HostInfo';
import HostStatsCard from './HostStatsCard';
import RecentEvents from './RecentEvents';

const HostDashboardClient = () => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch user info
                const userInfo = await getUserInfo();
                if (userInfo) {
                    setUser(userInfo);
                }

                // Fetch events
                const result = await getEvents();
                if (result.success && result.data?.data) {
                    setEvents(result.data.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Calculate statistics
    const totalEvents = events.length;
    const totalRegistrations = events.reduce(
        (sum, event) => sum + event.userIds.length,
        0
    );
    const totalRevenue = events.reduce(
        (sum, event) => sum + event.fee * event.userIds.length,
        0
    );
    const upcomingEvents = events.filter(
        (e) => new Date(e.startDateTime) > new Date()
    ).length;

    if (isLoading) {
        return (
            <div className='space-y-8'>
                {/* Header Skeleton */}
                <Skeleton className='h-32 w-full' />

                {/* Stats Skeleton */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className='h-32' />
                    ))}
                </div>

                {/* Charts Skeleton */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <Skeleton className='h-80' />
                    <Skeleton className='h-80' />
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='text-center'>
                    <p className='text-muted-foreground'>
                        Please login to view dashboard
                    </p>
                </div>
            </div>
        );
    }

    const host = {
        id: user.id || '',
        name: user.name || 'Host',
        email: user.email || '',
        phoneNumber: user.phoneNumber,
        location: user.location,
        profilePhoto: user.profilePhoto,
        bio: user.bio,
        createdAt: user.createdAt || new Date().toISOString(),
    };

    return (
        <div className='space-y-8'>
            {/* Host Info Card */}
            <HostInfo host={host} />

            {/* Statistics Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <HostStatsCard
                    title='Total Events'
                    value={totalEvents}
                    description={`${upcomingEvents} upcoming`}
                    icon={Calendar}
                    bgColor='bg-blue-50 dark:bg-blue-950'
                    iconColor='text-blue-600 dark:text-blue-400'
                    trend={{
                        value: 12,
                        isPositive: true,
                    }}
                />

                <HostStatsCard
                    title='Total Registrations'
                    value={totalRegistrations}
                    description='Across all events'
                    icon={Users}
                    bgColor='bg-green-50 dark:bg-green-950'
                    iconColor='text-green-600 dark:text-green-400'
                    trend={{
                        value: 8,
                        isPositive: true,
                    }}
                />

                <HostStatsCard
                    title='Revenue Generated'
                    value={`$${totalRevenue.toLocaleString()}`}
                    description='From ticket sales'
                    icon={DollarSign}
                    bgColor='bg-purple-50 dark:bg-purple-950'
                    iconColor='text-purple-600 dark:text-purple-400'
                    trend={{
                        value: 15,
                        isPositive: true,
                    }}
                />

                <HostStatsCard
                    title='Avg. Registration'
                    value={
                        totalEvents > 0
                            ? Math.round(totalRegistrations / totalEvents)
                            : 0
                    }
                    description='Per event'
                    icon={TrendingUp}
                    bgColor='bg-orange-50 dark:bg-orange-950'
                    iconColor='text-orange-600 dark:text-orange-400'
                />
            </div>

            {/* Charts and Analytics */}
            <EventsChart events={events} />

            {/* Recent Events */}
            <RecentEvents events={events} />
        </div>
    );
};

export default HostDashboardClient;
