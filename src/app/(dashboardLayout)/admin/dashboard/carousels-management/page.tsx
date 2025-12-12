import { queryStringFormatter } from '@/lib/formatters';
import { Suspense } from 'react';
import TablePagination from '../../../../../components/common/TablePagination';
import { TableSkeleton } from '../../../../../components/common/TableSkeleton';
import CarouselsManagementHeader from '../../../../../components/modules/Admin/CarouselsManagement/CarouselsManagementHeader';
import CarouselsTable from '../../../../../components/modules/Admin/CarouselsManagement/CarouselsTable';
import { getCarousels } from '../../../../../service/admin/carouselManagement';

const CarouselsManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const carouselsResult = await getCarousels(queryString);

    const totalPages = Math.max(
        1,
        Math.ceil(
            (carouselsResult?.meta?.total ||
                carouselsResult?.data?.length ||
                1) /
                (carouselsResult?.meta?.limit ||
                    carouselsResult?.data?.length ||
                    1)
        )
    );

    return (
        <div className='space-y-6'>
            <CarouselsManagementHeader />

            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
                <CarouselsTable carousels={carouselsResult?.data || []} />
                <TablePagination
                    currentPage={carouselsResult?.meta?.page || 1}
                    totalPages={totalPages}
                />
            </Suspense>
        </div>
    );
};

export default CarouselsManagementPage;
