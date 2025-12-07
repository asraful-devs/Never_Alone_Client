'use client';

import { RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

interface RefreshButtonProps {
    size?: 'sm' | 'default' | 'lg';
    variant?: 'default' | 'outline' | 'ghost';
    showLabel?: boolean;
    showToast?: boolean;
}

const RefreshButton = ({
    size = 'default',
    variant = 'default',
    showLabel = true,
    showToast = false,
}: RefreshButtonProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
            if (showToast) {
                toast.success('Data refreshed successfully');
            }
        });
    };

    return (
        <Button
            size={size}
            variant={variant}
            onClick={handleRefresh}
            disabled={isPending}
        >
            <RefreshCcw
                className={`h-4 w-4 ${isPending ? 'animate-spin' : ''} ${
                    showLabel ? 'mr-2' : ''
                }`}
            />
            {showLabel && 'Refresh'}
        </Button>
    );
};

export default RefreshButton;
