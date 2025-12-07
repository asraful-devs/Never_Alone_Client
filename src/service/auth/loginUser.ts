/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { parse } from 'cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import {
    getDefaultDashboardRoute,
    isValidRedirectForRole,
    UserRole,
} from '../../lib/auth-utils';
import { serverFetch } from '../../lib/serverFetchHelper';
import { zodValidator } from '../../lib/zodValidator';
import { loginValidationZodSchema } from '../../zod/auth.validation';
import { setCookie } from '../auth/tokenHandler';

export const loginUser = async (
    _currentState: any,
    formData: any
): Promise<any> => {
    try {
        if (!formData) {
            console.log('❌ loginUser called with null/undefined formData');
            return {
                success: false,
                message: 'No data received for login.',
            };
        }

        // Handle both FormData and plain JSON payload
        let redirectTo: string | null = null;
        let payload: any;

        if (formData instanceof FormData) {
            redirectTo = formData.get('redirect') as string | null;
            payload = {
                email: formData.get('email') as string,
                password: formData.get('password') as string,
            };
        } else {
            // Plain JSON payload (may optionally include redirect)
            payload = formData;
            redirectTo = formData?.redirect ?? null;
        }

        console.log('➡️ login payload:', payload);
        console.log('➡️ redirect target:', redirectTo);

        console.log(redirectTo, 'server Actions');
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        const validationResult = zodValidator(
            payload,
            loginValidationZodSchema
        );
        if (!validationResult.success) {
            return validationResult;
        }

        const validatedPayload = validationResult.data;
        console.log('✅ payload validated');

        const res = await serverFetch.post('/auth/login', {
            body: JSON.stringify(validatedPayload),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await res.json();
        console.log('ℹ️ login response:', result);

        if (!res.ok || result?.success === false) {
            return {
                success: false,
                message: result?.message || 'Login failed',
                errors: result?.errors,
            };
        }

        const setCookieHeaders = res.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            });
        } else {
            throw new Error('No Set-Cookie header found');
        }

        if (!accessTokenObject) {
            throw new Error('Tokens not found in cookies');
        }

        if (!refreshTokenObject) {
            throw new Error('Tokens not found in cookies');
        }
        const isProd = process.env.NODE_ENV === 'production';

        await setCookie('accessToken', accessTokenObject.accessToken, {
            secure: isProd,
            httpOnly: true,
            maxAge:
                parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60 * 24, // 1 day fallback
            path: '/',
            sameSite: 'lax',
        });

        await setCookie('refreshToken', refreshTokenObject.refreshToken, {
            secure: isProd,
            httpOnly: true,
            maxAge:
                parseInt(refreshTokenObject['Max-Age']) ||
                1000 * 60 * 60 * 24 * 30, // 30 days fallback
            path: '/',
            sameSite: 'lax',
        });

        const verifiedToken: JwtPayload | string = jwt.verify(
            accessTokenObject.accessToken,
            process.env.JWT_ACCESS_SECRET as string
        );

        // এই line টা add করুন
        console.log('Decoded Token:', verifiedToken);

        if (typeof verifiedToken === 'string') {
            throw new Error('Invalid token');
        }

        const userRole: UserRole = (verifiedToken as JwtPayload).role;

        if (redirectTo) {
            const requestPath = redirectTo.toString();

            if (isValidRedirectForRole(requestPath, userRole)) {
                redirect(`${requestPath}?loggedIn=true`);
            } else {
                redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
            }
        } else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
        }
    } catch (error) {
        if ((error as any)?.digest?.startsWith?.('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return {
            success: false,
            message: `${
                process.env.NODE_ENV === 'development'
                    ? (error as Error).message
                    : 'Login failed. You might have entered incorrect credentials.'
            }`,
        };
    }
};
