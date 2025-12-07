'use server';

import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserInfo } from '../../types/user.interface';
import { getCookie } from './tokenHandler';

export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const accessToken = await getCookie('accessToken');
        if (!accessToken) {
            console.warn('getUserInfo: accessToken cookie not found');
            return null;
        }

        const verifiedToken = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_SECRET as string
        ) as JwtPayload;

        if (!verifiedToken) {
            console.warn('getUserInfo: jwt.verify returned falsy');
            return null;
        }

        const id =
            (verifiedToken as JwtPayload).id ??
            (verifiedToken as JwtPayload)._id;
        const email = (verifiedToken as JwtPayload).email;
        const role = (verifiedToken as JwtPayload).role;

        if (!id || !email || !role) {
            console.warn('getUserInfo: token missing required claims');
            return null;
        }

        const userInfo: UserInfo = {
            id: String(id),
            email: String(email),
            role: role as UserInfo['role'],
        };

        return userInfo;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('getUserInfo: error verifying token', error);
        return null;
    }
};
