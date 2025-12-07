'use client';

import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

interface LottiePlayerProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    animationData: any;
    className?: string;
}

const LottiePlayer = ({ animationData, className }: LottiePlayerProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
