/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { zodValidator } from '@/lib/zodValidator';
import { serverFetch } from '../../lib/serverFetchHelper';
import { AdminValidation } from '../../zod/admin.validation';

export async function createAdmin(_prevState: any, formData: FormData) {
    const validationPayload = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    };

    const validatedPayload = zodValidator(
        validationPayload,
        AdminValidation.createAdminValidationSchema
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

    // Send only name, email, and password to backend (not confirmPassword)
    const backendPayload = {
        name: validatedPayload.data.name,
        email: validatedPayload.data.email,
        password: validatedPayload.data.password,
    };

    try {
        const response = await serverFetch.post('/admin/create-admin', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(backendPayload),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error('Create admin error:', error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to create admin',
            formData: validationPayload,
        };
    }
}

/**
 * GET ALL ADMINS
 * API: GET /admin?queryParams
 */
export async function getAdmins(queryString?: string) {
    try {
        const response = await serverFetch.get(
            `/admin/get-all-admin${queryString ? `?${queryString}` : ''}`
        );
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong'
            }`,
        };
    }
}

/**
 * GET ADMIN BY ID
 * API: GET /admin/:id
 */
export async function getAdminById(id: string) {
    try {
        const response = await serverFetch.get(`/admin/get-single-admin/${id}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong'
            }`,
        };
    }
}

/**
 * UPDATE ADMIN
 * API: PATCH /admin/:id
 */
export async function updateAdmin(
    id: string,
    _prevState: any,
    formData: FormData
) {
    const name = formData.get('name') as string;
    const contactNumber = formData.get('contactNumber') as string;
    const file = formData.get('file') as File | null;

    const validationPayload: any = {};

    if (name) validationPayload.name = name;
    if (contactNumber) validationPayload.contactNumber = contactNumber;

    const validation = zodValidator(
        validationPayload,
        AdminValidation.updateAdminValidationSchema
    );

    // console.log(validation);

    if (!validation.success && validation.errors) {
        return {
            success: validation.success,
            message: 'Validation failed',
            formData: {
                name,
                contactNumber,
            },
            errors: validation.errors,
        };
    }

    if (!validation.data) {
        return {
            success: false,
            message: 'Validation failed',
            formData: {
                name,
                contactNumber,
            },
        };
    }

    try {
        // Validate that at least one field has changed
        if (
            !validation.data?.name &&
            !validation.data?.contactNumber &&
            (!file || file.size === 0)
        ) {
            return {
                success: false,
                message: 'Please make at least one change to update',
                formData: {
                    name,
                    contactNumber,
                },
            };
        }

        const updateFormData = new FormData();

        const dataObject: any = {};
        if (validation.data?.name) dataObject.name = validation.data.name;
        if (validation.data?.contactNumber)
            dataObject.contactNumber = validation.data.contactNumber;

        updateFormData.append('data', JSON.stringify(dataObject));

        if (file && file.size > 0) {
            updateFormData.append('file', file);
        }

        // Log FormData contents for debugging
        // console.log('FormData entries:');
        for (const [key, value] of updateFormData.entries()) {
            console.log(
                `${key}:`,
                value instanceof File ? `File: ${value.name}` : value
            );
        }

        const response = await serverFetch.patch(`/admin/update-admin/${id}`, {
            body: updateFormData,
        });

        if (!response.ok) {
            return {
                success: false,
                message: `Server error: ${response.statusText}`,
                formData: {
                    name,
                    contactNumber,
                },
            };
        }

        const responseText = await response.text();

        let result;
        if (!responseText) {
            result = {
                success: true,
                message: 'Admin updated successfully',
                formData: {
                    name,
                    contactNumber,
                },
            };
        } else {
            result = JSON.parse(responseText);
            // console.log('Update result:', result);
        }

        // ⚠️ IMPORTANT: revalidatePath বা redirect কল করবেন না
        // এটা auto-reload ঘটায়
        // যদি এখানে revalidatePath('/admins') বা redirect() থাকে,
        // তাহলে সেটা remove করুন

        // শুধু result return করুন
        return result;
    } catch (error: any) {
        console.error('Update admin error:', error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to update admin',
            formData: {
                name,
                contactNumber,
            },
        };
    }
}

/**
 * SOFT DELETE ADMIN
 * API: DELETE /admin/soft/:id
 */
export async function softDeleteAdmin(id: string) {
    try {
        const response = await serverFetch.delete(
            `/admin/soft-delete-admin/${id}`
        );
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong'
            }`,
        };
    }
}

/**
 * HARD DELETE ADMIN
 * API: DELETE /admin/:id
 */
export async function deleteAdmin(id: string) {
    try {
        const response = await serverFetch.delete(`/admin/${id}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong'
            }`,
        };
    }
}
