'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getInitials } from '@/lib/formatters';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Item {
    id?: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
    createdAt?: string | Date;
    extraRight?: string;
}

interface RecentListProps {
    title: string;
    items: Item[];
    emptyText: string;
    viewAllHref: string;
}

const RecentList = ({
    title,
    items,
    emptyText,
    viewAllHref,
}: RecentListProps) => {
    const topItems = items.slice(0, 5);

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
                    {topItems.map((item) => (
                        <div
                            key={item.id || item.email}
                            className='p-4 rounded-lg border border-border hover:border-primary/60 hover:bg-accent/40 transition-all flex items-center justify-between'
                        >
                            <div className='flex items-center gap-3'>
                                <Avatar className='h-9 w-9'>
                                    <AvatarImage
                                        src={
                                            (item.profilePhoto as string) || ''
                                        }
                                        alt={item.name}
                                    />
                                    <AvatarFallback>
                                        {getInitials(item.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className='font-medium leading-none'>
                                        {item.name}
                                    </p>
                                    <p className='text-xs text-muted-foreground'>
                                        {item.email}
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                {item.extraRight && (
                                    <Badge variant='outline'>
                                        {item.extraRight}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default RecentList;
