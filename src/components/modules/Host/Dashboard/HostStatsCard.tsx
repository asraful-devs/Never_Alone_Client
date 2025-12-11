'use client';

import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface HostStatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    bgColor?: string;
    iconColor?: string;
}

const HostStatsCard = ({
    title,
    value,
    description,
    icon: Icon,
    trend,
    bgColor = 'bg-blue-50 dark:bg-blue-950',
    iconColor = 'text-blue-600 dark:text-blue-400',
}: HostStatsCardProps) => {
    return (
        <Card className='p-6 hover:shadow-lg transition-shadow'>
            <div className='flex items-start justify-between'>
                <div className='flex-1'>
                    <p className='text-muted-foreground text-sm font-medium'>
                        {title}
                    </p>
                    <p className='text-3xl font-bold text-foreground mt-2'>
                        {value}
                    </p>
                    {description && (
                        <p className='text-xs text-muted-foreground mt-1'>
                            {description}
                        </p>
                    )}
                    {trend && (
                        <div className='mt-2'>
                            <span
                                className={`text-xs font-semibold ${
                                    trend.isPositive
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                }`}
                            >
                                {trend.isPositive ? '↑' : '↓'} {trend.value}%
                            </span>
                        </div>
                    )}
                </div>
                <div className={`${bgColor} p-3 rounded-lg shrink-0`}>
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
            </div>
        </Card>
    );
};

export default HostStatsCard;
