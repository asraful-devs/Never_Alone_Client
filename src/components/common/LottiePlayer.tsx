'use client';

import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

interface LottiePlayerProps {
    animationData: any;
    className?: string;
}

const LottiePlayer = ({ animationData, className }: LottiePlayerProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className={className}></div>;
    }

    return (
        <div className={className}>
            <Lottie animationData={animationData} loop={true} />
        </div>
    );
};

export default LottiePlayer;
