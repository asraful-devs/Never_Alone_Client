'use server';
import MyBookingsList from '@/components/modules/User/Booking/MyBookingsList';
import { getUserInfo } from '@/service/auth/getUserInfo';
import { getUserBookings } from '@/service/booking/bookingManagement';

const MyBookingPage = async () => {
    const userInfo = await getUserInfo();

    if (!userInfo || !userInfo.email) {
        return (
            <div className='p-4'>
                <h1 className='text-xl font-semibold mb-4'>My Bookings</h1>
                <div className='text-sm text-muted-foreground'>
                    Please login to view your bookings.
                </div>
            </div>
        );
    }

    const res = await getUserBookings(userInfo.email);

    const bookings = Array.isArray(res?.data) ? res.data : [];
    const success = !!res?.success;

    return (
        <div className='p-4'>
            <h1 className='text-xl font-semibold mb-4'>My Bookings</h1>

            {!success && (
                <div className='text-sm text-red-600 dark:text-red-400'>
                    {res?.message || 'Failed to load bookings.'}
                </div>
            )}

            {success && bookings.length === 0 && (
                <div className='text-sm text-muted-foreground'>
                    No bookings found.
                </div>
            )}

            {success && bookings.length > 0 && (
                <>
                    <div className='text-sm text-muted-foreground mb-4'>
                        Total: {res?.meta?.total || bookings.length} bookings
                    </div>
                    {/* ✅ Pass user email */}
                    <MyBookingsList
                        bookings={bookings}
                        userEmail={userInfo.email}
                    />
                </>
            )}
        </div>
    );
};

export default MyBookingPage;
