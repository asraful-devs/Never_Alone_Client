import { Camera, Mail, Shield } from 'lucide-react';
import Image from 'next/image';

// Types
interface ProfileData {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string;
    contactNumber?: string;
    isDeleted?: boolean;
    createdAt: string;
    updatedAt: string;
}

type Role = 'ADMIN' | 'HOST' | 'USER';

// ProfileHeader Component
const ProfileHeader = ({
    profile,
    role,
}: {
    profile: ProfileData;
    role: Role;
}) => {
    // console.log(profile, 'Hello');
    return (
        <div className='relative bg-linear-to-br from-blue-600 via-blue-700 to-purple-700 dark:from-blue-900 dark:via-purple-900 dark:to-indigo-900 rounded-2xl p-6 md:p-8 text-white shadow-xl overflow-hidden'>
            {/* Background Pattern */}
            <div className='absolute inset-0 opacity-10'>
                <div className='absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32'></div>
                <div className='absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24'></div>
            </div>

            <div className='relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6'>
                {/* Profile Image */}
                <div className='relative group'>
                    <div className='w-28 h-28 md:w-32 md:h-32 rounded-2xl border-4 border-white dark:border-gray-800 shadow-2xl overflow-hidden bg-white'>
                        <Image
                            src={
                                profile?.profilePhoto ||
                                'https://api.dicebear.com/7.x/avataaars/svg?seed=Default'
                            }
                            alt={profile?.name || 'Profile Photo'}
                            className='w-full h-full object-cover'
                            width={128}
                            height={128}
                            priority
                        />
                    </div>
                    <button className='absolute bottom-1 right-1 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg hover:scale-110 transition-transform cursor-pointer'>
                        <Camera className='w-4 h-4 text-blue-600 dark:text-blue-400' />
                    </button>
                </div>

                {/* Profile Info */}
                <div className='flex-1 text-center md:text-left space-y-3'>
                    <div className='flex flex-col md:flex-row items-center md:items-start gap-3'>
                        <div>
                            <div className='flex items-center justify-center md:justify-start gap-2 mb-1'>
                                <h1 className='text-2xl md:text-3xl font-bold'>
                                    {profile?.name}
                                </h1>
                                {role === 'ADMIN' && (
                                    <Shield className='w-5 h-5 md:w-6 md:h-6 text-yellow-300' />
                                )}
                            </div>
                            <p className='text-blue-100 dark:text-blue-200 flex items-center justify-center md:justify-start gap-2 text-sm md:text-base'>
                                <Mail className='w-4 h-4' />
                                {profile?.email}
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-wrap items-center justify-between md:justify-start gap-2'>
                        <div className='flex flex-wrap items-center justify-center md:justify-start gap-2'>
                            <span className='inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium'>
                                {role === 'ADMIN'
                                    ? '👑 Administrator'
                                    : role === 'HOST'
                                    ? '🎯 Event Host'
                                    : '👤 User'}
                            </span>
                            <span className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 dark:bg-green-400/20 backdrop-blur-sm rounded-full text-xs font-medium text-green-100'>
                                <div className='w-2 h-2 bg-green-300 rounded-full animate-pulse'></div>
                                Active
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
