'use client';

import {
    ArrowUp,
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    X,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FooterLink {
    name: string;
    link: string;
}

interface SocialLink {
    icon: typeof Facebook;
    link: string;
    label: string;
}

interface FooterContent {
    brand: {
        name: string;
        email: string;
        phone: string;
    };
    sections: Record<string, FooterLink[]>;
    social: SocialLink[];
    bottom: {
        copyright: string;
    };
}

const FOOTER_CONTENT: FooterContent = {
    brand: {
        name: 'Never Alone',
        email: 'info@neveralone.com',
        phone: '+8801889245756',
    },
    sections: {
        explore: [
            { name: 'Browse Events', link: '/events' },
            { name: 'Categories', link: '/categories' },
            { name: 'About Us', link: '/about' },
        ],
        company: [
            { name: 'For Organizers', link: '/organizers' },
            { name: 'Blog', link: '/blog' },
            { name: 'Contact', link: '/contact' },
        ],
        legal: [
            { name: 'Privacy Policy', link: '/privacy' },
            { name: 'Terms & Conditions', link: '/terms' },
            { name: 'Cookie Policy', link: '/cookies' },
        ],
    },
    social: [
        {
            icon: Facebook,
            link: 'https://www.facebook.com/asraful.devs',
            label: 'Facebook',
        },
        { icon: X, link: 'https://x.com/asraful_devs', label: 'X' },
        {
            icon: Instagram,
            link: 'https://www.instagram.com/asraful.devs/',
            label: 'Instagram',
        },
        {
            icon: Linkedin,
            link: 'https://www.linkedin.com/in/asraful-devs/',
            label: 'LinkedIn',
        },
    ],
    bottom: {
        copyright: '© 2026 Never Alone. All rights reserved.',
    },
};

const PublicFooter = () => {
    const [scrollTop, setScrollTop] = useState<boolean>(false);

    // Scroll to top functionality
    const handleScrollTop = (): void => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Show button when page is scrolled down
    useEffect(() => {
        const handleScroll = (): void => {
            setScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Scroll to Top Button */}
            {scrollTop && (
                <button
                    onClick={handleScrollTop}
                    className='fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-primary to-primary/80 text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-110 active:scale-95 backdrop-blur-sm'
                    aria-label='Scroll to top'
                >
                    <ArrowUp className='h-5 w-5' />
                </button>
            )}

            <footer className='relative mt-auto border-t border-border/50 bg-transparent'>
                {/* Main Footer */}
                <div className='relative mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:px-8'>
                    {/* Grid Layout */}
                    <div className='grid gap-12 sm:grid-cols-2 lg:grid-cols-4'>
                        {/* Brand */}
                        <div className='space-y-6 lg:col-span-1'>
                            <Link
                                href='/'
                                className='flex items-center space-x-2 group'
                            >
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
                            <p className='text-sm text-muted-foreground leading-relaxed max-w-xs'>
                                Connect with people, discover events, and never
                                feel alone in your journey.
                            </p>
                            <div className='space-y-3'>
                                <a
                                    href={`mailto:${FOOTER_CONTENT.brand.email}`}
                                    className='flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors group'
                                >
                                    <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors'>
                                        <Mail className='h-4 w-4' />
                                    </div>
                                    <span>{FOOTER_CONTENT.brand.email}</span>
                                </a>
                                <a
                                    href={`tel:${FOOTER_CONTENT.brand.phone}`}
                                    className='flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors group'
                                >
                                    <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors'>
                                        <Phone className='h-4 w-4' />
                                    </div>
                                    <span>{FOOTER_CONTENT.brand.phone}</span>
                                </a>
                            </div>
                        </div>

                        {/* Links Sections */}
                        {Object.entries(FOOTER_CONTENT.sections).map(
                            ([key, links]) => (
                                <div key={key} className='space-y-5'>
                                    <h4 className='text-sm font-bold uppercase tracking-wider text-foreground/90 relative inline-block'>
                                        {key.charAt(0).toUpperCase() +
                                            key.slice(1)}
                                        <span className='absolute -bottom-2 left-0 h-0.5 w-8 bg-linear-to-r from-primary to-transparent' />
                                    </h4>
                                    <ul className='space-y-3'>
                                        {links.map((item: FooterLink) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.link}
                                                    className='text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block relative group'
                                                >
                                                    <span className='relative'>
                                                        {item.name}
                                                        <span className='absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full' />
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        )}
                    </div>

                    {/* Divider */}
                    <div className='my-10 border-t border-border/50' />

                    {/* Bottom Section */}
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-6'>
                        <p className='text-sm text-muted-foreground'>
                            {FOOTER_CONTENT.bottom.copyright}
                        </p>

                        {/* Social Links */}
                        <div className='flex gap-3'>
                            {FOOTER_CONTENT.social.map((social, index) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.link}
                                        aria-label={social.label}
                                        className='group relative flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background text-muted-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white dark:hover:text-black hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1 active:translate-y-0'
                                    >
                                        <IconComponent className='h-4 w-4 transition-transform duration-300 group-hover:scale-110 ' />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default PublicFooter;
