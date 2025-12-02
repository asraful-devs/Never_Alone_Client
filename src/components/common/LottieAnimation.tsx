'use client';

import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

interface LottieAnimationProps {
    animationPath: string;
    loop?: boolean;
    autoplay?: boolean;
    className?: string;
}

const LottieAnimation = ({
    animationPath,
    loop = true,
    autoplay = true,
    className = '',
}: LottieAnimationProps) => {
    const [animationData, setAnimationData] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAnimation = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(animationPath);
                if (!response.ok) {
                    throw new Error(
                        `Failed to load animation: ${response.statusText}`
                    );
                }
                const data = await response.json();
                setAnimationData(data);
                setError(null);
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : 'Unknown error';
                setError(errorMessage);
                console.error('Error loading Lottie animation:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadAnimation();
    }, [animationPath]);

    if (isLoading) {
        return (
            <div className={`flex items-center justify-center ${className}`}>
                <div className='animate-pulse'>
                    <div className='w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 rounded-xl'></div>
                </div>
            </div>
        );
    }

    if (error || !animationData) {
        return null;
    }

    return (
        <div className={className}>
            <Lottie
                animationData={animationData}
                loop={loop}
                autoplay={autoplay}
            />
        </div>
    );
};

export default LottieAnimation;
