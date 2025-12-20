import {
    ArrowRight,
    Calendar,
    Search,
    Star,
    UserPlus,
    Users,
} from 'lucide-react';
import Link from 'next/link';

const HowToUse = () => {
    const steps = [
        {
            number: '01',
            icon: UserPlus,
            title: 'Create Your Account',
            description:
                'Sign up in seconds with your email. Set up your profile with interests and location to get personalized event recommendations.',
            gradient: 'from-blue-500 via-cyan-500 to-teal-500',
            glowColor: 'shadow-blue-500/50',
            bgGradient: 'from-blue-500/10 via-cyan-500/10 to-teal-500/10',
        },
        {
            number: '02',
            icon: Search,
            title: 'Discover Events',
            description:
                'Browse through hundreds of activities near you. Filter by category, date, location, and interests to find the perfect match.',
            gradient: 'from-purple-500 via-pink-500 to-rose-500',
            glowColor: 'shadow-purple-500/50',
            bgGradient: 'from-purple-500/10 via-pink-500/10 to-rose-500/10',
        },
        {
            number: '03',
            icon: Calendar,
            title: 'Join Activities',
            description:
                'Click "Join Event" to reserve your spot. Complete secure payment if required and receive instant confirmation via email.',
            gradient: 'from-orange-500 via-amber-500 to-yellow-500',
            glowColor: 'shadow-orange-500/50',
            bgGradient: 'from-orange-500/10 via-amber-500/10 to-yellow-500/10',
        },
        {
            number: '04',
            icon: Users,
            title: 'Connect & Attend',
            description:
                'View other participants, connect with fellow attendees, and show up to enjoy amazing experiences with like-minded people.',
            gradient: 'from-emerald-500 via-green-500 to-lime-500',
            glowColor: 'shadow-emerald-500/50',
            bgGradient: 'from-emerald-500/10 via-green-500/10 to-lime-500/10',
        },
        {
            number: '05',
            icon: Star,
            title: 'Rate & Review',
            description:
                'Share your experience by rating the event and host. Your feedback helps build a trusted community and improve future events.',
            gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
            glowColor: 'shadow-violet-500/50',
            bgGradient:
                'from-violet-500/10 via-purple-500/10 to-fuchsia-500/10',
        },
    ];

    return (
        <section className='relative py-20 px-4 rounded-2xl bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden'>
            {/* Background Decorations */}
            <div className='absolute inset-0 -z-10'>
                <div className='absolute top-20 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse'></div>
                <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 dark:bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
            </div>

            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-16 animate-fade-in'>
                    <div className='inline-block mb-4'>
                        <span className='px-4 py-2 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold shadow-lg'>
                            Simple & Easy Process
                        </span>
                    </div>
                    <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6'>
                        How It{' '}
                        <span className='text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient'>
                            Works
                        </span>
                    </h2>
                    <p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
                        Get started in minutes and discover activities that
                        match your interests. Join our community and never miss
                        out on exciting experiences.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mb-16 place-items-center'>
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={index}
                                className='group relative'
                                style={{
                                    animation: `fadeInUp 0.6s ease-out forwards`,
                                    animationDelay: `${index * 150}ms`,
                                    opacity: 0,
                                }}
                            >
                                {/* Connecting Line - Hidden on mobile, visible on desktop */}
                                {index < steps.length - 1 && (
                                    <div className='hidden lg:block absolute top-20 left-full w-full h-0.5 -z-10'>
                                        <div
                                            className={`h-full bg-linear-to-r ${step.gradient} opacity-30 animate-pulse`}
                                        ></div>
                                    </div>
                                )}

                                {/* Card */}
                                <div
                                    className={`relative bg-white dark:bg-gray-800 rounded-3xl p-8
                                        border-2 border-gray-200 dark:border-gray-700
                                        hover:border-transparent
                                        transition-all duration-500
                                        hover:-translate-y-4 hover:scale-105 cursor-pointer
                                        overflow-hidden group-hover:shadow-2xl ${step.glowColor}
                                        w-full max-w-[280px] min-h-[420px] flex flex-col`}
                                >
                                    {/* Animated Background Gradient */}
                                    <div
                                        className={`absolute inset-0 bg-linear-to-br ${step.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                    ></div>

                                    {/* Animated Border Gradient */}
                                    <div
                                        className={`absolute inset-0 rounded-3xl bg-linear-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}
                                    ></div>

                                    {/* Content */}
                                    <div className='relative z-10'>
                                        {/* Number Badge */}
                                        <div
                                            className={`absolute -top-4 -right-4 w-16 h-16
                                                bg-linear-to-br ${step.gradient}
                                                rounded-2xl flex items-center
                                                justify-center shadow-xl
                                                transform group-hover:rotate-12 group-hover:scale-110
                                                transition-all duration-500`}
                                        >
                                            <span className='text-white font-bold text-xl'>
                                                {step.number}
                                            </span>
                                        </div>

                                        {/* Icon with Glow */}
                                        <div className='mb-6 flex justify-center relative'>
                                            <div
                                                className={`absolute inset-0 bg-linear-to-r ${step.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                                            ></div>
                                            <div
                                                className='relative w-20 h-20 bg-gray-100 dark:bg-gray-700
                                                    rounded-2xl flex items-center justify-center
                                                    transform group-hover:rotate-6 group-hover:scale-110
                                                    transition-all duration-500 shadow-lg'
                                            >
                                                <Icon
                                                    className={`w-10 h-10 text-gray-600 dark:text-gray-300
                                                        group-hover:scale-125
                                                        transition-all duration-500`}
                                                    style={{
                                                        filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0))',
                                                        transition: 'all 0.5s',
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Title with Gradient on Hover */}
                                        <h3
                                            className='text-xl font-bold text-gray-900 dark:text-white
                                                mb-4 text-center min-h-14 flex items-center justify-center
                                                transition-all duration-300'
                                        >
                                            <span className='group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all duration-300'>
                                                {step.title}
                                            </span>
                                        </h3>

                                        {/* Description */}
                                        <p className='text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed flex-1'>
                                            {step.description}
                                        </p>

                                        {/* Bottom Accent Line */}
                                        <div
                                            className={`absolute bottom-0 left-0 right-0 h-1.5
                                                bg-linear-to-r ${step.gradient}
                                                rounded-b-3xl
                                                transform scale-x-0 group-hover:scale-x-100
                                                transition-transform duration-500 origin-left`}
                                        />

                                        {/* Shine Effect */}
                                        <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl overflow-hidden'>
                                            <div className='absolute inset-0 bg-linear-to-r from-transparent via-white/30 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
                                        </div>

                                        {/* Floating Particles */}
                                        <div className='absolute top-4 right-8 w-2 h-2 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 group-hover:animate-float transition-opacity duration-300'></div>
                                        <div className='absolute bottom-8 left-8 w-2 h-2 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 group-hover:animate-float transition-opacity duration-300 delay-200'></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <div className='text-center animate-fade-in-up'>
                    <div className='inline-block p-1 rounded-2xl bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300'>
                        <div className='bg-white dark:bg-gray-900 rounded-xl px-8 py-12'>
                            <h3 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4'>
                                Ready to start your journey?
                            </h3>
                            <p className='text-gray-600 dark:text-gray-300 mb-8 text-lg max-w-2xl mx-auto'>
                                Join thousands of people discovering amazing
                                events and making lasting connections
                            </p>
                            <Link href='/register'>
                                <button
                                    className='group relative inline-flex items-center gap-3
                                        bg-linear-to-r from-blue-600 via-purple-600 to-pink-600
                                        hover:from-blue-700 hover:via-purple-700 hover:to-pink-700
                                        text-white px-10 py-5 rounded-xl font-bold text-lg
                                        transform hover:scale-105 transition-all
                                        duration-300 shadow-xl hover:shadow-2xl
                                        hover:shadow-purple-500/50 overflow-hidden'
                                >
                                    <span className='relative z-10'>
                                        Get Started Now
                                    </span>
                                    <ArrowRight className='relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300' />

                                    {/* Animated Background */}
                                    <div className='absolute inset-0 bg-linear-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                                    {/* Shine Effect */}
                                    <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                                        <div className='absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700'></div>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                    }
                    25% {
                        transform: translateY(-15px) translateX(8px);
                    }
                    50% {
                        transform: translateY(-8px) translateX(-8px);
                    }
                    75% {
                        transform: translateY(-12px) translateX(4px);
                    }
                }

                @keyframes gradient {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.6;
                    }
                    50% {
                        opacity: 0.3;
                    }
                }

                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradient 3s ease infinite;
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animate-fade-in {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                .animate-fade-in-up {
                    animation: fadeInUp 1s ease-out forwards;
                }

                .delay-200 {
                    animation-delay: 200ms;
                }

                .delay-1000 {
                    animation-delay: 1000ms;
                }

                /* Hover effect for icon glow */
                .group:hover .icon-glow {
                    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.6));
                }
            `}</style>
        </section>
    );
};

export default HowToUse;
