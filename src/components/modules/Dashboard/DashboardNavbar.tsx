'use client';

import { getDefaultDashboardRoute } from '@/lib/auth-utils';
import { getNavItemsByRole } from '../../../lib/navItems.config';
import { useAuth } from '../../auth/AuthProvider';
import DashboardNavbarContent from './DashboardNavbarContent';

const DashboardNavbar = () => {
    const { userInfo, loading, error } = useAuth();

    console.log(
        '🔍 DashboardNavbar: userInfo =',
        userInfo,
        'loading =',
        loading,
        'error =',
        error
    );

    if (loading) {
        return <div className='h-16 bg-background border-b animate-pulse' />;
    }

    if (error) {
        return (
            <div className='h-16 bg-background border-b flex items-center px-6'>
                <div className='text-red-500 text-sm'>Error: {error}</div>
            </div>
        );
    }

    if (!userInfo) {
        return (
            <div className='h-16 bg-background border-b flex items-center px-6'>
                <div className='text-muted-foreground text-sm'>
                    No user info
                </div>
            </div>
        );
    }

    const navItems = getNavItemsByRole(userInfo.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo.role);

    console.log('✅ DashboardNavbar: Rendering with userInfo =', userInfo);

    return (
        <DashboardNavbarContent
            userInfo={userInfo}
            navItems={navItems}
            dashboardHome={dashboardHome}
        />
    );
};

export default DashboardNavbar;
