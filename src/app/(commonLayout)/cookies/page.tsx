import { Clock, Cookie, Eye, Settings, Shield } from 'lucide-react';

const CookiePolicyPage = () => {
    const lastUpdated = 'December 19, 2025';

    const cookieTypes = [
        {
            icon: Shield,
            title: 'Essential Cookies',
            description: 'Required for basic site functionality and security',
            examples: [
                'Authentication tokens',
                'Session management',
                'Security preferences',
            ],
            duration: 'Session or 1 year',
            canDisable: false,
        },
        {
            icon: Settings,
            title: 'Functional Cookies',
            description: 'Enhance your experience with personalized features',
            examples: [
                'Language preferences',
                'Theme settings',
                'Recently viewed events',
            ],
            duration: '1 year',
            canDisable: true,
        },
        {
            icon: Eye,
            title: 'Analytics Cookies',
            description: 'Help us understand how you use our platform',
            examples: [
                'Page views',
                'User interactions',
                'Performance metrics',
            ],
            duration: '2 years',
            canDisable: true,
        },
    ];

    const userRights = [
        'View what cookies we use and why',
        'Disable non-essential cookies at any time',
        'Clear cookies from your browser',
        'Request information about your data',
        'Opt-out of analytics tracking',
    ];

    return (
        <div className='min-h-screen bg-background'>
            {/* Header */}
            <div className='border-b border-border/50 bg-linear-to-b from-muted/30 to-background'>
                <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
                    <div className='flex items-center gap-4 mb-6'>
                        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/80 shadow-lg shadow-primary/25'>
                            <Cookie className='h-7 w-7 text-white dark:text-black' />
                        </div>
                        <div>
                            <h1 className='text-4xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
                                Cookie Policy
                            </h1>
                            <p className='text-sm text-muted-foreground mt-1'>
                                Last updated: {lastUpdated}
                            </p>
                        </div>
                    </div>
                    <p className='text-lg text-muted-foreground leading-relaxed'>
                        Learn how Never Alone uses cookies to improve your
                        experience and protect your privacy.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
                {/* Introduction */}
                <section className='mb-12'>
                    <h2 className='text-2xl font-bold mb-4 text-foreground'>
                        What Are Cookies?
                    </h2>
                    <div className='prose prose-slate dark:prose-invert max-w-none'>
                        <p className='text-muted-foreground leading-relaxed'>
                            Cookies are small text files placed on your device
                            when you visit our website. They help us provide you
                            with a better experience by remembering your
                            preferences, keeping you signed in, and
                            understanding how you use our platform.
                        </p>
                    </div>
                </section>

                {/* Cookie Types */}
                <section className='mb-12'>
                    <h2 className='text-2xl font-bold mb-6 text-foreground'>
                        Types of Cookies We Use
                    </h2>
                    <div className='space-y-6'>
                        {cookieTypes.map((cookie, index) => {
                            const IconComponent = cookie.icon;
                            return (
                                <div
                                    key={index}
                                    className='group relative rounded-2xl border border-border/50 bg-linear-to-br from-background to-muted/20 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5'
                                >
                                    <div className='flex items-start gap-4'>
                                        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20'>
                                            <IconComponent className='h-6 w-6' />
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <div className='flex items-center justify-between mb-2'>
                                                <h3 className='text-lg font-semibold text-foreground'>
                                                    {cookie.title}
                                                </h3>
                                                {!cookie.canDisable ? (
                                                    <span className='inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary'>
                                                        Required
                                                    </span>
                                                ) : (
                                                    <span className='inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground'>
                                                        Optional
                                                    </span>
                                                )}
                                            </div>
                                            <p className='text-sm text-muted-foreground mb-4'>
                                                {cookie.description}
                                            </p>
                                            <div className='space-y-2'>
                                                <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                                                    <Clock className='h-3.5 w-3.5' />
                                                    <span>
                                                        Duration:{' '}
                                                        {cookie.duration}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className='text-xs font-medium text-foreground/80 mb-1.5'>
                                                        Examples:
                                                    </p>
                                                    <ul className='space-y-1'>
                                                        {cookie.examples.map(
                                                            (example, idx) => (
                                                                <li
                                                                    key={idx}
                                                                    className='text-xs text-muted-foreground flex items-center gap-2'
                                                                >
                                                                    <span className='h-1 w-1 rounded-full bg-primary' />
                                                                    {example}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Your Rights */}
                <section className='mb-12'>
                    <h2 className='text-2xl font-bold mb-6 text-foreground'>
                        Your Cookie Rights
                    </h2>
                    <div className='rounded-2xl border border-border/50 bg-linear-to-br from-primary/5 to-background p-6'>
                        <p className='text-muted-foreground mb-4 leading-relaxed'>
                            You have full control over how cookies are used on
                            your device. You can:
                        </p>
                        <ul className='space-y-3'>
                            {userRights.map((right, index) => (
                                <li
                                    key={index}
                                    className='flex items-start gap-3'
                                >
                                    <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5'>
                                        <span className='text-xs font-bold text-primary'>
                                            {index + 1}
                                        </span>
                                    </div>
                                    <span className='text-sm text-foreground pt-0.5'>
                                        {right}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Managing Cookies */}
                <section className='mb-12'>
                    <h2 className='text-2xl font-bold mb-4 text-foreground'>
                        Managing Your Cookies
                    </h2>
                    <div className='prose prose-slate dark:prose-invert max-w-none'>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            You can control and manage cookies in several ways.
                            Most browsers allow you to refuse or accept cookies
                            through their settings. However, please note that
                            disabling essential cookies may affect the
                            functionality of our platform.
                        </p>
                        <div className='rounded-xl border border-border/50 bg-muted/20 p-5'>
                            <p className='text-sm text-muted-foreground mb-3'>
                                To manage cookies in popular browsers:
                            </p>
                            <ul className='space-y-2 text-sm text-muted-foreground'>
                                <li className='flex items-center gap-2'>
                                    <span className='h-1.5 w-1.5 rounded-full bg-primary' />
                                    Chrome: Settings → Privacy and security →
                                    Cookies
                                </li>
                                <li className='flex items-center gap-2'>
                                    <span className='h-1.5 w-1.5 rounded-full bg-primary' />
                                    Firefox: Settings → Privacy & Security →
                                    Cookies
                                </li>
                                <li className='flex items-center gap-2'>
                                    <span className='h-1.5 w-1.5 rounded-full bg-primary' />
                                    Safari: Preferences → Privacy → Cookies
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section className='rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 to-background p-8'>
                    <h2 className='text-2xl font-bold mb-4 text-foreground'>
                        Questions?
                    </h2>
                    <p className='text-muted-foreground mb-6 leading-relaxed'>
                        If you have any questions about our Cookie Policy or how
                        we handle your data, please don&apos;t hesitate to reach
                        out.
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
                        Contact Privacy Team
                    </a>
                </section>
            </div>
        </div>
    );
};

export default CookiePolicyPage;
