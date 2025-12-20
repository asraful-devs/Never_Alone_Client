import {
    BarChart3,
    Calendar,
    CheckCircle,
    Clock,
    FileCheck,
    Mail,
    Shield,
    Users,
} from 'lucide-react';

const ForOrganizersPage = () => {
    const features = [
        {
            icon: Calendar,
            title: 'Easy Event Creation',
            description:
                'Create and publish events in minutes with our intuitive event builder',
            color: 'from-blue-500 to-blue-600',
        },
        {
            icon: Users,
            title: 'Attendee Management',
            description:
                'Track registrations, manage attendees, and communicate directly',
            color: 'from-purple-500 to-purple-600',
        },
        {
            icon: BarChart3,
            title: 'Analytics Dashboard',
            description:
                'Real-time insights into ticket sales, revenue, and attendance',
            color: 'from-green-500 to-green-600',
        },
        {
            icon: Shield,
            title: 'Secure Payments',
            description:
                'Fast, secure payment processing with automatic payouts',
            color: 'from-orange-500 to-orange-600',
        },
    ];

    const approvalSteps = [
        {
            icon: Mail,
            title: 'Submit Application',
            description:
                'Fill out our organizer application form with your details and event plans',
        },
        {
            icon: FileCheck,
            title: 'Admin Review',
            description:
                'Our team reviews your application within 2-3 business days',
        },
        {
            icon: CheckCircle,
            title: 'Get Approved',
            description:
                'Once approved, you can start creating and managing events',
        },
    ];

    const requirements = [
        'Valid government-issued ID',
        'Proof of event organizing experience or credentials',
        'Detailed event plans or portfolio',
        'Business registration (if applicable)',
        'Clear profile photo',
        'Contact information for verification',
    ];

    const benefits = [
        'Professional event pages with custom branding',
        'Mobile-optimized platform for hosts and attendees',
        'QR code check-in for seamless entry',
        '24/7 customer support',
        'Marketing tools to reach more attendees',
        'Secure payment processing',
    ];

    return (
        <div className='min-h-screen bg-background'>
            {/* Hero Section */}
            <div className='relative overflow-hidden border-b border-border/50 bg-linear-to-br from-primary/5 via-background to-muted/20'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--primary-rgb),0.1),transparent_50%)]' />
                <div className='relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8'>
                    <div className='text-center max-w-3xl mx-auto'>
                        <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6'>
                            <Shield className='h-4 w-4' />
                            Verified Event Organizers
                        </div>
                        <h1 className='text-5xl font-bold leading-tight mb-6'>
                            <span className='bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
                                Become a Verified
                            </span>
                            <br />
                            <span className='bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
                                Event Organizer
                            </span>
                        </h1>
                        <p className='text-xl text-muted-foreground leading-relaxed mb-8'>
                            Join our community of trusted hosts and create
                            meaningful experiences for thousands of attendees.
                        </p>
                    </div>
                </div>
            </div>

            {/* Approval Process */}
            <div className='mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8'>
                <div className='text-center mb-16'>
                    <h2 className='text-4xl font-bold mb-4 text-foreground'>
                        How to Become a Host
                    </h2>
                    <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                        Our verification process ensures quality and trust for
                        all attendees
                    </p>
                </div>

                <div className='grid gap-8 md:grid-cols-3 mb-16'>
                    {approvalSteps.map((step, index) => {
                        const IconComponent = step.icon;
                        return (
                            <div key={index} className='relative'>
                                <div className='rounded-2xl border border-border/50 bg-linear-to-br from-background to-muted/10 p-8 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1'>
                                    <div className='inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/80 text-white dark:text-black mb-6 shadow-lg shadow-primary/25'>
                                        <IconComponent className='h-8 w-8' />
                                    </div>
                                    <h3 className='text-xl font-semibold text-foreground mb-3'>
                                        {step.title}
                                    </h3>
                                    <p className='text-muted-foreground leading-relaxed'>
                                        {step.description}
                                    </p>
                                </div>
                                {index < approvalSteps.length - 1 && (
                                    <div className='hidden md:block absolute top-1/2 -right-4 z-10'>
                                        <div className='h-0.5 w-8 bg-linear-to-r from-primary/50 to-transparent' />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Requirements */}
                <div className='rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 to-background p-8'>
                    <div className='text-center mb-8'>
                        <h3 className='text-2xl font-bold text-foreground mb-3'>
                            Application Requirements
                        </h3>
                        <p className='text-muted-foreground'>
                            Please prepare the following documents before
                            applying
                        </p>
                    </div>
                    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'>
                        {requirements.map((requirement, index) => (
                            <div
                                key={index}
                                className='flex items-start gap-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 p-4 transition-all duration-300 hover:border-primary/50'
                            >
                                <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5'>
                                    <CheckCircle className='h-4 w-4 text-primary' />
                                </div>
                                <span className='text-sm text-foreground'>
                                    {requirement}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className='border-y border-border/50 bg-linear-to-b from-muted/20 to-background py-20'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl font-bold mb-4 text-foreground'>
                            Powerful Tools for Organizers
                        </h2>
                        <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                            Everything you need to create successful events
                        </p>
                    </div>

                    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className='group rounded-2xl border border-border/50 bg-background p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1'
                                >
                                    <div
                                        className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br ${feature.color} text-white mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}
                                    >
                                        <IconComponent className='h-7 w-7' />
                                    </div>
                                    <h3 className='text-lg font-semibold text-foreground mb-2'>
                                        {feature.title}
                                    </h3>
                                    <p className='text-sm text-muted-foreground leading-relaxed'>
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Benefits */}
            <div className='mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8'>
                <div className='text-center mb-16'>
                    <h2 className='text-4xl font-bold mb-4 text-foreground'>
                        Why Organizers Choose Us
                    </h2>
                    <p className='text-xl text-muted-foreground'>
                        Join hundreds of successful event hosts
                    </p>
                </div>

                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'>
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className='flex items-center gap-3 rounded-xl border border-border/50 bg-linear-to-br from-background to-muted/10 p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg'
                        >
                            <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
                                <CheckCircle className='h-5 w-5 text-primary' />
                            </div>
                            <span className='text-sm text-foreground font-medium'>
                                {benefit}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className='border-t border-border/50 bg-linear-to-b from-background to-muted/20 py-20'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-primary/5 to-background p-12 text-center'>
                        <div className='inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white dark:text-black mb-6 shadow-lg shadow-primary/25'>
                            <Mail className='h-8 w-8 ' />
                        </div>
                        <h2 className='text-4xl font-bold mb-4 text-foreground'>
                            Ready to Get Started?
                        </h2>
                        <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
                            Submit your organizer application and join our
                            community of verified hosts.
                        </p>
                        <div className='flex items-center justify-center gap-4 mb-6'>
                            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                <Clock className='h-4 w-4 text-primary' />
                                <span>2-3 days approval time</span>
                            </div>
                            <div className='h-4 w-px bg-border' />
                            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                <Shield className='h-4 w-4 text-primary' />
                                <span>Verified & trusted</span>
                            </div>
                        </div>
                        <a
                            href='mailto:work.mdasraful56@gmail.com?subject=Organizer%20Application&body=I%20would%20like%20to%20apply%20to%20become%20a%20verified%20event%20organizer.'
                            className='inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-medium text-white dark:text-black transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 hover:scale-105'
                        >
                            <Mail className='h-5 w-5' />
                            Apply to Become a Host
                        </a>
                        <p className='mt-4 text-sm text-muted-foreground'>
                            Questions? Email us at{' '}
                            <a
                                href='mailto:organizers@neveralone.com'
                                className='text-primary hover:underline'
                            >
                                organizers@neveralone.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForOrganizersPage;
