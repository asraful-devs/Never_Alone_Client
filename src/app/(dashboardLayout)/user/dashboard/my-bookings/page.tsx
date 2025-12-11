// app/(dashboardLayout)/user/dashboard/my-bookings/page.tsx

'use server';

import MyBookingsList from '@/components/modules/User/Booking/MyBookingsList';
import { getUserInfo } from '@/service/auth/getUserInfo';
import { getUserBookings } from '@/service/booking/bookingManagement';

const MyBookingPage = async () => {
    // ✅ User authentication check
    const userInfo = await getUserInfo();

    if (!userInfo) {
        return (
            <div className='p-4'>
                <h1 className='text-xl font-semibold mb-4'>My Bookings</h1>
                <div className='text-sm text-muted-foreground'>
                    Please login to view your bookings.
                </div>
            </div>
        );
    }

    // ✅ Fetch bookings (JWT middleware automatically gets user from token)
    const res = await getUserBookings();

    const bookings = Array.isArray(res?.data) ? res.data : [];
    const success = !!res?.success;

    return (
        <div className='p-4'>
            <h1 className='text-xl font-semibold mb-4'>My Bookings</h1>

            {!success && (
                <div className='text-sm text-muted-foreground'>
                    Failed to load bookings.
                </div>
            )}

            {success && bookings.length === 0 && (
                <div className='text-sm text-muted-foreground'>
                    No bookings found.
                </div>
            )}

            {success && bookings.length > 0 && (
                <MyBookingsList bookings={bookings} />
            )}
        </div>
    );
};

export default MyBookingPage;
