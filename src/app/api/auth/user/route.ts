import { getUserInfo } from '@/service/auth/getUserInfo';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const userInfo = await getUserInfo();

        if (!userInfo) {
            return NextResponse.json(
                { userInfo: null, reason: 'missing-or-invalid-token' },
                { status: 200 }
            );
        }

        return NextResponse.json({ userInfo }, { status: 200 });
    } catch (error) {
        console.error('Error getting user info:', error);
        return NextResponse.json(
            { error: 'Failed to get user info' },
            { status: 500 }
        );
    }
}
