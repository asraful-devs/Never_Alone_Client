const Journey = () => {
    const milestones = [
        {
            year: '2025',
            title: 'Platform Launch',
            description:
                'Started with a vision to connect people through events',
        },
        {
            year: '2025',
            title: 'Rapid Growth',
            description: 'Reached 1000+ active users and 50+ cities',
        },
        {
            year: '2025',
            title: '10K+ Events',
            description:
                'Successfully facilitated thousands of memorable gatherings',
        },
        {
            year: '2026',
            title: 'Expanding Horizons',
            description: 'Continuously improving and adding new features',
        },
    ];

    return (
        <div>
            {/* Timeline Section */}
            <section className='py-12 sm:py-16 lg:py-20 px-4 bg-white dark:bg-slate-800/50 rounded-2xl'>
                <div className='max-w-6xl mx-auto'>
                    <div className='text-center mb-12'>
                        <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                            Our Journey
                        </h2>
                        <p className='text-lg text-gray-600 dark:text-gray-400'>
                            Key milestones in our growth story
                        </p>
                    </div>
                    <div className='relative'>
                        {/* Timeline Line */}
                        <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-linear-to-b from-blue-500 to-purple-500'></div>

                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className={`relative mb-8 md:mb-12 ${
                                    index % 2 === 0
                                        ? 'md:text-right'
                                        : 'md:text-left'
                                }`}
                            >
                                <div
                                    className={`md:w-1/2 ${
                                        index % 2 === 0
                                            ? 'md:pr-12'
                                            : 'md:ml-auto md:pl-12'
                                    }`}
                                >
                                    <div className='bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg'>
                                        <div className='inline-block bg-linear-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-3'>
                                            {milestone.year}
                                        </div>
                                        <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                                            {milestone.title}
                                        </h3>
                                        <p className='text-gray-600 dark:text-gray-400'>
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>
                                {/* Timeline Dot */}
                                <div className='hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-800 border-4 border-blue-500 rounded-full'></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Journey;
