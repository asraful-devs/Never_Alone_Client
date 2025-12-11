import { z } from 'zod';

const createCarouselValidationSchema = z.object({
    title: z
        .string()
        .min(1, 'Title cannot be empty')
        .max(200, 'Title must be less than 200 characters'),
    linkUrl: z
        .string()
        .url('Link URL must be a valid URL')
        .optional()
        .or(z.literal('')),
});

export const CarouselValidation = {
    createCarouselValidationSchema,
};
