import {
    AlertTriangle,
    CreditCard,
    FileText,
    Scale,
    Shield,
    Users,
} from 'lucide-react';

const TermsConditionsPage = () => {
    const lastUpdated = 'December 19, 2024';

    const sections = [
        {
            icon: Users,
            title: 'User Accounts',
            content: [
                {
                    subtitle: 'Account Creation',
                    points: [
                        'You must be at least 16 years old to create an account',
                        'Provide accurate and complete information during registration',
                        'Keep your login credentials secure and confidential',
                        'You are responsible for all activities under your account',
                    ],
                },
                {
                    subtitle: 'Account Types',
                    points: [
                        'Attendee accounts can browse and join events',
                        'Host accounts can create and manage events',
                        'Admin accounts oversee platform operations',
                    ],
                },
            ],
        },
        {
            icon: FileText,
            title: 'Event Creation & Management',
            content: [
                {
                    subtitle: 'Host Responsibilities',
                    points: [
                        'Provide accurate event information including date, time, and location',
                        'Clearly state ticket prices and any additional fees',
                        'Honor all bookings and confirmed registrations',
                        'Notify attendees promptly of any changes or cancellations',
                        'Comply with local laws and regulations for your event',
                    ],
                },
                {
                    subtitle: 'Prohibited Events',
                    points: [
                        'Events promoting illegal activities or hate speech',
                        'Events involving dangerous or harmful activities',
                        'Events violating intellectual property rights',
                        'Events misrepresenting their nature or purpose',
                    ],
                },
            ],
        },
        {
            icon: CreditCard,
            title: 'Payments & Refunds',
            content: [
                {
                    subtitle: 'Payment Terms',
                    points: [
                        'All payments are processed securely through our payment partners',
                        'Ticket prices are set by event hosts',
                        'Platform service fees may apply to transactions',
                        'Payment confirmation is sent via email',
                    ],
                },
                {
                    subtitle: 'Refund Policy',
                    points: [
                        "Refund eligibility depends on the host's cancellation policy",
                        'Cancelled events receive automatic refunds within 5-7 business days',
                        'Hosts can offer partial or full refunds at their discretion',
                        'Platform fees are non-refundable except in case of platform error',
                    ],
                },
            ],
        },
        {
            icon: Shield,
            title: 'User Conduct',
            content: [
                {
                    subtitle: 'Acceptable Use',
                    points: [
                        'Treat all users with respect and courtesy',
                        'Provide honest reviews based on genuine experiences',
                        'Report suspicious or inappropriate content',
                        'Respect intellectual property rights',
                    ],
                },
                {
                    subtitle: 'Prohibited Actions',
                    points: [
                        'Harassment, bullying, or threatening behavior',
                        'Posting false or misleading information',
                        'Attempting to manipulate reviews or ratings',
                        "Unauthorized use of another person's account",
                        'Using automated tools to scrape or access the platform',
                    ],
                },
            ],
        },
        {
            icon: Scale,
            title: 'Liability & Disclaimers',
            content: [
                {
                    subtitle: 'Platform Liability',
                    points: [
                        'Never Alone acts as an intermediary between hosts and attendees',
                        'We are not responsible for the quality or safety of events',
                        'Hosts are solely responsible for their events and attendee safety',
                        'We do not guarantee event availability or ticket inventory',
                    ],
                },
                {
                    subtitle: 'User Responsibility',
                    points: [
                        'Verify event details before making payments',
                        'Assess event suitability for your needs',
                        'Follow local health and safety guidelines',
                        'Report issues to the event host or our support team',
                    ],
                },
            ],
        },
        {
            icon: AlertTriangle,
            title: 'Termination & Suspension',
            content: [
                {
                    subtitle: 'Account Termination',
                    points: [
                        'We may suspend or terminate accounts violating these terms',
                        'Users can close their accounts at any time',
                        'Outstanding payments must be settled before closure',
                        'Terminated users lose access to future bookings',
                    ],
                },
                {
                    subtitle: 'Grounds for Termination',
                    points: [
                        'Repeated violations of platform policies',
                        'Fraudulent activities or payment disputes',
                        'Harmful behavior towards other users',
                        'Misuse of platform features or resources',
                    ],
                },
            ],
        },
    ];

    return (
        <div className='min-h-screen bg-background'>
            {/* Header */}
            <div className='border-b border-border/50 bg-linear-to-b from-muted/30 to-background'>
                <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
                    <div className='flex items-center gap-4 mb-6'>
                        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/80 shadow-lg shadow-primary/25'>
                            <FileText className='h-7 w-7 text-white dark:text-black' />
                        </div>
                        <div>
                            <h1 className='text-4xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
                                Terms & Conditions
                            </h1>
                            <p className='text-sm text-muted-foreground mt-1'>
                                Last updated: {lastUpdated}
                            </p>
                        </div>
                    </div>
                    <p className='text-lg text-muted-foreground leading-relaxed'>
                        Please read these terms carefully before using Never
                        Alone. By accessing our platform, you agree to be bound
                        by these terms.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
                {/* Acceptance Notice */}
                <div className='mb-12 rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 to-background p-6'>
                    <h2 className='text-lg font-semibold text-foreground mb-3'>
                        Agreement to Terms
                    </h2>
                    <p className='text-sm text-muted-foreground leading-relaxed'>
                        By creating an account or using Never Alone, you
                        acknowledge that you have read, understood, and agree to
                        be bound by these Terms and Conditions. If you do not
                        agree, please do not use our services.
                    </p>
                </div>

                {/* Sections */}
                <div className='space-y-10'>
                    {sections.map((section, index) => {
                        const IconComponent = section.icon;
                        return (
                            <section key={index} className='scroll-mt-8'>
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                                        <IconComponent className='h-5 w-5' />
                                    </div>
                                    <h2 className='text-2xl font-bold text-foreground'>
                                        {section.title}
                                    </h2>
                                </div>

                                <div className='space-y-6'>
                                    {section.content.map(
                                        (subsection, subIndex) => (
                                            <div
                                                key={subIndex}
                                                className='rounded-xl border border-border/50 bg-linear-to-br from-background to-muted/10 p-5'
                                            >
                                                <h3 className='text-base font-semibold text-foreground mb-4'>
                                                    {subsection.subtitle}
                                                </h3>
                                                <ul className='space-y-2.5'>
                                                    {subsection.points.map(
                                                        (point, pointIndex) => (
                                                            <li
                                                                key={pointIndex}
                                                                className='flex items-start gap-3 text-sm text-muted-foreground'
                                                            >
                                                                <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 mt-0.5'>
                                                                    <span className='h-1.5 w-1.5 rounded-full bg-primary' />
                                                                </span>
                                                                <span className='leading-relaxed'>
                                                                    {point}
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )
                                    )}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* Changes to Terms */}
                <section className='mt-12'>
                    <div className='rounded-2xl border border-border/50 bg-muted/20 p-6'>
                        <h2 className='text-xl font-bold text-foreground mb-4'>
                            Changes to These Terms
                        </h2>
                        <p className='text-sm text-muted-foreground leading-relaxed mb-4'>
                            We may update these Terms and Conditions from time
                            to time to reflect changes in our practices or for
                            legal reasons. We will notify users of significant
                            changes via email or platform notification.
                        </p>
                        <p className='text-sm text-muted-foreground leading-relaxed'>
                            Your continued use of Never Alone after changes take
                            effect constitutes acceptance of the updated terms.
                        </p>
                    </div>
                </section>

                {/* Contact */}
                <section className='mt-12 rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 to-background p-8'>
                    <h2 className='text-2xl font-bold mb-4 text-foreground'>
                        Questions or Concerns?
                    </h2>
                    <p className='text-muted-foreground mb-6 leading-relaxed'>
                        If you have questions about these Terms and Conditions
                        or need clarification on any point, our legal team is
                        here to help.
                    </p>
                    <a
                        href='mailto:work.mdasraful56@gmail.com'
                        className='inline-flex items-center gap-2 rounded-xl
                        transition-all duration-300
                        hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25
                        dark:bg-slate-800 dark:text-white
                        bg-primary px-6 py-3 text-sm font-medium text-white
                        dark:hover:bg-slate-700 dark:hover:shadow-slate-900/40'
                    >
                        Contact Our Legal Team
                    </a>
                </section>
            </div>
        </div>
    );
};

export default TermsConditionsPage;
