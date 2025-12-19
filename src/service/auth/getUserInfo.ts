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
            verifiedToken.id ??
            verifiedToken._id ??
            verifiedToken.parsonId ??
            verifiedToken.userId ??
            verifiedToken.user_id ??
            verifiedToken.sub;

        const email =
            verifiedToken.email ??
            verifiedToken.userEmail ??
            verifiedToken.user_email;

        const role =
            verifiedToken.role ??
            verifiedToken.userRole ??
            verifiedToken.user_role;

        const name =
            verifiedToken.name ??
            verifiedToken.userName ??
            verifiedToken.user_name;

        const profilePhoto =
            verifiedToken.profilePhoto ??
            verifiedToken.profile_photo ??
            verifiedToken.userProfilePhoto ??
            verifiedToken.user_profile_photo;

        if (!id || !email || !role || !name) {
            console.warn('getUserInfo: token missing required claims', {
                hasId: !!id,
                hasEmail: !!email,
                hasRole: !!role,
                hasName: !!name,
                hasProfilePhoto: !!profilePhoto,
                availableFields: Object.keys(verifiedToken),
            });
            return null;
        }

        const userInfo: UserInfo = {
            id: String(id),
            name: String(name),
            email: String(email),
            profilePhoto: profilePhoto ? String(profilePhoto) : undefined,
            role: role as UserInfo['role'],
        };

        // console.log('✅ UserInfo successfully created:', userInfo);
        return userInfo;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('❌ getUserInfo error:', error.message);
        return null;
    }
};
