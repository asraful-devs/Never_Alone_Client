import { queryStringFormatter } from '@/lib/formatters';
import { Suspense } from 'react';
import TablePagination from '../../../../../components/common/TablePagination';
import { TableSkeleton } from '../../../../../components/common/TableSkeleton';
import UsersFilter from '../../../../../components/modules/Admin/UsersManagement/UsersFilter';
import UsersManagementHeader from '../../../../../components/modules/Admin/UsersManagement/UsersManagementHeader';
import UsersTable from '../../../../../components/modules/Admin/UsersManagement/UsersTable';
import { getUsers } from '../../../../../service/admin/usersManagement';

const AdminUsersManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const usersResult = await getUsers(queryString);

    // console.log(usersResult);

    const totalPages = Math.ceil(
        (usersResult?.meta?.total || 1) / (usersResult?.meta?.limit || 1)
    );

    return (
        <div className='space-y-6'>
            <UsersManagementHeader />

            {/* Search, Filters */}
            <UsersFilter />

            <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
                <UsersTable users={usersResult?.data || []} />
                <TablePagination
                    currentPage={usersResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default AdminUsersManagementPage;
