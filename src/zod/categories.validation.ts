import z from 'zod';

const CreateCategoryZodSchema = z.object({
    name: z.string().nonempty('Category name is required'),
    slug: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    icon: z.string().optional().nullable(),
    color: z.string().optional().nullable(),
    isActive: z
        .union([
            z.boolean(),
            z.string().transform((val) => val === 'on' || val === 'true'),
        ])
        .optional()
        .default(true),
});

export const CategoryValidation = {
    CreateCategoryZodSchema,
};
