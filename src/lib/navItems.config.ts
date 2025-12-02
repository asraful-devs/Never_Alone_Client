'use server';

import { NavSection } from '@/types/dashboard.interface';
import { getDefaultDashboardRoute, UserRole } from './auth-utils';

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
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
                title: 'Post Consultations',
                href: '/host/dashboard/appointments-management',
                icon: 'Calendar', // ✅ String
                badge: '3',
                roles: ['HOST'],
            },
        ],
    },
];

export const userNavItems: NavSection[] = [
    {
        title: 'User Management',
        items: [
            {
                title: 'My Appointments',
                href: '/dashboard/my-appointments',
                icon: 'Calendar', // ✅ String
                roles: ['USER'],
            },
        ],
    },
];

export const adminNavItems: NavSection[] = [
    {
        title: 'User Management',
        items: [
            {
                title: 'Admins',
                href: '/admin/dashboard/admins-management',
                icon: 'Shield', // ✅ String
                roles: ['ADMIN'],
            },
            {
                title: 'Hosts',
                href: '/admin/dashboard/hosts-management',
                icon: 'Stethoscope', // ✅ String
                roles: ['ADMIN'],
            },
            {
                title: 'Users',
                href: '/admin/dashboard/users-management',
                icon: 'Users', // ✅ String
                roles: ['ADMIN'],
            },
        ],
    },
    {
        title: 'Admin Management',
        items: [
            {
                title: 'Appointments',
                href: '/admin/dashboard/appointments-management',
                icon: 'Calendar', // ✅ String
                roles: ['ADMIN'],
            },
        ],
    },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

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
