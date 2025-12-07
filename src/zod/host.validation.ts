import { z } from 'zod';

const createHostValidationSchema = z
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
        path: ['confirmPassword'],
    });

const updateHostValidationSchema = z.object({
    name: z.string().optional(),
    profilePhoto: z.string().optional(),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
});

export const HostValidation = {
    createHostValidationSchema,
    updateHostValidationSchema,
};
