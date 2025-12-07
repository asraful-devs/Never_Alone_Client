'use server';

import { getDefaultDashboardRoute } from '@/lib/auth-utils';
import { getUserInfo } from '@/service/auth/getUserInfo';
import { redirect } from 'next/navigation';

interface ProtectedRouteWrapperProps {
    children: React.ReactNode;
    requiredRole?: 'ADMIN' | 'HOST' | 'USER';
}

export const ProtectedRouteWrapper = async ({
    children,
    requiredRole,
}: ProtectedRouteWrapperProps) => {
    const userInfo = await getUserInfo();

    if (!userInfo) {
        redirect('/login');
    }

    // If a specific role is required, check it
    if (requiredRole && userInfo.role !== requiredRole) {
        redirect(getDefaultDashboardRoute(userInfo.role));
    }

    return <>{children}</>;
};
