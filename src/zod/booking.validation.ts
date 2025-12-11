import { z } from 'zod';

const createBookingValidationSchema = z.object({
    eventId: z.string({
        message: 'Event ID is required',
    }),
    userId: z.string({
        message: 'User ID is required',
    }),
});

export const BookingValidation = {
    createBookingValidationSchema,
};
