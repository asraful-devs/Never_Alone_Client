import {
    Camera,
    Coffee,
    Dumbbell,
    Music,
    Palette,
    Plane,
    Users,
    Utensils,
} from 'lucide-react';

const Categories = () => {
    const categories = [
        {
            id: 1,
            name: 'Music & Concerts',
            icon: Music,
            count: '1,234',
            gradient: 'from-purple-500 to-pink-500',
            bgLight: 'bg-purple-50',
            bgDark: 'dark:bg-purple-950/30',
            hoverBorder: 'hover:border-purple-500 dark:hover:border-purple-400',
        },
        {
            id: 2,
            name: 'Sports & Fitness',
            icon: Dumbbell,
            count: '2,456',
            gradient: 'from-green-500 to-emerald-500',
            bgLight: 'bg-green-50',
            bgDark: 'dark:bg-green-950/30',
            hoverBorder: 'hover:border-green-500 dark:hover:border-green-400',
        },
        {
            id: 3,
            name: 'Food & Dining',
            icon: Utensils,
            count: '987',
            gradient: 'from-orange-500 to-red-500',
            bgLight: 'bg-orange-50',
            bgDark: 'dark:bg-orange-950/30',
            hoverBorder: 'hover:border-orange-500 dark:hover:border-orange-400',
        },
        {
            id: 4,
            name: 'Travel & Adventure',
            icon: Plane,
            count: '1,543',
            gradient: 'from-blue-500 to-cyan-500',
            bgLight: 'bg-blue-50',
            bgDark: 'dark:bg-blue-950/30',
            hoverBorder: 'hover:border-blue-500 dark:hover:border-blue-400',
        },
        {
            id: 5,
            name: 'Arts & Culture',
            icon: Palette,
            count: '765',
            gradient: 'from-pink-500 to-rose-500',
            bgLight: 'bg-pink-50',
            bgDark: 'dark:bg-pink-950/30',
            hoverBorder: 'hover:border-pink-500 dark:hover:border-pink-400',
        },
        {
            id: 6,
            name: 'Social Meetups',
            icon: Users,
            count: '3,210',
            gradient: 'from-indigo-500 to-purple-500',
            bgLight: 'bg-indigo-50',
            bgDark: 'dark:bg-indigo-950/30',
            hoverBorder: 'hover:border-indigo-500 dark:hover:border-indigo-400',
        },
        {
            id: 7,
            name: 'Coffee & Networking',
            icon: Coffee,
            count: '654',
            gradient: 'from-amber-500 to-yellow-500',
            bgLight: 'bg-amber-50',
            bgDark: 'dark:bg-amber-950/30',
            hoverBorder: 'hover:border-amber-500 dark:hover:border-amber-400',
        },
        {
            id: 8,
            name: 'Photography',
            icon: Camera,
            count: '432',
            gradient: 'from-slate-500 to-gray-500',
            bgLight: 'bg-slate-50',
            bgDark: 'dark:bg-slate-950/30',
            hoverBorder: 'hover:border-slate-500 dark:hover:border-slate-400',
        },
    ];

    return (
        <section className='py-16 md:py-24 bg-white dark:bg-gray-950'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Header */}
                <div className='text-center mb-12 md:mb-16'>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
                        Explore Popular Categories
                    </h2>
                    <p className='text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
                        Discover events and activities that match your
                        interests. From concerts to fitness, find your perfect
                        experience.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <a
                                key={category.id}
                                href={`/events?category=${category.name
                                    .toLowerCase()
                                    .replace(/\s+/g, '-')}`}
                                className={`group relative bg-white dark:bg-gray-900 rounded-2xl p-6
                                         border-2 border-gray-200 dark:border-gray-800
                                         ${category.hoverBorder}
                                         hover:shadow-xl dark:hover:shadow-2xl
                                         transition-all duration-300 cursor-pointer
                                         hover:-translate-y-1`}
                            >
                                {/* Icon Container */}
                                <div className='mb-4'>
                                    <div
                                        className={`inline-flex items-center justify-center w-14 h-14
                                                   rounded-xl ${category.bgLight} ${category.bgDark}
                                                   group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <Icon className='w-7 h-7 text-gray-700 dark:text-gray-300' />
                                    </div>
                                </div>

                                {/* Category Name */}
                                <h3
                                    className='text-xl font-bold text-gray-900 dark:text-white mb-2
                                             group-hover:text-transparent group-hover:bg-clip-text
                                             group-hover:bg-linear-to-r group-hover:${category.gradient}
                                             transition-all duration-300'
                                >
                                    {category.name}
                                </h3>

                                {/* Event Count */}
                                <div className='flex items-center gap-2'>
                                    <span className='text-2xl font-bold text-gray-900 dark:text-white'>
                                        {category.count}
                                    </span>
                                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                                        events
                                    </span>
                                </div>

                                {/* Arrow Icon on Hover */}
                                <div
                                    className='absolute top-6 right-6 opacity-0 group-hover:opacity-100
                                              transition-opacity duration-300'
                                >
                                    <svg
                                        className='w-5 h-5 text-gray-400 dark:text-gray-500'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M9 5l7 7-7 7'
                                        />
                                    </svg>
                                </div>

                                {/* Bottom Gradient Line */}
                                <div
                                    className={`absolute bottom-0 left-0 right-0 h-1
                                               bg-linear-to-r ${category.gradient}
                                               rounded-b-2xl opacity-0 group-hover:opacity-100
                                               transition-opacity duration-300`}
                                />
                            </a>
                        );
                    })}
                </div>

                {/* View All Button */}
                <div className='text-center mt-12'>
                    <a
                        href='/categories'
                        className='inline-flex items-center gap-2 px-8 py-4
                                 text-base font-semibold text-gray-900 dark:text-white
                                 bg-gray-100 dark:bg-gray-800
                                 border-2 border-gray-300 dark:border-gray-700
                                 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-750
                                 hover:border-gray-400 dark:hover:border-gray-600
                                 transform hover:scale-105 transition-all duration-300'
                    >
                        View All Categories
                        <svg
                            className='w-5 h-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Categories;
