'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getInitials } from '@/lib/formatters';
import { Calendar, Mail } from 'lucide-react';
import Link from 'next/link';

interface UserInfoProps {
    name: string;
    email: string;
    profilePhoto?: string;
    createdAt?: string;
}

const UserInfo = ({ name, email, profilePhoto, createdAt }: UserInfoProps) => {
    return (
        <Card className='p-6'>
            <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6'>
                <Avatar className='h-24 w-24 border-4 border-primary/20'>
                    <AvatarImage src={profilePhoto || ''} alt={name} />
                    <AvatarFallback className='text-lg font-bold'>
                        {getInitials(name || 'User')}
                    </AvatarFallback>
                </Avatar>

                <div className='flex-1 text-center sm:text-left'>
                    <h2 className='text-2xl font-bold text-foreground'>
                        {name || 'User'}
                    </h2>
                    <Badge className='mt-2'>Member</Badge>

                    <div className='mt-4 space-y-2'>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground justify-center sm:justify-start'>
                            <Mail className='h-4 w-4' />
                            <a
                                href={`mailto:${email}`}
                                className='hover:text-primary transition-colors'
                            >
                                {email}
                            </a>
                        </div>

                        {createdAt && (
                            <div className='flex items-center gap-2 text-sm text-muted-foreground justify-center sm:justify-start'>
                                <Calendar className='h-4 w-4' />
                                <span>
                                    Joined{' '}
                                    {new Date(createdAt).toLocaleDateString(
                                        'en-US',
                                        {
                                            month: 'short',
                                            year: 'numeric',
                                        }
                                    )}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex gap-2'>
                    <Link href='/user/dashboard/my-bookings'>
                        <Button variant='default'>My Bookings</Button>
                    </Link>
                    <Link href='/user/dashboard/my-reviews'>
                        <Button variant='secondary'>My Reviews</Button>
                    </Link>
                </div>
            </div>

            <Separator className='my-6' />

            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                <div className='text-center p-3'>
                    <p className='text-muted-foreground text-xs mb-1'>Role</p>
                    <p className='font-semibold'>User</p>
                </div>
                <div className='text-center p-3'>
                    <p className='text-muted-foreground text-xs mb-1'>
                        Account Type
                    </p>
                    <Badge variant='secondary'>Active</Badge>
                </div>
                <div className='text-center p-3'>
                    <p className='text-muted-foreground text-xs mb-1'>Status</p>
                    <Badge variant='default'>Verified</Badge>
                </div>
            </div>
        </Card>
    );
};

export default UserInfo;
