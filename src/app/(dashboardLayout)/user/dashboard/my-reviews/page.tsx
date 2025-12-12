// app/(dashboardLayout)/user/dashboard/my-reviews/page.tsx

'use server';

import MyReviewsList from '@/components/modules/User/Reviews/MyReviewsList';
import { getUserInfo } from '@/service/auth/getUserInfo';
import { getReviews } from '@/service/review/reviewManagement';
import { queryStringFormatter } from '../../../../../lib/formatters';

const MyReviewsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const userInfo = await getUserInfo();

    if (!userInfo) {
        return (
            <div className='p-4'>
                <h1 className='text-xl font-semibold mb-4'>My Reviews</h1>
                <div className='text-sm text-muted-foreground'>
                    Please login to view your reviews.
                </div>
            </div>
        );
    }

    const res = await getReviews(queryString);

    const reviews = Array.isArray(res?.data) ? res.data : [];
    const success = !!res?.success;

    return (
        <div className='p-4'>
            <h1 className='text-xl font-semibold mb-4'>My Reviews</h1>

            {!success && (
                <div className='text-sm text-muted-foreground'>
                    Failed to load reviews.
                </div>
            )}

            {success && reviews.length === 0 && (
                <div className='text-sm text-muted-foreground'>
                    No reviews found. Start reviewing hosts you&apos;ve booked
                    events from!
                </div>
            )}

            {success && reviews.length > 0 && (
                <MyReviewsList reviews={reviews} />
            )}
        </div>
    );
};

export default MyReviewsPage;
