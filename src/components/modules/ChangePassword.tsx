'use client';

import { AlertCircle, Check, Eye, EyeOff, Lock, Shield, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { serverFetch } from '../../lib/serverFetchHelper';

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
    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Password strength checker
    const getPasswordStrength = (password: string) => {
        if (!password) return { strength: 0, label: '', color: '' };

        let strength = 0;
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };

        strength = Object.values(checks).filter(Boolean).length;

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const togglePasswordVisibility = (field: 'old' | 'new' | 'confirm') => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const validateForm = () => {
        const newErrors = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        };

        if (!formData.oldPassword) {
            newErrors.oldPassword = 'Current password is required';
        }

        if (!formData.newPassword) {
            newErrors.newPassword = 'New password is required';
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
        } else if (formData.newPassword === formData.oldPassword) {
            newErrors.newPassword =
                'New password must be different from current password';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your new password';
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error !== '');
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await serverFetch.post('/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to change password');
            }

            toast.success('Password changed successfully!');

            // Reset form
            setFormData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='min-h-screen bg-background p-4 sm:p-6 lg:p-8'>
            <div className='max-w-2xl mx-auto'>
                {/* Header */}
                <div className='mb-8'>
                    <div className='flex items-center gap-3 mb-4'>
                        <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg shadow-primary/25'>
                            <Lock className='h-6 w-6' />
                        </div>
                        <div>
                            <h1 className='text-2xl sm:text-3xl font-bold text-foreground'>
                                Change Password
                            </h1>
                            <p className='text-sm text-muted-foreground'>
                                Keep your account secure with a strong password
                            </p>
                        </div>
                    </div>
                </div>

                {/* Security Tips Alert */}
                <div className='mb-6 rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-blue-500/10 p-4'>
                    <div className='flex items-start gap-3'>
                        <Shield className='h-5 w-5 text-blue-500 shrink-0 mt-0.5' />
                        <div>
                            <h3 className='text-sm font-semibold text-foreground mb-1'>
                                Password Security Tips
                            </h3>
                            <ul className='text-xs text-muted-foreground space-y-1'>
                                <li>
                                    • Use at least 8 characters with a mix of
                                    letters, numbers, and symbols
                                </li>
                                <li>
                                    • Avoid using personal information or common
                                    words
                                </li>
                                <li>
                                    • Don't reuse passwords from other accounts
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Password Change Form */}
                <div className='rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/10 p-6 sm:p-8 shadow-xl'>
                    <div className='space-y-6'>
                        {/* Current Password */}
                        <div>
                            <label className='block text-sm font-medium text-foreground mb-2'>
                                Current Password{' '}
                                <span className='text-red-500'>*</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                                    <Lock className='h-5 w-5' />
                                </div>
                                <input
                                    type={
                                        showPasswords.old ? 'text' : 'password'
                                    }
                                    name='oldPassword'
                                    value={formData.oldPassword}
                                    onChange={handleChange}
                                    placeholder='Enter current password'
                                    className={`w-full rounded-xl border ${
                                        errors.oldPassword
                                            ? 'border-red-500 focus:ring-red-500/20'
                                            : 'border-border/50 focus:ring-primary/20'
                                    } bg-background pl-11 pr-11 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 transition-all`}
                                />
                                <button
                                    type='button'
                                    onClick={() =>
                                        togglePasswordVisibility('old')
                                    }
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    {showPasswords.old ? (
                                        <EyeOff className='h-5 w-5' />
                                    ) : (
                                        <Eye className='h-5 w-5' />
                                    )}
                                </button>
                            </div>
                            {errors.oldPassword && (
                                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                                    <AlertCircle className='h-3 w-3' />
                                    {errors.oldPassword}
                                </p>
                            )}
                        </div>

                        {/* New Password */}
                        <div>
                            <label className='block text-sm font-medium text-foreground mb-2'>
                                New Password{' '}
                                <span className='text-red-500'>*</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                                    <Lock className='h-5 w-5' />
                                </div>
                                <input
                                    type={
                                        showPasswords.new ? 'text' : 'password'
                                    }
                                    name='newPassword'
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    placeholder='Enter new password'
                                    className={`w-full rounded-xl border ${
                                        errors.newPassword
                                            ? 'border-red-500 focus:ring-red-500/20'
                                            : 'border-border/50 focus:ring-primary/20'
                                    } bg-background pl-11 pr-11 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 transition-all`}
                                />
                                <button
                                    type='button'
                                    onClick={() =>
                                        togglePasswordVisibility('new')
                                    }
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    {showPasswords.new ? (
                                        <EyeOff className='h-5 w-5' />
                                    ) : (
                                        <Eye className='h-5 w-5' />
                                    )}
                                </button>
                            </div>
                            {errors.newPassword && (
                                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                                    <AlertCircle className='h-3 w-3' />
                                    {errors.newPassword}
                                </p>
                            )}

                            {/* Password Strength Indicator */}
                            {formData.newPassword && (
                                <div className='mt-3 space-y-2'>
                                    <div className='flex items-center justify-between text-xs'>
                                        <span className='text-muted-foreground'>
                                            Password Strength:
                                        </span>
                                        <span
                                            className={`font-semibold ${
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
                                    <div className='flex gap-1.5'>
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1.5 flex-1 rounded-full transition-all ${
                                                    level <=
                                                    passwordStrength.strength
                                                        ? passwordStrength.color
                                                        : 'bg-muted'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <div className='grid grid-cols-2 gap-2 text-xs'>
                                        {Object.entries(
                                            passwordStrength.checks || {}
                                        ).map(([key, met]) => (
                                            <div
                                                key={key}
                                                className={`flex items-center gap-1.5 ${
                                                    met
                                                        ? 'text-green-500'
                                                        : 'text-muted-foreground'
                                                }`}
                                            >
                                                {met ? (
                                                    <Check className='h-3 w-3' />
                                                ) : (
                                                    <X className='h-3 w-3' />
                                                )}
                                                <span className='capitalize'>
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
                            <label className='block text-sm font-medium text-foreground mb-2'>
                                Confirm New Password{' '}
                                <span className='text-red-500'>*</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
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
                                    placeholder='Confirm new password'
                                    className={`w-full rounded-xl border ${
                                        errors.confirmPassword
                                            ? 'border-red-500 focus:ring-red-500/20'
                                            : formData.confirmPassword &&
                                              formData.newPassword ===
                                                  formData.confirmPassword
                                            ? 'border-green-500 focus:ring-green-500/20'
                                            : 'border-border/50 focus:ring-primary/20'
                                    } bg-background pl-11 pr-11 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 transition-all`}
                                />
                                <button
                                    type='button'
                                    onClick={() =>
                                        togglePasswordVisibility('confirm')
                                    }
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    {showPasswords.confirm ? (
                                        <EyeOff className='h-5 w-5' />
                                    ) : (
                                        <Eye className='h-5 w-5' />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword ? (
                                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                                    <AlertCircle className='h-3 w-3' />
                                    {errors.confirmPassword}
                                </p>
                            ) : formData.confirmPassword &&
                              formData.newPassword ===
                                  formData.confirmPassword ? (
                                <p className='text-green-500 text-xs mt-1 flex items-center gap-1'>
                                    <Check className='h-3 w-3' />
                                    Passwords match
                                </p>
                            ) : null}
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className='w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/90 px-6 py-3.5 text-base font-medium text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            <Lock className='h-5 w-5' />
                            {isSubmitting
                                ? 'Changing Password...'
                                : 'Change Password'}
                        </button>
                    </div>
                </div>

                {/* Additional Info */}
                <div className='mt-6 text-center'>
                    <p className='text-xs text-muted-foreground'>
                        After changing your password, you&apos;ll need to sign
                        in again on all devices.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
