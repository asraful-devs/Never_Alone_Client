import { Suspense } from 'react';
import HostDashboardClient from '../../../../components/modules/Host/Dashboard/HostDashboardClient';

const HostDashboardPage = async () => {
    return (
        <Suspense fallback={<div>Loading dashboard...</div>}>
            <HostDashboardClient />
        </Suspense>
    );
};

export default HostDashboardPage;
