'use client';

import { Card } from '@/components/ui/card';

interface SystemOverviewProps {
    totalUsers: number;
    totalHosts: number;
    totalAdmins: number;
    totalEvents: number;
    totalCategories: number;
}

const Bar = ({
    label,
    value,
    max,
}: {
    label: string;
    value: number;
    max: number;
}) => {
    const pct = max > 0 ? Math.round((value / max) * 100) : 0;
    return (
        <div>
            <div className='flex items-center justify-between mb-1'>
                <span className='text-sm font-medium'>{label}</span>
                <span className='text-sm font-bold text-foreground'>
                    {value}
                </span>
            </div>
            <div className='w-full bg-secondary rounded-full h-2 overflow-hidden'>
                <div
                    className='h-full bg-primary transition-all'
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
};

const StatTile = ({
    title,
    value,
    accent,
}: {
    title: string;
    value: number;
    accent: string;
}) => (
    <div className={`p-4 rounded-lg ${accent}`}>
        <p className='text-sm text-muted-foreground mb-1'>{title}</p>
        <p className='text-3xl font-bold'>{value}</p>
    </div>
);

const SystemOverview = ({
    totalUsers,
    totalHosts,
    totalAdmins,
    totalEvents,
    totalCategories,
}: SystemOverviewProps) => {
    const maxUserGroup = Math.max(totalUsers, totalHosts, totalAdmins);

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <Card className='p-6'>
                <h3 className='text-lg font-bold text-foreground mb-6'>
                    Users by Role
                </h3>
                <div className='space-y-4'>
                    <Bar label='Users' value={totalUsers} max={maxUserGroup} />
                    <Bar label='Hosts' value={totalHosts} max={maxUserGroup} />
                    <Bar
                        label='Admins'
                        value={totalAdmins}
                        max={maxUserGroup}
                    />
                </div>
            </Card>

            <Card className='p-6'>
                <h3 className='text-lg font-bold text-foreground mb-6'>
                    System Stats
                </h3>
                <div className='space-y-4'>
                    <StatTile
                        title='Total Events'
                        value={totalEvents}
                        accent='bg-blue-50 dark:bg-blue-950'
                    />
                    <StatTile
                        title='Categories'
                        value={totalCategories}
                        accent='bg-purple-50 dark:bg-purple-950'
                    />
                </div>
            </Card>
        </div>
    );
};

export default SystemOverview;
