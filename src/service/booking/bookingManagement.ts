/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { zodValidator } from '@/lib/zodValidator';
import { serverFetch } from '../../lib/serverFetchHelper';
import { BookingValidation } from '../../zod/booking.validation';

/**
 * CREATE BOOKING
 * API: POST /booking/create-booking
 * Returns: { paymentUrl: string }
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

        const result = await response.json(); // { paymentUrl }
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
 * API: GET /booking/my-bookings
 * Returns: Booking[] (plain array)
 */
export async function getUserBookings() {
    try {
        const response = await serverFetch.get('/booking/my-bookings');

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || 'Failed to fetch bookings');
        }

        const result = await response.json(); // plain array from backend
        return { success: true, data: Array.isArray(result) ? result : [] };
    } catch (error: any) {
        console.error('Get user bookings error:', error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to fetch bookings',
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
