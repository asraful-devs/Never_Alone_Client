import z from 'zod';

const createAdminValidationSchema = z
    .object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z
            .string()
            .min(6, 'Confirm Password must be at least 6 characters'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

// At least one field must be provided for update
const updateAdminValidationSchema = z
    .object({
        name: z.string().min(1, 'Name is required').optional(),
        contactNumber: z
            .string()
            .min(1, 'Contact number is required')
            .optional(),
    })
    .refine((data) => data.name || data.contactNumber, {
        message: 'At least one field (name or contact number) is required',
        path: ['name'],
    });

export const AdminValidation = {
    createAdminValidationSchema,
    updateAdminValidationSchema,
};
