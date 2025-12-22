'use server';

import { serverFetch } from '../../lib/serverFetchHelper';
import { zodValidator } from '../../lib/zodValidator';
import { changePasswordZodSchema } from '../../zod/auth.validation';

export async function changePassword(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _prevState: any,
    formData: FormData
) {
    const validationPayload = {
        oldPassword: formData.get('oldPassword') as string,
        newPassword: formData.get('newPassword') as string,
    };

    const validatedPayload = zodValidator(
        validationPayload,
        changePasswordZodSchema
    );

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: validatedPayload.success,
            message: 'Validation failed',
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: 'Validation failed',
            formData: validationPayload,
        };
    }

    const backendPayload = {
        oldPassword: validatedPayload.data.oldPassword,
        newPassword: validatedPayload.data.newPassword,
        // user token automatically cookie থেকে serverFetch নিয়ে নিবে
    };

    try {
        const response = await serverFetch.post('/auth/change-password', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(backendPayload),
        });

        const result = await response.json();
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Change Password:', error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to Change Password',
            formData: validationPayload,
        };
    }
}
