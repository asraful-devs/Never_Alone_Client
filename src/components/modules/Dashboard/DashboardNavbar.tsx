import { getDefaultDashboardRoute } from '@/lib/auth-utils';
import { redirect } from 'next/navigation';
import { getNavItemsByRole } from '../../../lib/navItems.config';
import { getUserInfo } from '../../../service/auth/getUserInfo';
import DashboardNavbarContent from './DashboardNavbarContent';

const DashboardNavbar = async () => {
    const userInfo = await getUserInfo();

    if (!userInfo) {
        redirect('/auth/login');
    }

    const navItems = getNavItemsByRole(userInfo.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo.role);

    return (
        <DashboardNavbarContent
            userInfo={userInfo}
            navItems={navItems}
            dashboardHome={dashboardHome}
        />
    );
};

export default DashboardNavbar;
