/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { zodValidator } from '@/lib/zodValidator';
import { serverFetch } from '../../lib/serverFetchHelper';
import { CategoryValidation } from '../../zod/categories.validation';

/**
 * CREATE CATEGORY
 * API: POST /category/create-category
 */
export async function createCategory(_prevState: any, formData: FormData) {
    const slugify = (value: string) =>
        value
            ?.toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '') || '';

    // Extract all form fields
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const icon = formData.get('icon') as string;
    const color = formData.get('color') as string;
    const isActive = formData.get('isActive') as string;

    // Build validation payload - only include non-empty optional fields
    const validationPayload: any = {
        name: name?.trim(),
        slug: name ? slugify(name) : undefined,
    };

    // Add optional fields only if they have values
    if (description?.trim()) {
        validationPayload.description = description.trim();
    }

    if (icon?.trim()) {
        validationPayload.icon = icon.trim();
    }

    if (color?.trim()) {
        validationPayload.color = color.trim();
    }

    // Handle checkbox value - on/true means active
    if (isActive) {
        validationPayload.isActive = isActive === 'on' || isActive === 'true';
    }

    // console.log('📋 Form Data Extracted:', validationPayload);

    const validatedPayload = zodValidator(
        validationPayload,
        CategoryValidation.CreateCategoryZodSchema
    );

    // console.log('✅ Validated Payload:', validatedPayload);

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

    try {
        const response = await serverFetch.post('/category/create-category', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validatedPayload.data),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error('Create category error:', error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Failed to create category',
            formData: validationPayload,
        };
    }
}

/**
 * GET ALL CATEGORIES
 * API: GET /category/get-all-categories?queryParams
 */
export async function getCategories(queryString?: string) {
    try {
        const response = await serverFetch.get(
            `/category/get-all-categories${
                queryString ? `?${queryString}` : ''
            }`
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
 * DELETE CATEGORY
 * API: DELETE /category/delete-category/:id
 */
export async function deleteCategory(id: string) {
    try {
        const response = await serverFetch.delete(
            `/category/delete-category/${id}`
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
