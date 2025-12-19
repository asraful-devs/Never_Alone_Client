'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { logoutUser } from '../../../service/auth/logoutUser';
import { UserInfo } from '../../../types/user.interface';
import LogoutButton from '../../common/LogoutButton';

interface UserDropdownProps {
    userInfo: UserInfo | null;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
    const handleLogout = async () => {
        await logoutUser();
    };

    if (!userInfo) {
        return null;
    }

    // নামের প্রথম অক্ষর বের করা
    const getInitials = (name?: string) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const initials = getInitials(userInfo.name);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='outline'
                    className='relative h-10 rounded-full border-2 hover:shadow-lg transition-all duration-300 px-2 gap-2'
                >
                    <div className='flex items-center gap-2'>
                        <div className='relative w-7 h-7 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md ring-2 ring-white dark:ring-gray-800'>
                            {userInfo.profilePhoto ? (
                                <Image
                                    src={userInfo.profilePhoto}
                                    alt={userInfo.name || 'User'}
                                    className='w-full h-full rounded-full object-cover'
                                    width={28}
                                    height={28}
                                />
                            ) : (
                                <span className='text-xs font-bold text-white'>
                                    {initials}
                                </span>
                            )}
                            <div className='absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800'></div>
                        </div>
                        {/* <ChevronDown className='h-4 w-4 transition-transform duration-200' /> */}
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align='end'
                className='w-80 p-2 border-2 shadow-2xl rounded-2xl'
            >
                <DropdownMenuLabel className='p-0'>
                    <div className='flex items-start gap-3 p-4 bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl mb-2'>
                        <div className='relative w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg ring-4 ring-blue-100 dark:ring-blue-900 shrink-0'>
                            {userInfo.profilePhoto ? (
                                <Image
                                    src={userInfo.profilePhoto}
                                    alt={userInfo.name || 'User'}
                                    className='w-full h-full rounded-full object-cover'
                                    width={28}
                                    height={28}
                                />
                            ) : (
                                <span className='text-xl font-bold text-white'>
                                    {initials}
                                </span>
                            )}
                        </div>

                        <div className='flex-1 min-w-0'>
                            <p className='text-base font-bold truncate'>
                                {userInfo.name || 'Unknown User'}
                            </p>
                            <p className='text-sm text-gray-600 dark:text-gray-400 truncate mt-0.5'>
                                {userInfo.email}
                            </p>
                            <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-linear-to-r from-blue-500 to-purple-600 text-white mt-2 shadow-sm'>
                                {userInfo.role.toLowerCase()}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <div className='space-y-1'>
                    <DropdownMenuItem asChild>
                        <Link
                            href='/my-profile'
                            className='cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-200 group'
                        >
                            <div className='w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 group-hover:scale-110 transition-all duration-200'>
                                <User className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                            </div>
                            <span className='font-medium group-hover:text-blue-700 dark:group-hover:text-blue-400'>
                                My Profile
                            </span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link
                            href='/change-password'
                            className='cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950 transition-all duration-200 group'
                        >
                            <div className='w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-800 group-hover:scale-110 transition-all duration-200'>
                                <Settings className='h-4 w-4 text-purple-600 dark:text-purple-400' />
                            </div>
                            <span className='font-medium group-hover:text-purple-700 dark:group-hover:text-purple-400'>
                                Change Password
                            </span>
                        </Link>
                    </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator className='my-2' />

                <DropdownMenuItem
                    onClick={handleLogout}
                    className='cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950 transition-all duration-200 group mx-0'
                >
                    <div className='w-9 h-9 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-800 group-hover:scale-110 transition-all duration-200'>
                        <LogOut className='h-4 w-4 text-red-600 dark:text-red-400' />
                    </div>
                    <span className='font-medium text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300'>
                        <LogoutButton />
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;
