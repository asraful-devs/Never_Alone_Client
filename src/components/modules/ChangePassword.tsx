'use client';

import { AlertCircle, Check, Eye, EyeOff, Lock, Shield, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getUserInfo } from '../../service/auth/getUserInfo';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Password strength checker
    const getPasswordStrength = (password: string) => {
        if (!password) return { strength: 0, label: '', color: '', checks: {} };

        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };

        const strength = Object.values(checks).filter(Boolean).length;

        const levels = [
            { strength: 0, label: '', color: '' },
            { strength: 1, label: 'Very Weak', color: 'bg-red-500' },
            { strength: 2, label: 'Weak', color: 'bg-orange-500' },
            { strength: 3, label: 'Fair', color: 'bg-yellow-500' },
            { strength: 4, label: 'Good', color: 'bg-blue-500' },
            { strength: 5, label: 'Strong', color: 'bg-green-500' },
        ];

        return { ...levels[strength], checks };
    };

    const passwordStrength = getPasswordStrength(formData.newPassword);

    // Real-time Zod-like validation
    const validateField = (name: string, value: string) => {
        const newErrors: Record<string, string> = {};

        if (name === 'oldPassword') {
            if (!value) {
                newErrors.oldPassword = 'Current password is required';
            }
        }

        if (name === 'newPassword') {
            if (!value) {
                newErrors.newPassword = 'New password is required';
            } else if (value.length < 8) {
                newErrors.newPassword =
                    'Password must be at least 8 characters';
            } else if (!/[A-Z]/.test(value)) {
                newErrors.newPassword =
                    'Must contain at least one uppercase letter';
            } else if (!/[a-z]/.test(value)) {
                newErrors.newPassword =
                    'Must contain at least one lowercase letter';
            } else if (!/[0-9]/.test(value)) {
                newErrors.newPassword = 'Must contain at least one number';
            } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                newErrors.newPassword =
                    'Must contain at least one special character';
            } else if (value === formData.oldPassword) {
                newErrors.newPassword =
                    'New password must be different from current password';
            }
        }

        if (name === 'confirmPassword') {
            if (!value) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (value !== formData.newPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validate on change if field has been touched
        if (touched[name]) {
            const fieldErrors = validateField(name, value);
            setErrors((prev) => ({ ...prev, ...fieldErrors }));

            // Clear error if validation passes
            if (Object.keys(fieldErrors).length === 0) {
                setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[name];
                    return newErrors;
                });
            }
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));

        const fieldErrors = validateField(name, value);
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
    };

    // Revalidate confirmPassword when newPassword changes
    useEffect(() => {
        if (touched.confirmPassword && formData.confirmPassword) {
            const fieldErrors = validateField(
                'confirmPassword',
                formData.confirmPassword
            );
            setErrors((prev) => {
                const newErrors = { ...prev };
                if (Object.keys(fieldErrors).length > 0) {
                    return { ...newErrors, ...fieldErrors };
                } else {
                    delete newErrors.confirmPassword;
                    return newErrors;
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        formData.newPassword,
        formData.confirmPassword,
        touched.confirmPassword,
    ]);

    const togglePasswordVisibility = (field: 'old' | 'new' | 'confirm') => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const validateForm = () => {
        const allErrors: Record<string, string> = {};

        Object.keys(formData).forEach((key) => {
            const fieldErrors = validateField(
                key,
                formData[key as keyof typeof formData]
            );
            Object.assign(allErrors, fieldErrors);
        });

        setErrors(allErrors);
        setTouched({
            oldPassword: true,
            newPassword: true,
            confirmPassword: true,
        });

        return Object.keys(allErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsSubmitting(true);

        const user = await getUserInfo();

        try {
            // আপনার server action call করবেন
            const response = await fetch(
                'http://localhost:5000/api/v1/auth/change-password',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user: user,
                        oldPassword: formData.oldPassword,
                        newPassword: formData.newPassword,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to change password');
            }

            toast.success('Password changed successfully!');
            setFormData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setErrors({});
            setTouched({});
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4 sm:p-6 lg:p-8'>
            <div className='max-w-3xl mx-auto'>
                {/* Header */}
                <div className='mb-8 text-center animate-fade-in'>
                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-xl mb-4 animate-pulse'>
                        <Lock className='h-8 w-8' />
                    </div>
                    <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-3'>
                        <span className='text-gray-900 dark:text-white'>
                            Change{' '}
                        </span>
                        <span className='text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient'>
                            Password
                        </span>
                    </h1>
                    <p className='text-base text-gray-600 dark:text-gray-400'>
                        Keep your account secure with a{' '}
                        <span className='font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500'>
                            strong password
                        </span>
                    </p>
                </div>

                {/* Security Tips Alert */}
                <div className='mb-6 rounded-2xl border border-blue-500/20 bg-linear-to-r from-blue-500/5 to-purple-500/10 dark:from-blue-500/10 dark:to-purple-500/20 p-5 backdrop-blur-sm shadow-lg'>
                    <div className='flex items-start gap-4'>
                        <div className='shrink-0'>
                            <div className='w-10 h-10 rounded-xl bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center'>
                                <Shield className='h-5 w-5 text-blue-600 dark:text-blue-400' />
                            </div>
                        </div>
                        <div>
                            <h3 className='text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
                                Password Security Tips
                                <span className='px-2 py-0.5 rounded-full bg-blue-500 text-white text-xs'>
                                    Important
                                </span>
                            </h3>
                            <ul className='text-sm text-gray-700 dark:text-gray-300 space-y-1.5'>
                                <li className='flex items-center gap-2'>
                                    <div className='w-1.5 h-1.5 rounded-full bg-blue-500'></div>
                                    Use at least 8 characters with letters,
                                    numbers, and symbols
                                </li>
                                <li className='flex items-center gap-2'>
                                    <div className='w-1.5 h-1.5 rounded-full bg-purple-500'></div>
                                    Avoid using personal information or common
                                    words
                                </li>
                                <li className='flex items-center gap-2'>
                                    <div className='w-1.5 h-1.5 rounded-full bg-pink-500'></div>
                                    Don&apos;t reuse passwords from other
                                    accounts
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Password Change Form */}
                <div className='rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-2xl'>
                    <div className='space-y-6'>
                        {/* Current Password */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-900 dark:text-white mb-2'>
                                Current Password{' '}
                                <span className='text-red-500'>*</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
                                    <Lock className='h-5 w-5' />
                                </div>
                                <input
                                    type={
                                        showPasswords.old ? 'text' : 'password'
                                    }
                                    name='oldPassword'
                                    value={formData.oldPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Enter current password'
                                    className={`w-full rounded-xl border-2 ${
                                        errors.oldPassword &&
                                        touched.oldPassword
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                            : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'
                                    } bg-gray-50 dark:bg-gray-900 pl-12 pr-12 py-3.5 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 transition-all`}
                                />
                                <button
                                    type='button'
                                    onClick={() =>
                                        togglePasswordVisibility('old')
                                    }
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors'
                                >
                                    {showPasswords.old ? (
                                        <EyeOff className='h-5 w-5' />
                                    ) : (
                                        <Eye className='h-5 w-5' />
                                    )}
                                </button>
                            </div>
                            {errors.oldPassword && touched.oldPassword && (
                                <p className='text-red-500 text-xs mt-2 flex items-center gap-1.5 font-medium'>
                                    <AlertCircle className='h-3.5 w-3.5' />
                                    {errors.oldPassword}
                                </p>
                            )}
                        </div>

                        {/* New Password */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-900 dark:text-white mb-2'>
                                New Password{' '}
                                <span className='text-red-500'>*</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
                                    <Lock className='h-5 w-5' />
                                </div>
                                <input
                                    type={
                                        showPasswords.new ? 'text' : 'password'
                                    }
                                    name='newPassword'
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Enter new password'
                                    className={`w-full rounded-xl border-2 ${
                                        errors.newPassword &&
                                        touched.newPassword
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                            : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'
                                    } bg-gray-50 dark:bg-gray-900 pl-12 pr-12 py-3.5 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 transition-all`}
                                />
                                <button
                                    type='button'
                                    onClick={() =>
                                        togglePasswordVisibility('new')
                                    }
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors'
                                >
                                    {showPasswords.new ? (
                                        <EyeOff className='h-5 w-5' />
                                    ) : (
                                        <Eye className='h-5 w-5' />
                                    )}
                                </button>
                            </div>
                            {errors.newPassword && touched.newPassword && (
                                <p className='text-red-500 text-xs mt-2 flex items-center gap-1.5 font-medium'>
                                    <AlertCircle className='h-3.5 w-3.5' />
                                    {errors.newPassword}
                                </p>
                            )}

                            {/* Password Strength Indicator */}
                            {formData.newPassword && (
                                <div className='mt-4 space-y-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700'>
                                    <div className='flex items-center justify-between text-sm'>
                                        <span className='font-medium text-gray-700 dark:text-gray-300'>
                                            Password Strength:
                                        </span>
                                        <span
                                            className={`font-bold ${
                                                passwordStrength.strength >= 4
                                                    ? 'text-green-500'
                                                    : passwordStrength.strength >=
                                                      3
                                                    ? 'text-blue-500'
                                                    : passwordStrength.strength >=
                                                      2
                                                    ? 'text-yellow-500'
                                                    : 'text-red-500'
                                            }`}
                                        >
                                            {passwordStrength.label}
                                        </span>
                                    </div>
                                    <div className='flex gap-2'>
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                                                    level <=
                                                    passwordStrength.strength
                                                        ? passwordStrength.color
                                                        : 'bg-gray-200 dark:bg-gray-700'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <div className='grid grid-cols-2 gap-3 text-xs'>
                                        {Object.entries(
                                            passwordStrength.checks
                                        ).map(([key, met]) => (
                                            <div
                                                key={key}
                                                className={`flex items-center gap-2 ${
                                                    met
                                                        ? 'text-green-600 dark:text-green-400'
                                                        : 'text-gray-400'
                                                }`}
                                            >
                                                <div
                                                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                                        met
                                                            ? 'bg-green-100 dark:bg-green-900/30'
                                                            : 'bg-gray-100 dark:bg-gray-800'
                                                    }`}
                                                >
                                                    {met ? (
                                                        <Check className='h-3 w-3' />
                                                    ) : (
                                                        <X className='h-3 w-3' />
                                                    )}
                                                </div>
                                                <span className='capitalize font-medium'>
                                                    {key}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-900 dark:text-white mb-2'>
                                Confirm New Password{' '}
                                <span className='text-red-500'>*</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
                                    <Lock className='h-5 w-5' />
                                </div>
                                <input
                                    type={
                                        showPasswords.confirm
                                            ? 'text'
                                            : 'password'
                                    }
                                    name='confirmPassword'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Confirm new password'
                                    className={`w-full rounded-xl border-2 ${
                                        errors.confirmPassword &&
                                        touched.confirmPassword
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                            : formData.confirmPassword &&
                                              formData.newPassword ===
                                                  formData.confirmPassword
                                            ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
                                            : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'
                                    } bg-gray-50 dark:bg-gray-900 pl-12 pr-12 py-3.5 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-4 transition-all`}
                                />
                                <button
                                    type='button'
                                    onClick={() =>
                                        togglePasswordVisibility('confirm')
                                    }
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors'
                                >
                                    {showPasswords.confirm ? (
                                        <EyeOff className='h-5 w-5' />
                                    ) : (
                                        <Eye className='h-5 w-5' />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword &&
                            touched.confirmPassword ? (
                                <p className='text-red-500 text-xs mt-2 flex items-center gap-1.5 font-medium'>
                                    <AlertCircle className='h-3.5 w-3.5' />
                                    {errors.confirmPassword}
                                </p>
                            ) : formData.confirmPassword &&
                              formData.newPassword ===
                                  formData.confirmPassword ? (
                                <p className='text-green-500 text-xs mt-2 flex items-center gap-1.5 font-medium'>
                                    <Check className='h-3.5 w-3.5' />
                                    Passwords match perfectly!
                                </p>
                            ) : null}
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={
                                isSubmitting || Object.keys(errors).length > 0
                            }
                            className='group relative w-full inline-flex items-center justify-center gap-3 rounded-xl bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden'
                        >
                            <div className='absolute inset-0 bg-linear-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                            <Lock className='relative h-5 w-5 group-hover:rotate-12 transition-transform duration-300' />
                            <span className='relative'>
                                {isSubmitting
                                    ? 'Changing Password...'
                                    : 'Change Password'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Additional Info */}
                <div className='mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'>
                    <p className='text-sm text-amber-800 dark:text-amber-200 text-center font-medium'>
                        ⚠️ After changing your password, you&apos;ll need to
                        sign in again on all devices.
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes gradient {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }

                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </div>
    );
};

export default ChangePassword;
