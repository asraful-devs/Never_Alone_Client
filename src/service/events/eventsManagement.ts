/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { zodValidator } from '@/lib/zodValidator';
import { serverFetch } from '../../lib/serverFetchHelper';
import { EventValidation } from '../../zod/event.validation';
import { getUserInfo } from '../auth/getUserInfo';

/**
 * CREATE EVENT
 * API: POST /event/create-event
 */
export async function createEvent(_prevState: any, formData: FormData) {
    const file = formData.get('file') as File | null;

    // Extract all fields
    const validationPayload: any = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        startDateTime: formData.get('startDateTime') as string,
        endDateTime: formData.get('endDateTime') as string,
        location: formData.get('location') as string,
        categoryId: formData.get('categoryId') as string,
        hostId: formData.get('hostId') as string,
    };

    // If hostId not provided from client, inject from session
    if (!validationPayload.hostId) {
        const user = await getUserInfo();
        if (user?.id) {
            validationPayload.hostId = user.id;
        }
    }

    // Convert fee and seats to numbers
    const feeValue = formData.get('fee') as string;
    const seatsValue = formData.get('seats') as string;

    if (feeValue) {
        validationPayload.fee = parseFloat(feeValue);
    }
    if (seatsValue) {
        validationPayload.seats = parseInt(seatsValue, 10);
    }

    const validation = zodValidator(
        validationPayload,
        EventValidation.createEventZodSchema
    );

    if (!validation.success && validation.errors) {
        return {
            success: validation.success,
            message: 'Validation failed',
            formData: validationPayload,
            errors: validation.errors,
        };
    }

    if (!validation.data) {
        return {
            success: false,
            message: 'Validation failed',
            formData: validationPayload,
        };
    }

    try {
        const createFormData = new FormData();
        createFormData.append('data', JSON.stringify(validation.data));

        if (file && file.size > 0) {
            createFormData.append('file', file);
        }

        const response = await serverFetch.post('/event/create-event', {
            body: createFormData,
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error('Create event error:', error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to create event',
            formData: validationPayload,
        };
    }
}

/**
 * GET ALL EVENTS
 * API: GET /event/get-all-events?queryParams
 */
export async function getEvents(queryString?: string) {
    try {
        const response = await serverFetch.get(
            `/event/get-all-events${queryString ? `?${queryString}` : ''}`
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
 * GET EVENT BY ID
 * API: GET /event/get-single-event/:id
 */
export async function getEventById(id: string) {
    try {
        const response = await serverFetch.get(`/event/get-single-event/${id}`);
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
 * UPDATE EVENT
 * API: PATCH /event/update-event/:id
 */
export async function updateEvent(
    id: string,
    _prevState: any,
    formData: FormData
) {
    const file = formData.get('file') as File | null;

    const validationPayload: any = {};

    // Extract fields if they exist
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const startDateTime = formData.get('startDateTime') as string;
    const endDateTime = formData.get('endDateTime') as string;
    const location = formData.get('location') as string;
    const categoryId = formData.get('categoryId') as string;
    const hostId = formData.get('hostId') as string;
    const feeValue = formData.get('fee') as string;
    const seatsValue = formData.get('seats') as string;

    if (title) validationPayload.title = title;
    if (description) validationPayload.description = description;
    if (startDateTime) validationPayload.startDateTime = startDateTime;
    if (endDateTime) validationPayload.endDateTime = endDateTime;
    if (location) validationPayload.location = location;
    if (categoryId) validationPayload.categoryId = categoryId;
    if (hostId) validationPayload.hostId = hostId;

    // Convert fee and seats to numbers if provided
    if (feeValue) {
        validationPayload.fee = parseFloat(feeValue);
    }
    if (seatsValue) {
        validationPayload.seats = parseInt(seatsValue, 10);
    }

    const validation = zodValidator(
        validationPayload,
        EventValidation.updateEventZodSchema
    );

    console.log(validation);

    if (!validation.success && validation.errors) {
        return {
            success: validation.success,
            message: 'Validation failed',
            formData: validationPayload,
            errors: validation.errors,
        };
    }

    if (!validation.data) {
        return {
            success: false,
            message: 'Validation failed',
            formData: validationPayload,
        };
    }

    try {
        // Validate that at least one field has changed
        if (
            Object.keys(validation.data).length === 0 &&
            (!file || file.size === 0)
        ) {
            return {
                success: false,
                message: 'Please make at least one change to update',
                formData: validationPayload,
            };
        }

        const updateFormData = new FormData();

        if (Object.keys(validation.data).length > 0) {
            updateFormData.append('data', JSON.stringify(validation.data));
        }

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

        const response = await serverFetch.patch(`/event/update-event/${id}`, {
            body: updateFormData,
        });

        if (!response.ok) {
            return {
                success: false,
                message: `Server error: ${response.statusText}`,
                formData: validationPayload,
            };
        }

        const responseText = await response.text();

        let result;
        if (!responseText) {
            result = {
                success: true,
                message: 'Event updated successfully',
                formData: validationPayload,
            };
        } else {
            result = JSON.parse(responseText);
            console.log('Update result:', result);
        }

        // ⚠️ IMPORTANT: revalidatePath বা redirect কল করবেন না
        // এটা auto-reload ঘটায়

        return result;
    } catch (error: any) {
        console.error('Update event error:', error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to update event',
            formData: validationPayload,
        };
    }
}

/**
 * DELETE EVENT
 * API: DELETE /event/delete-event/:id
 */
export async function deleteEvent(id: string) {
    try {
        const response = await serverFetch.delete(`/event/delete-event/${id}`);
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
