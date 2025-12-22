// 'use server';

import { NavSection } from '@/types/dashboard.interface';
import { getDefaultDashboardRoute, UserRole } from './auth-utils';

export const getCommonNavItems = async (
    role: UserRole
): Promise<NavSection[]> => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: 'Home',
                    href: '/',
                    icon: 'Home', // ✅ String
                    roles: ['USER', 'HOST', 'ADMIN'],
                },
            ],
        },
        {
            items: [
                {
                    title: 'Dashboard',
                    href: defaultDashboard,
                    icon: 'LayoutDashboard',
                    roles: ['USER', 'HOST', 'ADMIN'],
                },
                {
                    title: 'My Profile',
                    href: `/my-profile`,
                    icon: 'User',
                    roles: ['USER', 'HOST', 'ADMIN'],
                },
            ],
        },
        {
            title: 'Settings',
            items: [
                {
                    title: 'Change Password',
                    href: '/change-password',
                    icon: 'Settings', // ✅ String
                    roles: ['USER', 'HOST', 'ADMIN'],
                },
            ],
        },
    ];
};

export const hostNavItems: NavSection[] = [
    {
        title: 'Host Management',
        items: [
            {
                title: 'Events',
                href: '/host/dashboard/events-management',
                icon: 'Calendar', // ✅ String
                badge: '',
                roles: ['HOST'],
            },
        ],
    },
];

export const userNavItems: NavSection[] = [
    {
        title: ' My Details Management',
        items: [
            {
                title: 'My Bookings',
                href: '/user/dashboard/my-bookings',
                icon: 'Calendar', // ✅ String
                roles: ['USER'],
            },
            // {
            //     title: 'My Payments',
            //     href: '/user/dashboard/my-payments',
            //     icon: 'Calendar', // ✅ String
            //     roles: ['USER'],
            // },
            // {
            //     title: 'My Reviews',
            //     href: '/user/dashboard/my-reviews',
            //     icon: 'Calendar', // ✅ String
            //     roles: ['USER'],
            // },
        ],
    },
];

export const adminNavItems: NavSection[] = [
    {
        title: 'User Management',
        items: [
            {
                title: 'Admins',
                href: '/admin/dashboard/admin-managements',
                icon: 'Shield', // ✅ String
                roles: ['ADMIN'],
            },
            {
                title: 'Hosts',
                href: '/admin/dashboard/host-managements',
                icon: 'Hosts', // ✅ String
                roles: ['ADMIN'],
            },
            {
                title: 'Users',
                href: '/admin/dashboard/user-managements',
                icon: 'Users', // ✅ String
                roles: ['ADMIN'],
            },
        ],
    },
    {
        title: 'Others Management',
        items: [
            {
                title: 'Events',
                href: '/admin/dashboard/events-management',
                icon: 'Calendar', // ✅ String
                roles: ['ADMIN'],
            },
            {
                title: 'Categories',
                href: '/admin/dashboard/categories-management',
                icon: 'Calendar', // ✅ String
                roles: ['ADMIN'],
            },
            {
                title: 'Carousels',
                href: '/admin/dashboard/carousels-management',
                icon: 'Calendar', // ✅ String
                roles: ['ADMIN'],
            },
        ],
    },
];

export const getNavItemsByRole = async (
    role: UserRole
): Promise<NavSection[]> => {
    const commonNavItems = await getCommonNavItems(role);

    switch (role) {
        case 'ADMIN':
            return [...commonNavItems, ...adminNavItems];
        case 'HOST':
            return [...commonNavItems, ...hostNavItems];
        case 'USER':
            return [...commonNavItems, ...userNavItems];
        default:
            return [];
    }
};
