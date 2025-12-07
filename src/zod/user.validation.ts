import { z } from 'zod';

const createUserValidationSchema = z
    .object({
        name: z
            .string()
            .min(1, 'Name cannot be empty')
            .max(100, 'Name must be less than 100 characters'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z
            .string()
            .min(6, 'Confirm password must be at least 6 characters'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
    });

const updateUserValidationSchema = z.object({
    name: z
        .string()
        .min(1, 'Name cannot be empty')
        .max(100, 'Name must be less than 100 characters')
        .optional(),
    contactNumber: z
        .string()
        .regex(/^[0-9+\-\s()]*$/, 'Invalid phone number format')
        .optional(),
});

export const UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
