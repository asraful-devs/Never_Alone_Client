// InfoCard Component
const InfoCard = ({
    icon: Icon,
    label,
    value,
    color = 'blue',
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    label: string;
    value: string | number;
    color?: 'blue' | 'purple' | 'green' | 'orange';
}) => {
    const colorClasses = {
        blue: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400',
        purple: 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400',
        green: 'bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400',
        orange: 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400',
    };

    return (
        <div className='group bg-white dark:bg-gray-800 rounded-xl p-4 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800'>
            <div className='flex items-center gap-3'>
                <div
                    className={`${colorClasses[color]} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}
                >
                    <Icon className='w-5 h-5' />
                </div>
                <div className='flex-1 min-w-0'>
                    <p className='text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5'>
                        {label}
                    </p>
                    <p className='text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 truncate'>
                        {value || 'Not provided'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
