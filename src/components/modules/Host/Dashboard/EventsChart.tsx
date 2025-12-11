'use client';

import { Card } from '@/components/ui/card';
import { Event } from '@/types/event.interface';

interface EventsChartProps {
    events: Event[];
}

const EventsChart = ({ events }: EventsChartProps) => {
    // Calculate events by category
    const eventsByCategory = events.reduce((acc, event) => {
        const categoryName = event.category?.name || 'Uncategorized';
        const existing = acc.find((item) => item.name === categoryName);
        if (existing) {
            existing.count += 1;
        } else {
            acc.push({
                name: categoryName,
                count: 1,
                color: event.category?.color || 'blue',
            });
        }
        return acc;
    }, [] as Array<{ name: string; count: number; color: string }>);

    // Calculate total registrations
    const totalRegistrations = events.reduce(
        (sum, event) => sum + event.userIds.length,
        0
    );

    // Calculate average registrations per event
    const avgRegistrations =
        events.length > 0 ? Math.round(totalRegistrations / events.length) : 0;

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Events by Category */}
            <Card className='p-6'>
                <h3 className='text-lg font-bold text-foreground mb-6'>
                    Events by Category
                </h3>
                {eventsByCategory.length === 0 ? (
                    <div className='flex items-center justify-center py-8 text-muted-foreground'>
                        No events to display
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {eventsByCategory.map((category, index) => {
                            const maxCount = Math.max(
                                ...eventsByCategory.map((c) => c.count)
                            );
                            const percentage =
                                (category.count / maxCount) * 100;

                            return (
                                <div key={index}>
                                    <div className='flex items-center justify-between mb-2'>
                                        <span className='text-sm font-medium'>
                                            {category.name}
                                        </span>
                                        <span className='text-sm font-bold text-foreground'>
                                            {category.count}
                                        </span>
                                    </div>
                                    <div className='w-full bg-secondary rounded-full h-2 overflow-hidden'>
                                        <div
                                            className='h-full bg-primary transition-all'
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Card>

            {/* Registration Statistics */}
            <Card className='p-6'>
                <h3 className='text-lg font-bold text-foreground mb-6'>
                    Registration Statistics
                </h3>
                <div className='space-y-6'>
                    {/* Total Registrations */}
                    <div className='bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-4 rounded-lg'>
                        <p className='text-sm text-muted-foreground mb-1'>
                            Total Registrations
                        </p>
                        <p className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
                            {totalRegistrations}
                        </p>
                    </div>

                    {/* Average Registrations */}
                    <div className='bg-linear-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-4 rounded-lg'>
                        <p className='text-sm text-muted-foreground mb-1'>
                            Avg. Per Event
                        </p>
                        <p className='text-3xl font-bold text-green-600 dark:text-green-400'>
                            {avgRegistrations}
                        </p>
                    </div>

                    {/* Events Count */}
                    <div className='bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-4 rounded-lg'>
                        <p className='text-sm text-muted-foreground mb-1'>
                            Total Events
                        </p>
                        <p className='text-3xl font-bold text-purple-600 dark:text-purple-400'>
                            {events.length}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default EventsChart;
