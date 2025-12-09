import { queryStringFormatter } from '@/lib/formatters';
import { Suspense } from 'react';
import TablePagination from '../../../../../components/common/TablePagination';
import { TableSkeleton } from '../../../../../components/common/TableSkeleton';
import CategoriesManagementHeader from '../../../../../components/modules/Admin/CategoriesManagement/CategoriesManagementHeader';
import CategoriesTable from '../../../../../components/modules/Admin/CategoriesManagement/CategoriesTable';
import { getCategories } from '../../../../../service/admin/CategoriesManagement';

const CategoriesManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const categoriesResult = await getCategories(queryString);

    const totalPages = Math.ceil(
        (categoriesResult?.meta?.total || 1) /
            (categoriesResult?.meta?.limit || 1)
    );

    return (
        <div className='space-y-6'>
            <CategoriesManagementHeader />

            {/* Search, Filters */}
            {/* <CategoriesFilter /> */}

            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
                <CategoriesTable categories={categoriesResult?.data || []} />
                <TablePagination
                    currentPage={categoriesResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default CategoriesManagementPage;
