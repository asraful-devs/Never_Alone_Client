/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { zodValidator } from '@/lib/zodValidator';
import { serverFetch } from '../../lib/serverFetchHelper';
import { BookingValidation } from '../../zod/booking.validation';

/**
 * CREATE BOOKING
 * API: POST /booking/create-booking
 */
export async function createBooking(_prevState: any, formData: FormData) {
    const validationPayload: any = {
        eventId: formData.get('eventId') as string,
        userId: formData.get('userId') as string,
    };

    const seatsValue = formData.get('seats') as string;
    if (seatsValue) {
        validationPayload.seats = parseInt(seatsValue, 10);
    }

    const validation = zodValidator(
        validationPayload,
        BookingValidation.createBookingValidationSchema
    );

    if (!validation.success && validation.errors) {
        return {
            success: false,
            message: 'Validation failed',
            formData: validationPayload,
            errors: validation.errors,
        };
    }

    if (!validation.data) {
        return {
            success: false,
            message: 'Validation failed',
            formData: validationPayload,
        };
    }

    try {
        const response = await serverFetch.post('/booking/create-booking', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validation.data),
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || 'Failed to create booking');
        }

        const result = await response.json();
        return { success: true, ...result };
    } catch (error: any) {
        console.error('Create booking error:', error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to create booking',
            formData: validationPayload,
        };
    }
}

/**
 * GET USER BOOKINGS
 * API: GET /booking/my-bookings?email=xxx
 * ✅ FIXED: Proper response handling with meta
 */
export async function getUserBookings(email: string) {
    try {
        // ✅ URLSearchParams automatically encodes @ symbol
        const params = new URLSearchParams({ email });
        const url = `/booking/my-bookings?${params.toString()}`;

        console.log('🔍 Fetching bookings for:', email);
        console.log('📡 API URL:', url);

        const response = await serverFetch.get(url);

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || 'Failed to fetch bookings');
        }

        const result = await response.json();

        // ✅ Backend response structure: { success, message, meta, data }
        return {
            success: result.success || true,
            message: result.message || 'Bookings retrieved successfully',
            meta: result.meta || { total: 0, page: 1, limit: 10 },
            data: Array.isArray(result.data) ? result.data : [],
        };
    } catch (error: any) {
        console.error('❌ Get user bookings error:', error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to fetch bookings',
            meta: { total: 0, page: 1, limit: 10 },
            data: [],
        };
    }
}

/**
 * DELETE BOOKING
 * API: DELETE /booking/delete-booking/:id
 */
export async function deleteBooking(id: string) {
    try {
        const response = await serverFetch.delete(
            `/booking/delete-booking/${id}`
        );

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || 'Failed to delete booking');
        }

        const result = await response.json();
        return { success: true, ...result };
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong',
        };
    }
}
