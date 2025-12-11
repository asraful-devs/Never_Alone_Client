'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getInitials } from '@/lib/formatters';
import { Calendar, Mail } from 'lucide-react';
import Link from 'next/link';

interface AdminInfoProps {
    name: string;
    email: string;
    profilePhoto?: string;
    createdAt?: string;
}

const AdminInfo = ({
    name,
    email,
    profilePhoto,
    createdAt,
}: AdminInfoProps) => {
    return (
        <Card className='p-6'>
            <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6'>
                <Avatar className='h-24 w-24 border-4 border-primary/20'>
                    <AvatarImage src={profilePhoto || ''} alt={name} />
                    <AvatarFallback className='text-lg font-bold'>
                        {getInitials(name || 'Admin')}
                    </AvatarFallback>
                </Avatar>

                <div className='flex-1 text-center sm:text-left'>
                    <h2 className='text-2xl font-bold text-foreground'>
                        {name || 'Admin'}
                    </h2>
                    <Badge className='mt-2'>Admin</Badge>

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
                    <Link href='/admin/dashboard/admin-managements'>
                        <Button variant='default'>Manage Admins</Button>
                    </Link>
                    <Link href='/admin/dashboard/user-managements'>
                        <Button variant='secondary'>Manage Users</Button>
                    </Link>
                    <Link href='/admin/dashboard/host-managements'>
                        <Button variant='outline'>Manage Hosts</Button>
                    </Link>
                </div>
            </div>

            <Separator className='my-6' />

            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                <div className='text-center p-3'>
                    <p className='text-muted-foreground text-xs mb-1'>Role</p>
                    <p className='font-semibold'>Administrator</p>
                </div>
                <div className='text-center p-3'>
                    <p className='text-muted-foreground text-xs mb-1'>Access</p>
                    <Badge variant='secondary'>Full</Badge>
                </div>
                <div className='text-center p-3'>
                    <p className='text-muted-foreground text-xs mb-1'>Status</p>
                    <Badge variant='default'>Active</Badge>
                </div>
            </div>
        </Card>
    );
};

export default AdminInfo;
