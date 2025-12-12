import { Globe, Heart, Target, Zap } from 'lucide-react';

const AboutUsPage = () => {
    const stats = [
        { number: '500+', label: 'Happy Clients' },
        { number: '50+', label: 'Team Members' },
        { number: '10+', label: 'Years Experience' },
        { number: '99%', label: 'Success Rate' },
    ];

    const values = [
        {
            icon: <Target className='w-8 h-8' />,
            title: 'Mission Driven',
            description:
                'We are committed to delivering exceptional solutions that exceed expectations and drive real results.',
        },
        {
            icon: <Heart className='w-8 h-8' />,
            title: 'Customer First',
            description:
                'Our clients are at the heart of everything we do. Your success is our success.',
        },
        {
            icon: <Zap className='w-8 h-8' />,
            title: 'Innovation',
            description:
                'We embrace cutting-edge technology and creative thinking to stay ahead of the curve.',
        },
        {
            icon: <Globe className='w-8 h-8' />,
            title: 'Global Impact',
            description:
                'Making a positive difference in communities around the world through our work.',
        },
    ];

    const team = [
        {
            name: 'Sarah Johnson',
            role: 'CEO & Founder',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        },
        {
            name: 'Michael Chen',
            role: 'CTO',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        },
        {
            name: 'Emily Rodriguez',
            role: 'Head of Design',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        },
        {
            name: 'David Kim',
            role: 'Lead Developer',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        },
    ];

    return (
        <div className='min-h-screen bg-linear-to-br from-slate-50 to-slate-100'>
            {/* Hero Section */}
            <section className='relative bg-linear-to-r from-blue-600 to-purple-600 text-white py-24 px-4'>
                <div className='max-w-6xl mx-auto text-center'>
                    <h1 className='text-5xl md:text-6xl font-bold mb-6'>
                        About Our Company
                    </h1>
                    <p className='text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto'>
                        Building the future through innovation, dedication, and
                        a commitment to excellence since 2014.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className='py-16 px-4 -mt-12'>
                <div className='max-w-6xl mx-auto'>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className='bg-white rounded-2xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform'
                            >
                                <div className='text-4xl font-bold text-blue-600 mb-2'>
                                    {stat.number}
                                </div>
                                <div className='text-gray-600 font-medium'>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className='py-20 px-4'>
                <div className='max-w-6xl mx-auto'>
                    <div className='grid md:grid-cols-2 gap-12 items-center'>
                        <div>
                            <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                                Our Story
                            </h2>
                            <p className='text-lg text-gray-700 mb-4'>
                                Founded in 2014, we started with a simple
                                mission: to create innovative solutions that
                                make a real difference in people&apos;s lives.
                                What began as a small team of passionate
                                individuals has grown into a global company
                                serving clients across 30+ countries.
                            </p>
                            <p className='text-lg text-gray-700 mb-4'>
                                Through dedication, hard work, and an unwavering
                                commitment to quality, we&apos;ve built a
                                reputation for excellence in our industry. Our
                                journey has been marked by continuous growth,
                                learning, and adaptation to the ever-changing
                                technological landscape.
                            </p>
                            <p className='text-lg text-gray-700'>
                                Today, we&apos;re proud to be recognized as
                                leaders in our field, but we&apos;re even more
                                excited about what the future holds.
                            </p>
                        </div>
                        <div className='relative'>
                            <img
                                src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop'
                                alt='Team collaboration'
                                className='rounded-2xl shadow-2xl'
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className='py-20 px-4 bg-white'>
                <div className='max-w-6xl mx-auto'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl font-bold text-gray-900 mb-4'>
                            Our Core Values
                        </h2>
                        <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                            The principles that guide everything we do and shape
                            our company culture.
                        </p>
                    </div>
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className='text-center p-6 rounded-xl hover:bg-blue-50 transition-colors'
                            >
                                <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4'>
                                    {value.icon}
                                </div>
                                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                                    {value.title}
                                </h3>
                                <p className='text-gray-600'>
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className='py-20 px-4'>
                <div className='max-w-6xl mx-auto'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl font-bold text-gray-900 mb-4'>
                            Meet Our Team
                        </h2>
                        <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                            The talented individuals behind our success.
                        </p>
                    </div>
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {team.map((member, index) => (
                            <div key={index} className='group'>
                                <div className='relative overflow-hidden rounded-2xl mb-4'>
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className='w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-300'
                                    />
                                    <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                </div>
                                <h3 className='text-xl font-bold text-gray-900'>
                                    {member.name}
                                </h3>
                                <p className='text-blue-600 font-medium'>
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='py-20 px-4 bg-linear-to-r from-blue-600 to-purple-600 text-white'>
                <div className='max-w-4xl mx-auto text-center'>
                    <h2 className='text-4xl font-bold mb-6'>
                        Ready to Work With Us?
                    </h2>
                    <p className='text-xl text-blue-100 mb-8'>
                        Let&apos;s collaborate and bring your vision to life.
                        Get in touch with us today.
                    </p>
                    <button className='bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg'>
                        Get Started
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;
