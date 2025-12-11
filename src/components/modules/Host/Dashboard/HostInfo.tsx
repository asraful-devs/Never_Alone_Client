'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getInitials } from '@/lib/formatters';
import { Calendar, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

interface Host {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    location?: string;
    profilePhoto?: string;
    bio?: string;
    createdAt: string;
}

interface HostInfoProps {
    host: Host;
}

const HostInfo = ({ host }: HostInfoProps) => {
    return (
        <Card className='p-6'>
            <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6'>
                {/* Avatar */}
                <Avatar className='h-24 w-24 border-4 border-primary/20'>
                    <AvatarImage
                        src={host.profilePhoto || ''}
                        alt={host.name}
                    />
                    <AvatarFallback className='text-lg font-bold'>
                        {getInitials(host.name)}
                    </AvatarFallback>
                </Avatar>

                {/* Info */}
                <div className='flex-1 text-center sm:text-left'>
                    <h2 className='text-2xl font-bold text-foreground'>
                        {host.name}
                    </h2>
                    <Badge className='mt-2'>Host</Badge>

                    {/* Contact Info */}
                    <div className='mt-4 space-y-2'>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground justify-center sm:justify-start'>
                            <Mail className='h-4 w-4' />
                            <a
                                href={`mailto:${host.email}`}
                                className='hover:text-primary transition-colors'
                            >
                                {host.email}
                            </a>
                        </div>

                        {host.phoneNumber && (
                            <div className='flex items-center gap-2 text-sm text-muted-foreground justify-center sm:justify-start'>
                                <Phone className='h-4 w-4' />
                                <a
                                    href={`tel:${host.phoneNumber}`}
                                    className='hover:text-primary transition-colors'
                                >
                                    {host.phoneNumber}
                                </a>
                            </div>
                        )}

                        {host.location && (
                            <div className='flex items-center gap-2 text-sm text-muted-foreground justify-center sm:justify-start'>
                                <MapPin className='h-4 w-4' />
                                {host.location}
                            </div>
                        )}

                        <div className='flex items-center gap-2 text-sm text-muted-foreground justify-center sm:justify-start'>
                            <Calendar className='h-4 w-4' />
                            <span>
                                Joined{' '}
                                {new Date(host.createdAt).toLocaleDateString(
                                    'en-US',
                                    {
                                        month: 'short',
                                        year: 'numeric',
                                    }
                                )}
                            </span>
                        </div>
                    </div>

                    {/* Bio */}
                    {host.bio && (
                        <p className='mt-4 text-sm text-muted-foreground'>
                            {host.bio}
                        </p>
                    )}
                </div>

                {/* Action Button */}
                <Link href='/host/profile'>
                    <Button>Edit Profile</Button>
                </Link>
            </div>

            <Separator className='my-6' />

            {/* Quick Stats */}
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                <div className='text-center p-3'>
                    <p className='text-muted-foreground text-xs mb-1'>
                        Member Since
                    </p>
                    <p className='font-semibold'>
                        {new Date(host.createdAt).getFullYear()}
                    </p>
                </div>
                <div className='text-center p-3'>
                    <p className='text-muted-foreground text-xs mb-1'>
                        Account Status
                    </p>
                    <Badge variant='default'>Active</Badge>
                </div>
                <div className='text-center p-3'>
                    <p className='text-muted-foreground text-xs mb-1'>
                        Verified
                    </p>
                    <Badge variant='secondary'>Yes</Badge>
                </div>
            </div>
        </Card>
    );
};

export default HostInfo;
