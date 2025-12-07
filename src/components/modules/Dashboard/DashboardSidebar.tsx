'use client';

import { getDefaultDashboardRoute } from '@/lib/auth-utils';
import { getNavItemsByRole } from '../../../lib/navItems.config';
import { NavSection } from '../../../types/dashboard.interface';
import { useAuth } from '../../auth/AuthProvider';
import DashboardSidebarContent from './DashboardSidebarContent';

const DashboardSidebar = () => {
    const { userInfo, loading, error } = useAuth();

    console.log(
        '🔍 DashboardSidebar: userInfo =',
        userInfo,
        'loading =',
        loading,
        'error =',
        error
    );

    if (loading) {
        return (
            <div className='w-64 bg-background border-r animate-pulse'>
                <div className='h-16 border-b bg-muted' />
                <div className='space-y-4 p-4'>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className='h-10 bg-muted rounded' />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='w-64 bg-background border-r flex items-center justify-center'>
                <div className='text-center text-red-500'>
                    <p className='font-semibold'>Error loading sidebar</p>
                    <p className='text-xs'>{error}</p>
                </div>
            </div>
        );
    }

    if (!userInfo) {
        return (
            <div className='w-64 bg-background border-r flex items-center justify-center'>
                <div className='text-center text-muted-foreground'>
                    <p className='text-sm'>No user information available</p>
                </div>
            </div>
        );
    }

    const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo.role);

    console.log('✅ DashboardSidebar: Rendering with navItems =', navItems);

    return (
        <DashboardSidebarContent
            userInfo={userInfo}
            navItems={navItems}
            dashboardHome={dashboardHome}
        />
    );
};

export default DashboardSidebar;
