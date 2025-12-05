import { ZodObject } from 'zod';

export const zodValidator = <T>(payload: T, schema: ZodObject) => {
    const validatedPayload = schema.safeParse(payload);

    if (!validatedPayload.success) {
        return {
            success: false,
            errors: validatedPayload.error.issues.map((issue) => {
                return {
                    field: issue.path[0],
                    message: issue.message,
                };
            }),
        };
    }

    return {
        success: true,
        data: validatedPayload.data,
    };
};

// // lib/zodValidator.ts
// import { ZodSchema } from 'zod';

// export const zodValidator = <T>(data: T, schema: ZodSchema) => {
//     const result = schema.safeParse(data);

//     if (!result.success) {
//         // Convert Zod errors to object format
//         const errors: Record<string, string> = {};

//         result.error.issues.forEach((issue) => {
//             const field = issue.path[0];
//             if (field) {
//                 errors[field.toString()] = issue.message;
//             }
//         });

//         return {
//             success: false,
//             errors,
//             data: null,
//         };
//     }

//     return {
//         success: true,
//         data: result.data,
//         errors: {},
//     };
// };
