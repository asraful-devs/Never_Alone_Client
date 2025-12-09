import { Calendar, Search, Star, UserPlus, Users } from 'lucide-react';
import Link from 'next/link';

const HowToUse = () => {
    const steps = [
        {
            number: '01',
            icon: UserPlus,
            title: 'Create Your Account',
            description:
                'Sign up in seconds with your email. Set up your profile with interests and location to get personalized event recommendations.',
        },
        {
            number: '02',
            icon: Search,
            title: 'Discover Events',
            description:
                'Browse through hundreds of activities near you. Filter by category, date, location, and interests to find the perfect match.',
        },
        {
            number: '03',
            icon: Calendar,
            title: 'Join Activities',
            description:
                'Click "Join Event" to reserve your spot. Complete secure payment if required and receive instant confirmation via email.',
        },
        {
            number: '04',
            icon: Users,
            title: 'Connect & Attend',
            description:
                'View other participants, connect with fellow attendees, and show up to enjoy amazing experiences with like-minded people.',
        },
        {
            number: '05',
            icon: Star,
            title: 'Rate & Review',
            description:
                'Share your experience by rating the event and host. Your feedback helps build a trusted community and improve future events.',
        },
    ];

    return (
        <section className='py-20 px-4 rounded-2xl bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-16'>
                    <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
                        How It Works
                    </h2>
                    <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
                        Get started in minutes and discover activities that
                        match your interests. Join our community and never miss
                        out on exciting experiences.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={index}
                                className='group relative bg-white dark:bg-gray-800 rounded-2xl p-6
                                        border-2 border-gray-200 dark:border-gray-700
                                        hover:border-blue-500 dark:hover:border-blue-400
                                        hover:shadow-xl dark:hover:shadow-blue-500/20
                                        transition-all duration-300
                                        hover:-translate-y-2 cursor-pointer'
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                {/* Number Badge */}
                                <div
                                    className='absolute -top-4 -left-4 w-12 h-12
                                            bg-linear-to-br from-blue-500 to-blue-600
                                            dark:from-blue-400 dark:to-blue-500
                                            rounded-full flex items-center
                                            justify-center shadow-lg
                                          group-hover:scale-110
                                          transition-transform duration-300'
                                >
                                    <span className='text-white font-bold text-lg'>
                                        {step.number}
                                    </span>
                                </div>

                                {/* Icon */}
                                <div className='mt-4 mb-6 flex justify-center'>
                                    <div
                                        className='w-16 h-16 bg-blue-50 dark:bg-blue-900/30
                                                rounded-full flex items-center
                                                justify-center
                                                group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50
                                                transition-colors duration-300'
                                    >
                                        <Icon
                                            className='w-8 h-8 text-blue-600 dark:text-blue-400
                                                    group-hover:scale-110
                                                    transition-transform duration-300'
                                        />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3
                                    className='text-xl font-bold text-gray-900 dark:text-white
                                            mb-3 text-center
                                            group-hover:text-blue-600 dark:group-hover:text-blue-400
                                            transition-colors duration-300'
                                >
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className='text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed'>
                                    {step.description}
                                </p>

                                {/* Decorative element */}
                                <div
                                    className='absolute bottom-0 left-0 right-0 h-1
                                            bg-linear-to-r from-blue-500 to-purple-500
                                            dark:from-blue-400 dark:to-purple-400
                                            rounded-b-2xl opacity-0
                                            group-hover:opacity-100 transition-opacity duration-300'
                                />
                            </div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <div className='mt-16 text-center'>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                        Ready to start your journey?
                    </p>
                    <Link href='/register'>
                        <button
                            className='bg-blue-600 dark:bg-blue-500
                                text-white px-8 py-4 rounded-lg font-semibold
                                hover:bg-blue-700 dark:hover:bg-blue-600
                                transform hover:scale-105 transition-all
                                duration-300 shadow-lg hover:shadow-xl
                                dark:shadow-blue-500/50 dark:hover:shadow-blue-500/70'
                        >
                            Get Started Now
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HowToUse;
