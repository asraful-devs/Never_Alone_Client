/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { zodValidator } from '@/lib/zodValidator';
import { serverFetch } from '../../lib/serverFetchHelper';
import { ReviewValidation } from '../../zod/review.validation';

/**
 * CREATE REVIEW
 * API: POST /review/create-review
 */
export async function createReview(_prevState: any, formData: FormData) {
    const validationPayload: any = {
        hostId: formData.get('hostId') as string,
        userId: formData.get('userId') as string,
        comment: formData.get('comment') as string,
    };

    // Convert rating to number
    const ratingValue = formData.get('rating') as string;
    if (ratingValue) {
        validationPayload.rating = parseFloat(ratingValue);
    }

    const validation = zodValidator(
        validationPayload,
        ReviewValidation.createReviewValidationSchema
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
        const response = await serverFetch.post('/review/create-review', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error('Create review error:', error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to create review',
            formData: validationPayload,
        };
    }
}

/**
 * GET ALL REVIEWS
 * API: GET /review/get-all-review?queryParams
 */
export async function getReviews(queryString?: string) {
    try {
        const response = await serverFetch.get(
            `/review/get-all-review${queryString ? `?${queryString}` : ''}`
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
 * DELETE REVIEW
 * API: DELETE /review/delete-review/:id
 */
export async function deleteReview(id: string) {
    try {
        const response = await serverFetch.delete(
            `/review/delete-review/${id}`
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
