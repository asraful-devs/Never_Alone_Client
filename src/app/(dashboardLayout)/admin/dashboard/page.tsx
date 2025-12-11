import { Suspense } from 'react';
import AdminDashboardClient from '../../../../components/modules/Admin/Dashboard/AdminDashboardClient';

const AdminDashboardPage = async () => {
    return (
        <Suspense fallback={<div>Loading admin dashboard...</div>}>
            <AdminDashboardClient />
        </Suspense>
    );
};

export default AdminDashboardPage;
