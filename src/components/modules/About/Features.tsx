import { Award, Calendar, Globe, Shield, Users, Zap } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <Calendar className='w-6 h-6' />,
            title: 'Easy Event Creation',
            description:
                'Create and manage events in minutes with our intuitive interface',
        },
        {
            icon: <Users className='w-6 h-6' />,
            title: 'Community Building',
            description:
                'Connect with like-minded people and build lasting relationships',
        },
        {
            icon: <Shield className='w-6 h-6' />,
            title: 'Secure Payments',
            description:
                'Safe and encrypted payment processing for paid events',
        },
        {
            icon: <Zap className='w-6 h-6' />,
            title: 'Instant Notifications',
            description: 'Real-time updates for event changes and new joiners',
        },
        {
            icon: <Award className='w-6 h-6' />,
            title: 'Rating System',
            description:
                'Build trust through transparent host and event ratings',
        },
        {
            icon: <Globe className='w-6 h-6' />,
            title: 'Multiple Cities',
            description: 'Find and create events across major cities',
        },
    ];

    return (
        <div>
            {/* Features Grid */}
            <section className='py-12 sm:py-16 lg:py-20 px-4'>
                <div className='max-w-6xl mx-auto'>
                    <div className='text-center mb-12'>
                        <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                            Why Choose Our Platform?
                        </h2>
                        <p className='text-lg text-gray-600 dark:text-gray-400'>
                            Everything you need to create amazing events
                        </p>
                    </div>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className='bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1'
                            >
                                <div className='w-12 h-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-4'>
                                    {feature.icon}
                                </div>
                                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                                    {feature.title}
                                </h3>
                                <p className='text-gray-600 dark:text-gray-400'>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Features;
