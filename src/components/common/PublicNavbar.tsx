import { ChevronRight, Menu } from 'lucide-react';
import Link from 'next/link';

import { getUserInfo } from '../../service/auth/getUserInfo';
import { getCookie } from '../../service/auth/tokenHandler';
import { UserInfo } from '../../types/user.interface';
import UserDropdown from '../modules/Dashboard/UserDropdown';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { ModeToggle } from './ModeToggle';

const PublicNavbar = async () => {
    const userInfo = (await getUserInfo()) as UserInfo | null;

    const dashboardHref = userInfo?.role
        ? `/${String(userInfo.role).toLowerCase()}/dashboard`
        : '/dashboard';

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/events', label: 'Events' },
        { href: '/about-us', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    const accessToken = await getCookie('accessToken');

    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60 dark:bg-background/80'>
            <div className='container mx-auto flex h-16 items-center justify-between px-4 lg:px-8'>
                {/* Logo Section */}
                <Link href='/' className='flex items-center space-x-2 group'>
                    <div className='relative'>
                        <div className='w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105'>
                            <span className='text-white font-bold text-lg'>
                                NA
                            </span>
                        </div>
                        <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background'></div>
                    </div>
                    <span className='text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                        Never Alone
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className='hidden md:flex items-center space-x-1'>
                    {navItems.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className='relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group'
                        >
                            <span className='relative z-10'>{link.label}</span>
                            <span className='absolute inset-0 rounded-lg bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-200'></span>
                        </Link>
                    ))}
                    {accessToken && (
                        <Link
                            href={dashboardHref}
                            className='relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group'
                        >
                            <span className='relative z-10'>Dashboard</span>
                            <span className='absolute inset-0 rounded-lg bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-200'></span>
                        </Link>
                    )}
                </nav>

                {/* Desktop Actions */}
                <div className='hidden md:flex items-center space-x-3'>
                    <ModeToggle />
                    {accessToken ? (
                        <UserDropdown userInfo={userInfo} />
                    ) : (
                        <Link href='/login'>
                            <Button className='bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300'>
                                Login
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className='md:hidden flex items-center space-x-2'>
                    <ModeToggle />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant='outline'
                                size='icon'
                                className='rounded-xl hover:bg-primary/10 transition-all duration-300'
                            >
                                <Menu className='h-5 w-5' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side='right'
                            className='w-[300px] sm:w-[350px] p-0 border-l-2'
                        >
                            <SheetTitle className='sr-only'>
                                Navigation Menu
                            </SheetTitle>

                            {/* Mobile Header */}
                            <div className='p-6 border-b bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950'>
                                <div className='flex items-center space-x-3'>
                                    <div className='w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg'>
                                        <span className='text-white font-bold text-xl'>
                                            NA
                                        </span>
                                    </div>
                                    <div>
                                        <h2 className='text-lg font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                                            Never Alone
                                        </h2>
                                        <p className='text-xs text-muted-foreground'>
                                            Navigation Menu
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Navigation Links */}
                            <nav className='flex flex-col p-4 space-y-2'>
                                {navItems.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className='flex items-center justify-between px-4 py-3 text-base font-medium rounded-xl hover:bg-primary/10 transition-all duration-200 group'
                                    >
                                        <span>{link.label}</span>
                                        <ChevronRight className='h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200' />
                                    </Link>
                                ))}
                                {accessToken && (
                                    <Link
                                        href={dashboardHref}
                                        className='flex items-center justify-between px-4 py-3 text-base font-medium rounded-xl bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-200 group'
                                    >
                                        <span className='font-semibold'>
                                            Dashboard
                                        </span>
                                        <ChevronRight className='h-4 w-4 group-hover:translate-x-1 transition-all duration-200' />
                                    </Link>
                                )}
                            </nav>

                            {/* Mobile Footer */}
                            <div className='absolute bottom-0 left-0 right-0 p-4 border-t bg-linear-to-t from-background to-transparent'>
                                {accessToken ? (
                                    <div className='space-y-3'>
                                        <UserDropdown userInfo={userInfo} />
                                    </div>
                                ) : (
                                    <Link href='/login' className='block'>
                                        <Button className='w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300'>
                                            Login to Continue
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default PublicNavbar;
