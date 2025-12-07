'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import { loginUser } from '../../../service/auth/loginUser';
import EyeButton from '../../common/EyeButton';
import InputFieldError from '../../common/InputFieldError';
import LottieAnimation from '../../common/LottieAnimation';
import { Button } from '../../ui/button';
import { Field, FieldGroup, FieldLabel } from '../../ui/field';
import { Input } from '../../ui/input';

const LoginForm = ({ redirect }: { redirect?: string }) => {
    const [state, formAction, isPending] = useActionState(loginUser, null);
    const [showPassword, setShowPassword] = useState(false);

    console.log('Login form state:', state);

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
                                        animationPath='/login Animation.json'
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
                                    Welcome Back
                                </h1>
                                <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                                    Sign in to your account to continue
                                </p>
                            </div>

                            {/* Form */}
                            <form
                                action={formAction}
                                className='space-y-3 sm:space-y-4'
                            >
                                {redirect && (
                                    <input
                                        type='hidden'
                                        name='redirect'
                                        value={redirect}
                                    />
                                )}

                                <FieldGroup className='space-y-2 sm:space-y-3'>
                                    {/* Email Field */}
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
                                            className='h-11 sm:h-12 w-full rounded-lg border border-gray-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white dark:bg-slate-800 px-3 text-sm'
                                        />
                                        <InputFieldError
                                            field='email'
                                            state={state}
                                        />
                                    </Field>

                                    {/* Password Field */}
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
                                                className='h-11 sm:h-12 w-full rounded-lg border border-gray-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white dark:bg-slate-800 px-3 pr-10 text-sm'
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

                                    {/* Forgot Password Link */}
                                    <div className='flex justify-end pt-0.5 sm:pt-1'>
                                        <Link
                                            href='/forget-password'
                                            className='text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium'
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>

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
                                                Signing in...
                                            </span>
                                        ) : (
                                            'Sign In'
                                        )}
                                    </Button>
                                </FieldGroup>
                            </form>

                            {/* Divider
                            <div className='relative py-4 mt-6'>
                                <div className='absolute inset-0 flex items-center'>
                                    <div className='w-full border-t border-gray-200 dark:border-slate-800'></div>
                                </div>
                                <div className='relative flex justify-center'>
                                    <span className='px-3 bg-white dark:bg-slate-900 text-xs text-gray-500 dark:text-gray-400 font-medium'>
                                        New user?
                                    </span>
                                </div>
                            </div> */}

                            {/* Sign Up Link */}
                            <div className='mt-4 sm:mt-6 text-center'>
                                <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                                    Don&apos;t have an account?{' '}
                                    <a
                                        href='/register'
                                        className='font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors'
                                    >
                                        Create account
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
