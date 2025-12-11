import { z } from 'zod';

const createBookingValidationSchema = z.object({
    eventId: z
        .string({
            message: 'Event ID is required',
        })
        .min(1, 'Event ID cannot be empty'),
    userId: z
        .string({
            message: 'User ID is required',
        })
        .min(1, 'User ID cannot be empty'),
    seats: z
        .number({
            message: 'Seats must be a number',
        })
        .int('Seats must be a whole number')
        .positive('Seats must be at least 1'),
});

export const BookingValidation = {
    createBookingValidationSchema,
};
