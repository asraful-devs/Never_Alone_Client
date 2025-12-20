'use client';

import {
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    Send,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'work.mdasraful56@gmail.com',
            href: 'mailto:work.mdasraful56@gmail.com',
            color: 'from-blue-500 to-blue-600',
        },
        {
            icon: Phone,
            label: 'Phone',
            value: '+880 1889245756',
            href: 'tel:+8801889245756',
            color: 'from-green-500 to-green-600',
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'Dhaka, Bangladesh',
            href: '#',
            color: 'from-red-500 to-red-600',
        },
    ];

    const socialLinks = [
        {
            icon: Facebook,
            label: 'Facebook',
            href: 'https://www.facebook.com/asraful.devs',
            color: 'hover:bg-blue-500',
        },
        {
            icon: Instagram,
            label: 'Instagram',
            href: 'https://www.instagram.com/asraful.devs/',
            color: 'hover:bg-pink-500',
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/asraful-devs/',
            color: 'hover:bg-blue-600',
        },
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Validation check
        if (
            !formData.name ||
            !formData.email ||
            !formData.subject ||
            !formData.message
        ) {
            toast.error('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);

        const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
        `.trim();

        const mailtoLink = `mailto:work.mdasraful56@gmail.com?subject=${encodeURIComponent(
            formData.subject
        )}&body=${encodeURIComponent(emailBody)}`;

        window.location.href = mailtoLink;

        toast.success('Your message has been sent!');

        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className='min-h-screen bg-background'>
            {/* Header */}
            <div className='border-b border-border/50 bg-linear-to-br from-primary/5 via-background to-muted/20'>
                <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
                    <div className='text-center'>
                        <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6'>
                            <MessageSquare className='h-4 w-4' />
                            Get in Touch
                        </div>
                        <h1 className='text-5xl font-bold mb-4 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
                            Contact Us
                        </h1>
                        <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                            Have questions? We&apos;d love to hear from you.
                            Send us a message and we&apos;ll respond as soon as
                            possible.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
                <div className='grid gap-12 lg:grid-cols-5 lg:gap-16'>
                    {/* Left Side - Contact Info */}
                    <div className='lg:col-span-2 space-y-8'>
                        <div>
                            <h2 className='text-3xl font-bold text-foreground mb-6'>
                                Let&apos;s Connect
                            </h2>
                            <p className='text-muted-foreground leading-relaxed mb-8'>
                                Whether you have a question about events, need
                                help with hosting, or just want to say hello,
                                our team is ready to answer all your questions.
                            </p>
                        </div>

                        {/* Contact Information Cards */}
                        <div className='space-y-4'>
                            {contactInfo.map((info, index) => {
                                const IconComponent = info.icon;
                                return (
                                    <a
                                        key={index}
                                        href={info.href}
                                        className='group flex items-start gap-4 rounded-2xl border border-border/50 bg-linear-to-br from-background to-muted/10 p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1'
                                    >
                                        <div
                                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${info.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                                        >
                                            <IconComponent className='h-7 w-7' />
                                        </div>
                                        <div>
                                            <p className='text-sm font-medium text-muted-foreground mb-1'>
                                                {info.label}
                                            </p>
                                            <p className='text-lg font-semibold text-foreground group-hover:text-primary transition-colors'>
                                                {info.value}
                                            </p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className='text-lg font-semibold text-foreground mb-4'>
                                Follow Us
                            </h3>
                            <div className='flex gap-3'>
                                {socialLinks.map((social, index) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            aria-label={social.label}
                                            className={`group flex h-12 w-12 items-center justify-center rounded-xl border border-border/50 bg-background text-muted-foreground transition-all duration-300 hover:text-white hover:border-transparent hover:shadow-lg hover:-translate-y-1 ${social.color}`}
                                        >
                                            <IconComponent className='h-5 w-5' />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quick Response Time */}
                        <div className='rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 to-background p-6'>
                            <div className='flex items-start gap-4'>
                                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                                    <MessageSquare className='h-6 w-6' />
                                </div>
                                <div>
                                    <h4 className='text-base font-semibold text-foreground mb-2'>
                                        Quick Response Time
                                    </h4>
                                    <p className='text-sm text-muted-foreground leading-relaxed'>
                                        We typically respond to all inquiries
                                        within 24 hours during business days.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className='lg:col-span-3'>
                        <div className='rounded-3xl border border-border/50 bg-linear-to-br from-background to-muted/10 p-8 shadow-xl'>
                            <h2 className='text-2xl font-bold text-foreground mb-2'>
                                Send us a Message
                            </h2>
                            <p className='text-muted-foreground mb-8'>
                                Fill out the form below and we&apos;ll get back
                                to you shortly
                            </p>

                            <div className='space-y-6'>
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor='name'
                                        className='block text-sm font-medium text-foreground mb-2'
                                    >
                                        Your Name{' '}
                                        <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        id='name'
                                        name='name'
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder='John Doe'
                                        className='w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-foreground mb-2'
                                    >
                                        Email Address{' '}
                                        <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder='john@example.com'
                                        className='w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label
                                        htmlFor='subject'
                                        className='block text-sm font-medium text-foreground mb-2'
                                    >
                                        Subject{' '}
                                        <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        id='subject'
                                        name='subject'
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder='How can we help you?'
                                        className='w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor='message'
                                        className='block text-sm font-medium text-foreground mb-2'
                                    >
                                        Message{' '}
                                        <span className='text-red-500'>*</span>
                                    </label>
                                    <textarea
                                        id='message'
                                        name='message'
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder='Tell us more about your inquiry...'
                                        className='w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none'
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className='group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-primary/90 px-8 py-4 text-base font-medium text-white dark:text-black shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    <Send className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
                                    {isSubmitting
                                        ? 'Sending...'
                                        : 'Send Message'}
                                </button>

                                <p className='text-xs text-center text-muted-foreground'>
                                    By submitting this form, you agree to our{' '}
                                    <a
                                        href='/privacy'
                                        className='text-primary hover:underline'
                                    >
                                        Privacy Policy
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className='border-t border-border/50 bg-linear-to-b from-muted/20 to-background py-16'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='text-center'>
                        <h3 className='text-2xl font-bold text-foreground mb-4'>
                            Visit Our Office
                        </h3>
                        <p className='text-muted-foreground mb-8'>
                            We&apos;re located in the heart of Dhaka. Feel free
                            to drop by for a coffee!
                        </p>
                        <div className='rounded-2xl border border-border/50 bg-muted/20 p-8 max-w-3xl mx-auto'>
                            <div className='aspect-video w-full rounded-xl bg-linear-to-br from-primary/10 to-muted/20 flex items-center justify-center'>
                                <div className='text-center'>
                                    <MapPin className='h-16 w-16 text-primary mx-auto mb-4' />
                                    <p className='text-lg font-semibold text-foreground'>
                                        Dhaka, Bangladesh
                                    </p>
                                    <p className='text-sm text-muted-foreground mt-2'>
                                        Map integration coming soon
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;
