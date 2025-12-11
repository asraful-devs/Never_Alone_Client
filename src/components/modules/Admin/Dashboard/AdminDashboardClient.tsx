/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { getAdmins } from '@/service/admin/adminsManagement';
import { getCategories } from '@/service/admin/CategoriesManagement';
import { getUserInfo } from '@/service/auth/getUserInfo';
import { getEvents } from '@/service/events/eventsManagement';
import { UserInfo } from '@/types/user.interface';
import { CalendarDays, FolderTree, Shield, UserCog, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getHosts } from '../../../../service/admin/hostsManagement';
import { getUsers } from '../../../../service/admin/usersManagement';
import HostStatsCard from '../../Host/Dashboard/HostStatsCard';
import AdminInfo from './AdminInfo';
import RecentList from './RecentList';
import SystemOverview from './SystemOverview';

interface ItemBase {
    id?: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
    createdAt?: string | Date;
}

const AdminDashboardClient = () => {
    const [admin, setAdmin] = useState<UserInfo | null>(null);
    const [admins, setAdmins] = useState<ItemBase[]>([]);
    const [hosts, setHosts] = useState<ItemBase[]>([]);
    const [users, setUsers] = useState<ItemBase[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Total counts
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalHosts, setTotalHosts] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [totalEvents, setTotalEvents] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);

    const extractList = (response: any) => {
        if (!response || !response.success) return [];
        if (Array.isArray(response.data)) return response.data;
        if (Array.isArray(response.data?.data)) return response.data.data;
        return [];
    };

    const extractTotal = (response: any, fallbackLength: number) => {
        if (!response || !response.success) return 0;
        if (typeof response.meta?.total === 'number')
            return response.meta.total;
        return fallbackLength;
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                // Fetch admin info first
                const me = await getUserInfo();
                if (me) {
                    setAdmin(me);
                }

                // Fetch all data together using Promise.all
                const [
                    adminsResponse,
                    hostsResponse,
                    usersResponse,
                    eventsResponse,
                    categoriesResponse,
                ] = await Promise.all([
                    getAdmins().catch(() => null),
                    getHosts().catch(() => null),
                    getUsers().catch(() => null),
                    getEvents().catch(() => null),
                    getCategories().catch(() => null),
                ]);

                // Process Admins
                const adminsData = extractList(adminsResponse);
                setAdmins(adminsData);
                setTotalAdmins(extractTotal(adminsResponse, adminsData.length));

                // Process Hosts
                const hostsData = extractList(hostsResponse);
                setHosts(hostsData);
                setTotalHosts(extractTotal(hostsResponse, hostsData.length));

                // Process Users
                const usersData = extractList(usersResponse);
                setUsers(usersData);
                setTotalUsers(extractTotal(usersResponse, usersData.length));

                // Process Events
                const eventsData = extractList(eventsResponse);
                setEvents(eventsData);
                setTotalEvents(extractTotal(eventsResponse, eventsData.length));

                // Process Categories
                const categoriesData = extractList(categoriesResponse);
                setCategories(categoriesData);
                setTotalCategories(categoriesData.length);
            } catch (error) {
                console.error('Error fetching data:', error);
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
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
                    {[...Array(5)].map((_, i) => (
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

    if (!admin) {
        return (
            <div className='flex items-center justify-center min-h-[40vh]'>
                <p className='text-muted-foreground'>
                    Please login to view admin dashboard
                </p>
            </div>
        );
    }

    return (
        <div className='space-y-8'>
            <AdminInfo
                name={admin.name || 'Admin'}
                email={admin.email}
                profilePhoto={admin.profilePhoto}
                createdAt={admin.createdAt}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
                <HostStatsCard
                    title='Total Users'
                    value={totalUsers}
                    description='Registered users'
                    icon={Users}
                    bgColor='bg-blue-50 dark:bg-blue-950'
                    iconColor='text-blue-600 dark:text-blue-400'
                    trend={{ value: 5, isPositive: true }}
                />
                <HostStatsCard
                    title='Total Hosts'
                    value={totalHosts}
                    description='Verified hosts'
                    icon={UserCog}
                    bgColor='bg-emerald-50 dark:bg-emerald-950'
                    iconColor='text-emerald-600 dark:text-emerald-400'
                    trend={{ value: 3, isPositive: true }}
                />
                <HostStatsCard
                    title='Total Admins'
                    value={totalAdmins}
                    description='Team members'
                    icon={Shield}
                    bgColor='bg-orange-50 dark:bg-orange-950'
                    iconColor='text-orange-600 dark:text-orange-400'
                />
                <HostStatsCard
                    title='Total Events'
                    value={totalEvents}
                    description='Across platform'
                    icon={CalendarDays}
                    bgColor='bg-purple-50 dark:bg-purple-950'
                    iconColor='text-purple-600 dark:text-purple-400'
                    trend={{ value: 9, isPositive: true }}
                />
                <HostStatsCard
                    title='Categories'
                    value={totalCategories}
                    description='Event categories'
                    icon={FolderTree}
                    bgColor='bg-cyan-50 dark:bg-cyan-950'
                    iconColor='text-cyan-600 dark:text-cyan-400'
                />
            </div>

            <SystemOverview
                totalUsers={totalUsers}
                totalHosts={totalHosts}
                totalAdmins={totalAdmins}
                totalEvents={totalEvents}
                totalCategories={totalCategories}
            />

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <RecentList
                    title='Recent Users'
                    items={users}
                    emptyText='No users found'
                    viewAllHref='/admin/dashboard/user-managements'
                />
                <RecentList
                    title='Recent Hosts'
                    items={hosts.map((h: any) => ({
                        id: h.id,
                        name: h.name,
                        email: h.email,
                        profilePhoto: h.profilePhoto,
                        createdAt: h.createdAt,
                    }))}
                    emptyText='No hosts found'
                    viewAllHref='/admin/dashboard/host-managements'
                />
            </div>
        </div>
    );
};

export default AdminDashboardClient;
