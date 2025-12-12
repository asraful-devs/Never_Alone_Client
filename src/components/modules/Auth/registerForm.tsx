'use client';

import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import { registerUser } from '../../../service/auth/registerUser';
import EyeButton from '../../common/EyeButton';
import InputFieldError from '../../common/InputFieldError';
import LottieAnimation from '../../common/LottieAnimation';
import { Button } from '../../ui/button';
import { Field, FieldGroup, FieldLabel } from '../../ui/field';
import { Input } from '../../ui/input';

const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerUser, null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Debug: Check state changes
    useEffect(() => {
        if (state) {
            // console.log('Register form state:', state);
        }
    }, [state]);

    return (
        <div className='min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 bg-gray-50 dark:bg-slate-950'>
            <div className='w-full max-w-7xl'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center'>
                    {/* Left Side - Animation */}
                    <div className='hidden lg:flex items-center justify-center'>
                        <div className='w-full max-w-md'>
                            <div className='bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-200 dark:border-slate-800'>
                                <div className='w-full h-auto aspect-square'>
                                    <LottieAnimation
                                        animationPath='/register Animation.json'
                                        loop
                                        autoplay
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className='w-full'>
                        <div className='bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-gray-200 dark:border-slate-800 p-6 sm:p-8 md:p-10'>
                            {/* Header */}
                            <div className='mb-6 sm:mb-8'>
                                <h1 className='text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2'>
                                    Create Account
                                </h1>
                                <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                                    Sign up to get started with us
                                </p>
                            </div>

                            {/* Form */}
                            <form
                                action={formAction}
                                className='space-y-3 sm:space-y-4'
                            >
                                <FieldGroup className='space-y-2 sm:space-y-3'>
                                    {/* Global Error Message */}
                                    {state?.message && !state?.success && (
                                        <div className='p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-200'>
                                            {state.message}
                                        </div>
                                    )}

                                    {/* Success Message */}
                                    {state?.success && (
                                        <div className='p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-700 dark:text-green-200'>
                                            {state.message ||
                                                'Registration successful! Redirecting...'}
                                        </div>
                                    )}

                                    {/* Full Name */}
                                    <Field>
                                        <FieldLabel
                                            htmlFor='name'
                                            className='text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2 block uppercase tracking-wide'
                                        >
                                            Full Name
                                        </FieldLabel>
                                        <Input
                                            id='name'
                                            name='name'
                                            type='text'
                                            placeholder='John Doe'
                                            disabled={isPending}
                                            required
                                            className='h-11 sm:h-12 w-full rounded-lg border border-gray-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white dark:bg-slate-800 px-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed'
                                        />
                                        <InputFieldError
                                            field='name'
                                            state={state}
                                        />
                                    </Field>

                                    {/* Email */}
                                    <Field>
                                        <FieldLabel
                                            htmlFor='email'
                                            className='text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2 block uppercase tracking-wide'
                                        >
                                            Email Address
                                        </FieldLabel>
                                        <Input
                                            id='email'
                                            name='email'
                                            type='email'
                                            placeholder='you@example.com'
                                            disabled={isPending}
                                            required
                                            className='h-11 sm:h-12 w-full rounded-lg border border-gray-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white dark:bg-slate-800 px-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed'
                                        />
                                        <InputFieldError
                                            field='email'
                                            state={state}
                                        />
                                    </Field>

                                    {/* Password */}
                                    <Field>
                                        <FieldLabel
                                            htmlFor='password'
                                            className='text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2 block uppercase tracking-wide'
                                        >
                                            Password
                                        </FieldLabel>
                                        <div className='relative'>
                                            <Input
                                                id='password'
                                                name='password'
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder='Enter your password'
                                                disabled={isPending}
                                                required
                                                className='h-11 sm:h-12 w-full rounded-lg border border-gray-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white dark:bg-slate-800 px-3 pr-10 text-sm disabled:opacity-50 disabled:cursor-not-allowed'
                                            />
                                            <EyeButton
                                                isVisible={showPassword}
                                                onToggle={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputFieldError
                                            field='password'
                                            state={state}
                                        />
                                    </Field>

                                    {/* Confirm Password */}
                                    <Field>
                                        <FieldLabel
                                            htmlFor='confirmPassword'
                                            className='text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2 block uppercase tracking-wide'
                                        >
                                            Confirm Password
                                        </FieldLabel>
                                        <div className='relative'>
                                            <Input
                                                id='confirmPassword'
                                                name='confirmPassword'
                                                type={
                                                    showConfirmPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder='Confirm your password'
                                                disabled={isPending}
                                                required
                                                className='h-11 sm:h-12 w-full rounded-lg border border-gray-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white dark:bg-slate-800 px-3 pr-10 text-sm disabled:opacity-50 disabled:cursor-not-allowed'
                                            />
                                            <EyeButton
                                                isVisible={showConfirmPassword}
                                                onToggle={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputFieldError
                                            field='confirmPassword'
                                            state={state}
                                        />
                                    </Field>

                                    {/* Submit Button */}
                                    <Button
                                        type='submit'
                                        disabled={isPending}
                                        className='w-full h-11 sm:h-12 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-1 sm:mt-2'
                                    >
                                        {isPending ? (
                                            <span className='flex items-center justify-center gap-2'>
                                                <svg
                                                    className='w-4 h-4 animate-spin'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    viewBox='0 0 24 24'
                                                >
                                                    <circle
                                                        cx='12'
                                                        cy='12'
                                                        r='10'
                                                        stroke='currentColor'
                                                        strokeWidth='2'
                                                        fill='none'
                                                        opacity='0.25'
                                                    ></circle>
                                                    <path
                                                        stroke='currentColor'
                                                        strokeWidth='2'
                                                        d='M4 12a8 8 0 018-8'
                                                        strokeLinecap='round'
                                                    ></path>
                                                </svg>
                                                Creating Account...
                                            </span>
                                        ) : (
                                            'Create Account'
                                        )}
                                    </Button>
                                </FieldGroup>
                            </form>

                            {/* Sign In Link */}
                            <div className='mt-4 sm:mt-6 text-center'>
                                <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                                    Already have an account?{' '}
                                    <Link
                                        href='/login'
                                        className='font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors'
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
