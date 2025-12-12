/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { zodValidator } from '@/lib/zodValidator';
import { serverFetch } from '../../lib/serverFetchHelper';
import { HostValidation } from '../../zod/host.validation';

export async function createHost(_prevState: any, formData: FormData) {
    const validationPayload = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    };

    const validatedPayload = zodValidator(
        validationPayload,
        HostValidation.createHostValidationSchema
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
        const response = await serverFetch.post('/host/create-host', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(backendPayload),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error('Create host error:', error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to create host',
            formData: validationPayload,
        };
    }
}

/**
 * GET ALL HOSTS
 * API: GET /host/get-all-host?queryParams
 */
export async function getHosts(queryString?: string) {
    try {
        const response = await serverFetch.get(
            `/host/get-all-host${queryString ? `?${queryString}` : ''}`
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
 * GET HOST BY ID
 * API: GET /host/get-single-host/:id
 */
export async function getHostById(id: string) {
    try {
        const response = await serverFetch.get(`/host/get-single-host/${id}`);
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
 * UPDATE HOST
 * API: PATCH /host/update-host/:id
 */
export async function updateHost(
    id: string,
    _prevState: any,
    formData: FormData
) {
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const contactNumber = formData.get('contactNumber') as string;
    const file = formData.get('file') as File | null;

    const validationPayload: any = {};

    if (name) validationPayload.name = name;
    if (address) validationPayload.address = address;
    if (contactNumber) validationPayload.contactNumber = contactNumber;

    const validation = zodValidator(
        validationPayload,
        HostValidation.updateHostValidationSchema
    );

    // console.log(validation);

    if (!validation.success && validation.errors) {
        return {
            success: validation.success,
            message: 'Validation failed',
            formData: {
                name,
                address,
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
                address,
                contactNumber,
            },
        };
    }

    try {
        // Validate that at least one field has changed
        if (
            !validation.data?.name &&
            !validation.data?.address &&
            !validation.data?.contactNumber &&
            (!file || file.size === 0)
        ) {
            return {
                success: false,
                message: 'Please make at least one change to update',
                formData: {
                    name,
                    address,
                    contactNumber,
                },
            };
        }

        const updateFormData = new FormData();

        const dataObject: any = {};
        if (validation.data?.name) dataObject.name = validation.data.name;
        if (validation.data?.address)
            dataObject.address = validation.data.address;
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

        const response = await serverFetch.patch(`/host/update-host/${id}`, {
            body: updateFormData,
        });

        if (!response.ok) {
            return {
                success: false,
                message: `Server error: ${response.statusText}`,
                formData: {
                    name,
                    address,
                    contactNumber,
                },
            };
        }

        const responseText = await response.text();

        let result;
        if (!responseText) {
            result = {
                success: true,
                message: 'Host updated successfully',
                formData: {
                    name,
                    address,
                    contactNumber,
                },
            };
        } else {
            result = JSON.parse(responseText);
            console.log('Update result:', result);
        }

        return result;
    } catch (error: any) {
        console.error('Update host error:', error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to update host',
            formData: {
                name,
                address,
                contactNumber,
            },
        };
    }
}

/**
 * SOFT DELETE HOST
 * API: DELETE /host/soft-delete-host/:id
 */
export async function softDeleteHost(id: string) {
    try {
        const response = await serverFetch.delete(
            `/host/soft-delete-host/${id}`
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
 * HARD DELETE HOST
 * API: DELETE /host/:id
 */
export async function deleteHost(id: string) {
    try {
        const response = await serverFetch.delete(`/host/${id}`);
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
