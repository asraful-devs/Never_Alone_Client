import { z } from 'zod';

const createReviewValidationSchema = z.object({
    hostId: z.string().min(1, 'Host ID cannot be empty'),
    userId: z.string().min(1, 'User ID cannot be empty'),
    rating: z
        .number()
        .min(1, 'Rating must be at least 1')
        .max(5, 'Rating cannot be more than 5'),
    comment: z
        .string()
        .min(1, 'Comment cannot be empty')
        .max(1000, 'Comment must be less than 1000 characters'),
});

export const ReviewValidation = {
    createReviewValidationSchema,
};
