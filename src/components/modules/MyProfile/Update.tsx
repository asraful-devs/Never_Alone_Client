/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Save, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { updateUserByEmail } from '../../../service/admin/usersManagement';
import { Role } from '../../../types/myProfile';
import FormField from './FormField';

const UpdateForm = ({
    role,
    profile,
    onClose,
}: {
    role: Role;
    profile: any;
    onClose: () => void;
}) => {
    const [formData, setFormData] = useState(profile);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            // toast.loading('Updating...');

            const sendData = new FormData();

            // Nested data object (like backend expects)
            const dataObj: any = {};
            if (formData.name) dataObj.name = formData.name;
            if (formData.age) dataObj.age = formData.age;
            if (formData.contactNumber)
                dataObj.contactNumber = formData.contactNumber;
            if (formData.address) dataObj.address = formData.address;

            // console.log('FormData sending:', dataObj);

            // Always append data (even if empty object)
            sendData.append('data', JSON.stringify(dataObj));
            if (file) sendData.append('file', file);

            let result;

            if (role === 'USER') {
                result = await updateUserByEmail(
                    profile?.email,
                    null,
                    sendData
                );
            } else {
                const endpoint =
                    role === 'ADMIN'
                        ? `http://localhost:5000/api/v1/admin/update-admin/${profile.id}`
                        : `http://localhost:5000/api/v1/host/update-host/${profile.id}`;

                const res = await fetch(endpoint, {
                    method: 'PATCH',
                    body: sendData,
                });

                result = res.ok ? { success: true } : { success: false };
            }

            if (result?.success) {
                toast.success('Profile updated!');
                setTimeout(() => onClose(), 500);
            } else {
                toast.error('Update failed');
            }
        } catch (error) {
            toast.error('Error updating profile');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getFields = () => {
        const fieldsByRole: Record<Role, string[]> = {
            USER: ['name', 'age', 'contactNumber', 'address', 'profilePhoto'],
            HOST: ['name', 'contactNumber', 'address', 'profilePhoto'],
            ADMIN: ['name', 'contactNumber', 'profilePhoto'],
        };
        return fieldsByRole[role] || [];
    };

    return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
            <div className='bg-white dark:bg-gray-700 rounded-2xl shadow-2xl max-w-md w-full'>
                <div className='flex justify-between items-center p-6 border-b'>
                    <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-100'>
                        Update Profile
                    </h2>
                    <button
                        onClick={onClose}
                        className='p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg'
                    >
                        <X className='w-6 h-6' />
                    </button>
                </div>

                <div className='p-6 space-y-4'>
                    {getFields().includes('name') && (
                        <FormField
                            label='Name'
                            value={formData.name}
                            onChange={(v) => handleChange('name', v)}
                        />
                    )}

                    {getFields().includes('age') && (
                        <FormField
                            label='Age'
                            type='number'
                            value={formData.age || ''}
                            onChange={(v) =>
                                handleChange('age', parseInt(v) || 0)
                            }
                        />
                    )}

                    {getFields().includes('contactNumber') && (
                        <FormField
                            label='Phone'
                            value={formData.contactNumber || ''}
                            onChange={(v) => handleChange('contactNumber', v)}
                        />
                    )}

                    {getFields().includes('address') && (
                        <FormField
                            label='Address'
                            value={formData.address || ''}
                            onChange={(v) => handleChange('address', v)}
                        />
                    )}

                    {getFields().includes('profilePhoto') && (
                        <div>
                            <label className='block text-sm font-medium mb-2 dark:text-gray-300'>
                                Photo
                            </label>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={(e) =>
                                    setFile(e.target.files?.[0] || null)
                                }
                                className='w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600'
                            />
                        </div>
                    )}

                    <div className='flex gap-3 pt-4'>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className='flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center gap-2'
                        >
                            <Save className='w-4 h-4' />
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className='flex-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-100 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-500'
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateForm;
