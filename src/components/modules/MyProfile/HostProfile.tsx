'use client';

import { Edit2, MapPin, Phone, Settings, Shield, Star } from 'lucide-react';
import { useState } from 'react';
import { HostProfile } from '../../../types/myProfile';
import InfoCard from './InfoCard';
import ProfileHeader from './ProfileHeader';
import UpdateForm from './Update';

const HostProfileDetails = ({ profile }: { profile: HostProfile }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
            <div className='max-w-7xl mx-auto p-4 md:p-6 lg:p-8'>
                {/* Header Section */}
                <div className='mb-6'>
                    <ProfileHeader profile={profile.data} role='HOST' />
                </div>

                {/* Stats Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
                    <InfoCard
                        icon={Phone}
                        label='Contact Number'
                        value={profile?.data?.contactNumber || 'Add number'}
                        color='blue'
                    />
                    <InfoCard
                        icon={MapPin}
                        label='Address'
                        value={profile?.data?.address || 'Add address'}
                        color='green'
                    />
                    <InfoCard
                        icon={Star}
                        label='Rating'
                        value={
                            profile?.data?.rating
                                ? `${profile?.data?.rating} / 5.0`
                                : 'No ratings yet'
                        }
                        color='orange'
                    />
                    <InfoCard
                        icon={Shield}
                        label='Verification Status'
                        value={
                            profile?.data?.isVerified ? 'Verified' : 'Pending'
                        }
                        color={profile?.data?.isVerified ? 'green' : 'orange'}
                    />
                </div>

                {/* Additional Info Section */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {/* Account Details */}
                    <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700'>
                        <div className='flex items-center justify-between mb-4'>
                            <h2 className='text-lg font-bold text-gray-900 dark:text-gray-100'>
                                Account Details
                            </h2>
                            <Settings className='w-5 h-5 text-gray-400 dark:text-gray-500' />
                        </div>
                        <div className='space-y-4'>
                            <div className='flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700'>
                                <span className='text-sm text-gray-600 dark:text-gray-400'>
                                    Host ID
                                </span>
                                <span className='text-sm font-mono text-gray-900 dark:text-gray-100 truncate max-w-[200px]'>
                                    {profile?.data?.id}
                                </span>
                            </div>
                            <div className='flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700'>
                                <span className='text-sm text-gray-600 dark:text-gray-400'>
                                    Email
                                </span>
                                <span className='text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[200px]'>
                                    {profile?.data?.email}
                                </span>
                            </div>
                            <div className='flex justify-between items-center py-2'>
                                <span className='text-sm text-gray-600 dark:text-gray-400'>
                                    Account Created
                                </span>
                                <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                                    {profile?.data?.createdAt
                                        ? formatDate(profile?.data?.createdAt)
                                        : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700'>
                        <h2 className='text-lg font-bold text-gray-900 dark:text-gray-100 mb-4'>
                            Edit Profile
                        </h2>
                        <div className='space-y-3'>
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className='w-full flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-lg transition-colors'
                            >
                                <Edit2 className='w-4 h-4' />
                                <span className='font-medium'>
                                    Edit Profile Information
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <UpdateForm
                    role='HOST'
                    profile={profile.data}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
};

export default HostProfileDetails;
