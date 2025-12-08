import { ArrowRight, Calendar, Sparkles, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className='mb-5 rounded-2xl py-5 md:py-7 lg:py-10 bg-linear-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid items-center gap-8 lg:grid-cols-2 lg:gap-12'>
                    {/* Left Content */}
                    <div className='flex flex-col items-center text-center lg:items-start lg:text-left'>
                        {/* Badge */}
                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 mb-6'>
                            <Sparkles className='w-4 h-4 text-blue-600 dark:text-blue-400' />
                            <span className='text-sm font-medium text-blue-700 dark:text-blue-300'>
                                Never Miss Out Again
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight'>
                            Find Your Next
                            <span className='block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400'>
                                Adventure Together
                            </span>
                        </h1>

                        {/* Description */}
                        <p className='text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl leading-relaxed'>
                            Connect with like-minded people for concerts,
                            sports, hiking, dining, and more. Join thousands
                            who&apos;ve found their perfect activity partners
                            and created unforgettable memories.
                        </p>

                        {/* Stats */}
                        <div className='flex flex-wrap gap-6 mb-8 justify-center lg:justify-start'>
                            <div className='flex items-center gap-2'>
                                <div className='w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center'>
                                    <Users className='w-5 h-5 text-green-600 dark:text-green-400' />
                                </div>
                                <div>
                                    <p className='text-xl font-bold text-gray-900 dark:text-white'>
                                        50K+
                                    </p>
                                    <p className='text-xs text-gray-600 dark:text-gray-400'>
                                        Active Members
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center'>
                                    <Calendar className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                                </div>
                                <div>
                                    <p className='text-xl font-bold text-gray-900 dark:text-white'>
                                        10K+
                                    </p>
                                    <p className='text-xs text-gray-600 dark:text-gray-400'>
                                        Events Monthly
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
                            <Link
                                href='/events'
                                className='inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-linear-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
                            >
                                Explore Events
                                <ArrowRight className='ml-2 w-5 h-5' />
                            </Link>
                            <Link
                                href='/register'
                                className='inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-400 dark:hover:border-gray-600 transform hover:scale-105 transition-all duration-300'
                            >
                                Create an Accounts
                            </Link>
                        </div>

                        {/* Trust Badge */}
                        <div className='mt-8 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                            <svg
                                className='w-5 h-5 text-green-500'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                    clipRule='evenodd'
                                />
                            </svg>
                            <span>
                                Free to Account • Secure payments • Verified
                                hosts
                            </span>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className='relative lg:order-last order-first'>
                        <div className='relative rounded-2xl overflow-hidden shadow-2xl'>
                            <Image
                                src='https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop'
                                alt='Group of diverse people enjoying activities together at an outdoor event'
                                className='w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover'
                                width={800}
                                height={600}
                            />
                            {/* Gradient Overlay */}
                            <div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent'></div>
                        </div>

                        {/* Floating Cards */}
                        <div className='absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-200 dark:border-gray-700 hidden sm:block'>
                            <div className='flex items-center gap-3'>
                                <div className='w-12 h-12 rounded-full bg-linear-to-br from-orange-400 to-pink-500 flex items-center justify-center'>
                                    <span className='text-white text-xl'>
                                        🎵
                                    </span>
                                </div>
                                <div>
                                    <p className='font-semibold text-gray-900 dark:text-white text-sm'>
                                        Live Concert Tonight
                                    </p>
                                    <p className='text-xs text-gray-600 dark:text-gray-400'>
                                        12 people joined
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-200 dark:border-gray-700 hidden lg:block'>
                            <div className='flex items-center gap-3'>
                                <div className='w-12 h-12 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center'>
                                    <span className='text-white text-xl'>
                                        ⛰️
                                    </span>
                                </div>
                                <div>
                                    <p className='font-semibold text-gray-900 dark:text-white text-sm'>
                                        Weekend Hiking
                                    </p>
                                    <p className='text-xs text-gray-600 dark:text-gray-400'>
                                        8 spots left
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
