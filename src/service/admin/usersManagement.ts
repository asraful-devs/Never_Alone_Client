/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { zodValidator } from '@/lib/zodValidator';
import { serverFetch } from '../../lib/serverFetchHelper';
import { UserValidation } from '../../zod/user.validation';

export async function createUser(_prevState: any, formData: FormData) {
    const validationPayload = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    };

    const validatedPayload = zodValidator(
        validationPayload,
        UserValidation.createUserValidationSchema
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
        const response = await serverFetch.post('/user/create-user', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(backendPayload),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error('Create user error:', error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to create user',
            formData: validationPayload,
        };
    }
}

/**
 * GET ALL USERS
 * API: GET /user/all-users?queryParams
 */
export async function getUsers(queryString?: string) {
    try {
        const response = await serverFetch.get(
            `/user/all-users${queryString ? `?${queryString}` : ''}`
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
 * GET USER BY ID
 * API: GET /user/get-single-user/:id
 */
export async function getUserById(id: string) {
    try {
        const response = await serverFetch.get(`/user/get-single-user/${id}`);
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
 * UPDATE USER
 * API: PATCH /user/update-user/:id
 */
export async function updateUser(
    id: string,
    _prevState: any,
    formData: FormData
) {
    const name = formData.get('name') as string;
    const contactNumber = formData.get('contactNumber') as string;
    const age = Number(formData.get('age'));
    const address = formData.get('address') as string;
    const file = formData.get('file') as File | null;

    console.log(typeof age);
    console.log(age);

    const validationPayload: any = {};

    if (name) validationPayload.name = name;
    if (contactNumber) validationPayload.contactNumber = contactNumber;
    if (age) validationPayload.age = age;
    if (address) validationPayload.address = address;

    const validation = zodValidator(
        validationPayload,
        UserValidation.updateUserValidationSchema
    );

    console.log(validation);

    if (!validation.success && validation.errors) {
        return {
            success: validation.success,
            message: 'Validation failed',
            formData: {
                name,
                contactNumber,
                age,
                address,
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
                age,
                address,
            },
        };
    }

    try {
        // Validate that at least one field has changed
        if (
            !validation.data?.name &&
            !validation.data?.contactNumber &&
            !validation.data?.age &&
            !validation.data?.address &&
            (!file || file.size === 0)
        ) {
            return {
                success: false,
                message: 'Please make at least one change to update',
                formData: {
                    name,
                    contactNumber,
                    age,
                    address,
                },
            };
        }

        const updateFormData = new FormData();

        const dataObject: any = {};
        if (validation.data?.name) dataObject.name = validation.data.name;
        if (validation.data?.contactNumber)
            dataObject.contactNumber = validation.data.contactNumber;

        if (validation.data?.age) dataObject.age = validation.data.age;
        if (validation.data?.address)
            dataObject.address = validation.data.address;

        updateFormData.append('data', JSON.stringify(dataObject));

        if (file && file.size > 0) {
            updateFormData.append('file', file);
        }

        // Log FormData contents for debugging
        console.log('FormData entries:');
        for (const [key, value] of updateFormData.entries()) {
            console.log(
                `${key}:`,
                value instanceof File ? `File: ${value.name}` : value
            );
        }

        const response = await serverFetch.patch(`/user/update-user/${id}`, {
            body: updateFormData,
        });

        if (!response.ok) {
            return {
                success: false,
                message: `Server error: ${response.statusText}`,
                formData: {
                    name,
                    contactNumber,
                    age,
                    address,
                },
            };
        }

        const responseText = await response.text();

        let result;
        if (!responseText) {
            result = {
                success: true,
                message: 'User updated successfully',
                formData: {
                    name,
                    contactNumber,
                    age,
                    address,
                },
            };
        } else {
            result = JSON.parse(responseText);
            console.log('Update result:', result);
        }

        // ⚠️ IMPORTANT: revalidatePath বা redirect কল করবেন না
        // এটা auto-reload ঘটায়
        // যদি এখানে revalidatePath('/users') বা redirect() থাকে,
        // তাহলে সেটা remove করুন

        // শুধু result return করুন
        return result;
    } catch (error: any) {
        console.error('Update user error:', error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to update user',
            formData: {
                name,
                contactNumber,
            },
        };
    }
}

/**
 * SOFT DELETE USER
 * API: DELETE /user/soft-delete-user/:id
 */
export async function softDeleteUser(id: string) {
    try {
        const response = await serverFetch.delete(
            `/user/soft-delete-user/${id}`
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
 * HARD DELETE USER
 * API: DELETE /user/:id
 */
export async function deleteUser(id: string) {
    try {
        const response = await serverFetch.delete(`/user/${id}`);
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
