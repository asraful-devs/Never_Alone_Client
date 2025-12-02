'use client';

import {
    ArrowUp,
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    Twitter,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// ==================== TYPES ====================
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

// ==================== CONSTANTS ====================
const FOOTER_CONTENT: FooterContent = {
    brand: {
        name: 'Never Alone',
        email: 'info@neveralone.com',
        phone: '+1 (555) 123-4567',
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
        { icon: Facebook, link: '#', label: 'Facebook' },
        { icon: Twitter, link: '#', label: 'Twitter' },
        { icon: Instagram, link: '#', label: 'Instagram' },
        { icon: Linkedin, link: '#', label: 'LinkedIn' },
    ],
    bottom: {
        copyright: '© 2024 Never Alone. All rights reserved.',
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
                    className='fixed bottom-8 right-8 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 active:scale-95'
                    aria-label='Scroll to top'
                >
                    <ArrowUp className='h-4 w-4' />
                </button>
            )}

            <footer className='border-t bg-background text-foreground transition-colors duration-300'>
                {/* Main Footer */}
                <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
                    {/* Grid Layout */}
                    <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
                        {/* Brand */}
                        <div className='space-y-4'>
                            <Link
                                href='/'
                                className='inline-flex items-center space-x-2 group'
                            >
                                <div className='w-8 h-8 bg-linear-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center'>
                                    <span className='text-white font-bold text-sm'>
                                        NA
                                    </span>
                                </div>
                                <span className='font-semibold group-hover:text-primary transition-colors'>
                                    {FOOTER_CONTENT.brand.name}
                                </span>
                            </Link>
                            <div className='space-y-2'>
                                <a
                                    href={`mailto:${FOOTER_CONTENT.brand.email}`}
                                    className='flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors'
                                >
                                    <Mail className='h-4 w-4' />
                                    <span>{FOOTER_CONTENT.brand.email}</span>
                                </a>
                                <a
                                    href={`tel:${FOOTER_CONTENT.brand.phone}`}
                                    className='flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors'
                                >
                                    <Phone className='h-4 w-4' />
                                    <span>{FOOTER_CONTENT.brand.phone}</span>
                                </a>
                            </div>
                        </div>

                        {/* Links Sections */}
                        {Object.entries(FOOTER_CONTENT.sections).map(
                            ([key, links]) => (
                                <div key={key}>
                                    <h4 className='text-sm font-semibold uppercase tracking-widest mb-4'>
                                        {key.charAt(0).toUpperCase() +
                                            key.slice(1)}
                                    </h4>
                                    <ul className='space-y-2'>
                                        {links.map((item: FooterLink) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.link}
                                                    className='text-sm text-muted-foreground hover:text-primary transition-colors'
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        )}
                    </div>

                    {/* Divider */}
                    <div className='my-8 border-t' />

                    {/* Bottom Section */}
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                        <p className='text-sm text-muted-foreground'>
                            {FOOTER_CONTENT.bottom.copyright}
                        </p>
                        {/* Social Links */}
                        <div className='flex gap-4'>
                            {FOOTER_CONTENT.social.map((social, index) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.link}
                                        aria-label={social.label}
                                        className='flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:scale-110 active:scale-95'
                                    >
                                        <IconComponent className='h-4 w-4' />
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
