// ============================================
// FILE: user.controller.ts (Backend - Express)
// ============================================

import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import { UserService } from './user.service';

/**
 * UPDATE USER BY EMAIL
 * Route: PATCH /user/update-user/:email
 *
 * ⚠️ IMPORTANT:
 * - email আসে URL path এ: req.params.email
 * - name, age, contactNumber, address আসে FormData এ
 * - file (image) আসে multipart/form-data এ req.file হিসেবে
 */
const UpdateUserByEmail = catchAsync(async (req: Request, res: Response) => {
    // Email path parameter থেকে নিন
    const email = req.params.email;

    console.log('=== UpdateUserByEmail Called ===');
    console.log('Email (path param):', email);
    console.log('Body:', req.body);
    console.log('File:', req.file?.filename);
    console.log('================================');

    // Service এ পাঠান
    const result = await UserService.updateUserByEmail(email, req);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User updated successfully!',
        data: result,
    });
});

export const UserController = {
    UpdateUserByEmail,
    // ... অন্যান্য controllers
};
