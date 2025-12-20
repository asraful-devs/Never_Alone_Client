import {
    Database,
    Eye,
    Lock,
    Share2,
    ShieldCheck,
    UserCheck,
} from 'lucide-react';

const PrivacyPolicyPage = () => {
    const lastUpdated = 'December 19, 2024';

    const dataCollection = [
        {
            category: 'Personal Information',
            items: [
                'Name and email address',
                'Phone number (optional)',
                'Profile photo',
                'Date of birth',
                'Location',
            ],
        },
        {
            category: 'Payment Information',
            items: [
                'Billing address',
                'Payment method details (encrypted)',
                'Transaction history',
                'Refund records',
            ],
        },
        {
            category: 'Usage Data',
            items: [
                'Events viewed and joined',
                'Search queries',
                'Device information',
                'IP address and location',
                'Browser type and version',
            ],
        },
        {
            category: 'Communications',
            items: [
                'Messages with hosts',
                'Support tickets',
                'Reviews and ratings',
                'Email preferences',
            ],
        },
    ];

    const dataUsage = [
        {
            icon: UserCheck,
            title: 'Provide Services',
            description:
                'Process bookings, manage accounts, and facilitate event participation',
        },
        {
            icon: ShieldCheck,
            title: 'Security & Fraud Prevention',
            description:
                'Protect against unauthorized access and fraudulent activities',
        },
        {
            icon: Share2,
            title: 'Communication',
            description:
                'Send confirmations, updates, and promotional materials (with consent)',
        },
        {
            icon: Eye,
            title: 'Platform Improvement',
            description:
                'Analyze usage patterns to enhance features and user experience',
        },
    ];

    const userRights = [
        {
            title: 'Access Your Data',
            description:
                'Request a copy of all personal information we hold about you',
        },
        {
            title: 'Correct Information',
            description: 'Update or correct inaccurate personal information',
        },
        {
            title: 'Delete Account',
            description: 'Request deletion of your account and associated data',
        },
        {
            title: 'Data Portability',
            description:
                'Receive your data in a structured, machine-readable format',
        },
        {
            title: 'Opt-Out',
            description:
                'Unsubscribe from marketing communications at any time',
        },
        {
            title: 'Lodge Complaints',
            description: 'File complaints with data protection authorities',
        },
    ];

    const securityMeasures = [
        'End-to-end encryption for sensitive data',
        'Regular security audits and penetration testing',
        'Secure payment processing through PCI-compliant partners',
        'Two-factor authentication for enhanced account security',
        'Access controls limiting employee data access',
        'Regular backups with encrypted storage',
    ];

    return (
        <div className='min-h-screen bg-background'>
            {/* Header */}
            <div className='border-b border-border/50 bg-linear-to-b from-muted/30 to-background'>
                <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
                    <div className='flex items-center gap-4 mb-6'>
                        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/80 shadow-lg shadow-primary/25'>
                            <Lock className='h-7 w-7 text-white dark:text-black' />
                        </div>
                        <div>
                            <h1 className='text-4xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
                                Privacy Policy
                            </h1>
                            <p className='text-sm text-muted-foreground mt-1'>
                                Last updated: {lastUpdated}
                            </p>
                        </div>
                    </div>
                    <p className='text-lg text-muted-foreground leading-relaxed'>
                        Your privacy is important to us. This policy explains
                        how Never Alone collects, uses, and protects your
                        personal information.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
                {/* Introduction */}
                <div className='mb-12 rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 to-background p-6'>
                    <h2 className='text-lg font-semibold text-foreground mb-3'>
                        Our Commitment to Privacy
                    </h2>
                    <p className='text-sm text-muted-foreground leading-relaxed'>
                        At Never Alone, we respect your privacy and are
                        committed to protecting your personal data. This Privacy
                        Policy outlines how we collect, use, store, and
                        safeguard your information when you use our platform.
                    </p>
                </div>

                {/* Data Collection */}
                <section className='mb-12'>
                    <div className='flex items-center gap-3 mb-6'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                            <Database className='h-5 w-5' />
                        </div>
                        <h2 className='text-2xl font-bold text-foreground'>
                            Information We Collect
                        </h2>
                    </div>

                    <div className='grid gap-4 sm:grid-cols-2'>
                        {dataCollection.map((category, index) => (
                            <div
                                key={index}
                                className='rounded-xl border border-border/50 bg-linear-to-br from-background to-muted/10 p-5'
                            >
                                <h3 className='text-base font-semibold text-foreground mb-3'>
                                    {category.category}
                                </h3>
                                <ul className='space-y-2'>
                                    {category.items.map((item, itemIndex) => (
                                        <li
                                            key={itemIndex}
                                            className='flex items-start gap-2 text-sm text-muted-foreground'
                                        >
                                            <span className='h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5' />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How We Use Data */}
                <section className='mb-12'>
                    <h2 className='text-2xl font-bold text-foreground mb-6'>
                        How We Use Your Information
                    </h2>

                    <div className='grid gap-5 sm:grid-cols-2'>
                        {dataUsage.map((usage, index) => {
                            const IconComponent = usage.icon;
                            return (
                                <div
                                    key={index}
                                    className='group rounded-xl border border-border/50 bg-linear-to-br from-background to-muted/10 p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5'
                                >
                                    <div className='flex items-start gap-4'>
                                        <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20'>
                                            <IconComponent className='h-5 w-5' />
                                        </div>
                                        <div>
                                            <h3 className='text-base font-semibold text-foreground mb-2'>
                                                {usage.title}
                                            </h3>
                                            <p className='text-sm text-muted-foreground leading-relaxed'>
                                                {usage.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Data Sharing */}
                <section className='mb-12'>
                    <h2 className='text-2xl font-bold text-foreground mb-6'>
                        Data Sharing & Disclosure
                    </h2>

                    <div className='rounded-xl border border-border/50 bg-linear-to-br from-background to-muted/10 p-6'>
                        <p className='text-sm text-muted-foreground leading-relaxed mb-4'>
                            We do not sell your personal information. We may
                            share data only in the following circumstances:
                        </p>
                        <ul className='space-y-3'>
                            <li className='flex items-start gap-3'>
                                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5'>
                                    <span className='h-1.5 w-1.5 rounded-full bg-primary' />
                                </div>
                                <div>
                                    <span className='text-sm font-medium text-foreground'>
                                        With Event Hosts:{' '}
                                    </span>
                                    <span className='text-sm text-muted-foreground'>
                                        When you join an event, hosts receive
                                        necessary contact information
                                    </span>
                                </div>
                            </li>
                            <li className='flex items-start gap-3'>
                                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5'>
                                    <span className='h-1.5 w-1.5 rounded-full bg-primary' />
                                </div>
                                <div>
                                    <span className='text-sm font-medium text-foreground'>
                                        Service Providers:{' '}
                                    </span>
                                    <span className='text-sm text-muted-foreground'>
                                        Payment processors, email services, and
                                        analytics tools
                                    </span>
                                </div>
                            </li>
                            <li className='flex items-start gap-3'>
                                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5'>
                                    <span className='h-1.5 w-1.5 rounded-full bg-primary' />
                                </div>
                                <div>
                                    <span className='text-sm font-medium text-foreground'>
                                        Legal Requirements:{' '}
                                    </span>
                                    <span className='text-sm text-muted-foreground'>
                                        When required by law or to protect our
                                        rights
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Security */}
                <section className='mb-12'>
                    <h2 className='text-2xl font-bold text-foreground mb-6'>
                        Data Security
                    </h2>

                    <div className='rounded-xl border border-primary/20 bg-linear-to-br from-primary/5 to-background p-6'>
                        <p className='text-sm text-muted-foreground leading-relaxed mb-5'>
                            We implement industry-standard security measures to
                            protect your data:
                        </p>
                        <div className='grid gap-3 sm:grid-cols-2'>
                            {securityMeasures.map((measure, index) => (
                                <div
                                    key={index}
                                    className='flex items-start gap-3 rounded-lg bg-background/50 p-3'
                                >
                                    <div className='flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 mt-0.5'>
                                        <ShieldCheck className='h-3 w-3 text-primary' />
                                    </div>
                                    <span className='text-sm text-foreground'>
                                        {measure}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* User Rights */}
                <section className='mb-12'>
                    <h2 className='text-2xl font-bold text-foreground mb-6'>
                        Your Privacy Rights
                    </h2>

                    <div className='space-y-4'>
                        {userRights.map((right, index) => (
                            <div
                                key={index}
                                className='flex items-start gap-4 rounded-xl border border-border/50 bg-linear-to-br from-background to-muted/10 p-5 transition-all duration-300 hover:border-primary/50'
                            >
                                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm'>
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className='text-base font-semibold text-foreground mb-1'>
                                        {right.title}
                                    </h3>
                                    <p className='text-sm text-muted-foreground'>
                                        {right.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Data Retention */}
                <section className='mb-12'>
                    <div className='rounded-xl border border-border/50 bg-muted/20 p-6'>
                        <h2 className='text-xl font-bold text-foreground mb-4'>
                            Data Retention
                        </h2>
                        <p className='text-sm text-muted-foreground leading-relaxed'>
                            We retain your personal data only as long as
                            necessary to provide our services and comply with
                            legal obligations. After you delete your account, we
                            will remove your data within 30 days, except where
                            retention is required by law or for legitimate
                            business purposes.
                        </p>
                    </div>
                </section>

                {/* Contact */}
                <section className='rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 to-background p-8'>
                    <h2 className='text-2xl font-bold mb-4 text-foreground'>
                        Contact Our Privacy Team
                    </h2>
                    <p className='text-muted-foreground mb-6 leading-relaxed'>
                        Have questions about your privacy or how we handle your
                        data? Our dedicated privacy team is ready to assist you.
                    </p>
                    <div className='flex flex-wrap gap-3'>
                        <a
                            href='mailto:work.mdasraful56@gmail.com'
                            className='inline-flex items-center gap-2 rounded-xl
                        transition-all duration-300
                        hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25
                        dark:bg-slate-800 dark:text-white
                        bg-primary px-6 py-3 text-sm font-medium text-white
                        dark:hover:bg-slate-700 dark:hover:shadow-slate-900/40'
                        >
                            Email Privacy Team
                        </a>
                        {/* <button className='inline-flex items-center gap-2 rounded-xl border border-primary bg-background px-6 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/5'>
                            Download My Data
                        </button> */}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
