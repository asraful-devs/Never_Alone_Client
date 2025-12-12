'use server';

import { getDefaultDashboardRoute } from '@/lib/auth-utils';
import { redirect } from 'next/navigation';
import { getNavItemsByRole } from '../../../lib/navItems.config';
import { getUserInfo } from '../../../service/auth/getUserInfo';
import { NavSection } from '../../../types/dashboard.interface';
import { UserInfo } from '../../../types/user.interface';
import DashboardSidebarContent from './DashboardSidebarContent';

const DashboardSidebar = async () => {
    const userInfo = (await getUserInfo()) as UserInfo;
    // console.log(userInfo, 'dashboard sidebar');

    // 🔥 যদি userInfo null হয়, redirect করুন
    if (!userInfo) {
        redirect('/login');
    }

    const navItems: NavSection[] = await getNavItemsByRole(userInfo.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo.role);

    return (
        <DashboardSidebarContent
            userInfo={userInfo}
            navItems={navItems}
            dashboardHome={dashboardHome}
        />
    );
};

export default DashboardSidebar;
