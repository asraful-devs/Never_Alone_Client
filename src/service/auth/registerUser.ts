/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '../../lib/serverFetchHelper';
import { zodValidator } from '../../lib/zodValidator';
import { registerValidationZodSchema } from '../../zod/auth.validation';
import { loginUser } from './loginUser';

export const registerUser = async (
    _currentState: any,
    formData: any
): Promise<any> => {
    try {
        // Handle both FormData and plain JSON payload
        let payload: any;

        if (formData instanceof FormData) {
            payload = {
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                confirmPassword: formData.get('confirmPassword') as string,
            };
        } else {
            // Plain JSON payload
            payload = formData;
        }

        // Validate with Zod
        const validationResult = zodValidator(
            payload,
            registerValidationZodSchema
        );

        if (!validationResult.success) {
            return {
                success: false,
                message: 'Validation failed. Please check your inputs.',
                errors: validationResult.errors,
            };
        }

        const validatedPayload: any = validationResult.data;

        // Prepare registration data
        const registerData = {
            name: validatedPayload.name,
            email: validatedPayload.email,
            password: validatedPayload.password,
        };

        // Call backend API
        const res = await serverFetch.post('/user/create-user', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        const result = await res.json();

        if (result.success) {
            // Auto login after successful registration
            const loginPayload = {
                email: validatedPayload.email,
                password: validatedPayload.password,
            };

            await loginUser(_currentState, loginPayload);

            return {
                success: true,
                message: 'Registration successful! Logging you in...',
            };
        }

        return {
            success: false,
            message: result.message || 'Registration failed. Please try again.',
            errors: result.errors || {},
        };
    } catch (error) {
        if ((error as any)?.digest?.startsWith?.('NEXT_REDIRECT')) {
            throw error;
        }

        console.error('Registration error:', error);

        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? (error as Error).message
                    : 'Registration failed. Please try again later.',
            errors: {},
        };
    }
};
