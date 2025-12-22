/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { zodValidator } from '@/lib/zodValidator';
import { serverFetch } from '../../lib/serverFetchHelper';
import { CarouselValidation } from '../../zod/carousel.validation';

/**
 * CREATE CAROUSEL
 * API: POST /carousel/create-carousel
 */
export async function createCarousel(_prevState: any, formData: FormData) {
    const file = formData.get('file') as File | null;

    const validationPayload: any = {
        title: formData.get('title') as string,
    };

    // Optional fields
    const linkUrl = formData.get('linkUrl') as string;
    if (linkUrl) {
        validationPayload.linkUrl = linkUrl;
    }

    const validation = zodValidator(
        validationPayload,
        CarouselValidation.createCarouselValidationSchema
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
        } else {
            return {
                success: false,
                message: 'Image file is required',
                formData: validationPayload,
            };
        }

        const response = await serverFetch.post('/carousel/create-carousel', {
            body: createFormData,
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error('Create carousel error:', error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to create carousel',
            formData: validationPayload,
        };
    }
}

/**
 * GET ALL CAROUSELS
 * API: GET /carousel/get-all-carousel?queryParams
 */
export async function getCarousels(queryString?: string) {
    try {
        const response = await serverFetch.get(
            `/carousel/get-all-carousel${queryString ? `?${queryString}` : ''}`
        );
        const result = await response.json();
        return result;
    } catch (error: any) {
        // console.log(error);
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
 * DELETE CAROUSEL
 * API: DELETE /carousel/delete-carousel/:id
 */
export async function deleteCarousel(id: string) {
    try {
        const response = await serverFetch.delete(
            `/carousel/delete-carousel/${id}`
        );
        const result = await response.json();
        return result;
    } catch (error: any) {
        // console.log(error);
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
