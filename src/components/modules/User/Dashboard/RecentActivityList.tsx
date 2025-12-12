'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, MessageSquare, Ticket } from 'lucide-react';
import Link from 'next/link';

interface ActivityItem {
    id?: string;
    name: string;
    email: string;
    detail?: string;
    createdAt?: string | Date;
}

interface RecentActivityListProps {
    title: string;
    items: ActivityItem[];
    emptyText: string;
    viewAllHref: string;
    icon?: 'booking' | 'review';
}

const RecentActivityList = ({
    title,
    items,
    emptyText,
    viewAllHref,
    icon = 'booking',
}: RecentActivityListProps) => {
    const topItems = items.slice(0, 5);
    const IconComponent = icon === 'review' ? MessageSquare : Ticket;

    return (
        <Card className='p-6 h-full'>
            <div className='flex items-center justify-between mb-6'>
                <h3 className='text-lg font-bold text-foreground'>{title}</h3>
                <Link href={viewAllHref}>
                    <Button variant='ghost' size='sm' className='gap-2'>
                        View All
                        <ArrowRight size={16} />
                    </Button>
                </Link>
            </div>

            {topItems.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-8'>
                    <p className='text-muted-foreground text-sm'>{emptyText}</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {topItems.map((item, idx) => (
                        <div
                            key={item.id || idx}
                            className='p-4 rounded-lg border border-border hover:border-primary/60 hover:bg-accent/40 transition-all flex items-start gap-3'
                        >
                            <div className='shrink-0 mt-1'>
                                <div className='p-2 rounded-lg bg-primary/10'>
                                    <IconComponent className='h-4 w-4 text-primary' />
                                </div>
                            </div>

                            <div className='flex-1 min-w-0'>
                                <p className='font-medium leading-none truncate'>
                                    {item.name}
                                </p>
                                <p className='text-xs text-muted-foreground mt-1'>
                                    {item.email}
                                </p>
                                {item.detail && (
                                    <p className='text-xs text-muted-foreground mt-1 truncate'>
                                        {item.detail}
                                    </p>
                                )}
                                {item.createdAt && (
                                    <p className='text-xs text-muted-foreground mt-2'>
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </p>
                                )}
                            </div>

                            <Badge variant='outline' className='shrink-0'>
                                {icon === 'review' ? 'Review' : 'Booking'}
                            </Badge>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default RecentActivityList;
