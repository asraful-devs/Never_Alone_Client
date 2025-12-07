import { AuthProvider } from '@/components/auth/AuthProvider';
import DashboardNavbar from '@/components/modules/Dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/modules/Dashboard/DashboardSidebar';
import React from 'react';

const CommonDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <div className='flex h-screen overflow-hidden'>
                <DashboardSidebar />
                <div className='flex flex-1 flex-col overflow-hidden'>
                    <DashboardNavbar />
                    <main className='flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6'>
                        <div className=''>{children}</div>
                    </main>
                </div>
            </div>
        </AuthProvider>
    );
};

export default CommonDashboardLayout;
