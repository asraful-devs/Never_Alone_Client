'use client';

import { UserInfo } from '@/types/user.interface';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    userInfo: UserInfo | null;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let authCheckPromise: Promise<UserInfo | null> | null = null;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Use singleton pattern to avoid multiple requests
        if (!authCheckPromise) {
            authCheckPromise = (async () => {
                try {
                    console.log('🔍 AuthProvider: Fetching user info...');
                    const response = await fetch('/api/auth/user', {
                        cache: 'no-store',
                    });

                    if (!response.ok) {
                        throw new Error(`Auth API error: ${response.status}`);
                    }

                    const data = await response.json();
                    console.log('✅ AuthProvider: User info received:', data);

                    setUserInfo(data.userInfo);
                    setError(null);
                    return data.userInfo;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (err: any) {
                    console.error(
                        '❌ AuthProvider: Auth check failed:',
                        err.message
                    );
                    setError(err.message);
                    setUserInfo(null);
                }
                return null;
            })();
        }

        authCheckPromise.then(() => {
            console.log('✅ AuthProvider: Auth check complete');
            setLoading(false);
        });
    }, []); // Empty dependency array - runs only once

    return (
        <AuthContext.Provider value={{ userInfo, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
