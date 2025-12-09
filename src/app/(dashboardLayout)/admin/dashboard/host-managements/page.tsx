import { queryStringFormatter } from '@/lib/formatters';
import { Suspense } from 'react';
import TablePagination from '../../../../../components/common/TablePagination';
import { TableSkeleton } from '../../../../../components/common/TableSkeleton';
import HostsFilter from '../../../../../components/modules/Admin/HostsManagement/HostsFilter';
import HostsManagementHeader from '../../../../../components/modules/Admin/HostsManagement/HostsManagementHeader';
import HostsTable from '../../../../../components/modules/Admin/HostsManagement/HostsTable';
import { getHosts } from '../../../../../service/admin/hostsManagement';

const AdminHostsManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const hostsResult = await getHosts(queryString);

    // console.log(hostsResult);

    const totalPages = Math.ceil(
        (hostsResult?.meta?.total || 1) / (hostsResult?.meta?.limit || 1)
    );

    return (
        <div className='space-y-6'>
            <HostsManagementHeader />

            {/* Search, Filters */}
            <HostsFilter />

            <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
                <HostsTable hosts={hostsResult?.data || []} />
                <TablePagination
                    currentPage={hostsResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default AdminHostsManagementPage;
