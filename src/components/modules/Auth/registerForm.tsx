'use client';

import { useActionState, useState } from 'react';

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

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
            {/* Left Side - Animation */}
            <div className='hidden lg:flex items-center justify-center order-2 lg:order-1'>
                <div className='w-full max-w-sm'>
                    <div className='bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20 dark:border-slate-700/20'>
                        <div className='aspect-square'>
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
            <div className='w-full order-1 lg:order-2'>
                <form action={formAction} className='space-y-6'>
                    <FieldGroup className='space-y-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {/* Name */}
                            <Field>
                                <FieldLabel
                                    htmlFor='name'
                                    className='text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2'
                                >
                                    Full Name
                                </FieldLabel>
                                <Input
                                    id='name'
                                    name='name'
                                    type='text'
                                    placeholder='John Doe'
                                    className='h-12 rounded-xl border-2 border-gray-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-500/10 transition-all duration-200 bg-gray-50 dark:bg-slate-900 px-4'
                                />
                                <InputFieldError field='name' state={state} />
                            </Field>

                            {/* Address */}
                            <Field>
                                <FieldLabel
                                    htmlFor='address'
                                    className='text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2'
                                >
                                    Address
                                </FieldLabel>
                                <Input
                                    id='address'
                                    name='address'
                                    type='text'
                                    placeholder='123 Main Street'
                                    className='h-12 rounded-xl border-2 border-gray-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-500/10 transition-all duration-200 bg-gray-50 dark:bg-slate-900 px-4'
                                />
                                <InputFieldError
                                    field='address'
                                    state={state}
                                />
                            </Field>

                            {/* Email */}
                            <Field>
                                <FieldLabel
                                    htmlFor='email'
                                    className='text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2'
                                >
                                    Email Address
                                </FieldLabel>
                                <Input
                                    id='email'
                                    name='email'
                                    type='email'
                                    placeholder='your@email.com'
                                    className='h-12 rounded-xl border-2 border-gray-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-500/10 transition-all duration-200 bg-gray-50 dark:bg-slate-900 px-4'
                                />
                                <InputFieldError field='email' state={state} />
                            </Field>

                            {/* Password */}
                            <Field>
                                <FieldLabel
                                    htmlFor='password'
                                    className='text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2'
                                >
                                    Password
                                </FieldLabel>
                                <div className='relative'>
                                    <Input
                                        id='password'
                                        name='password'
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder='••••••••'
                                        className='h-12 rounded-xl border-2 border-gray-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-500/10 transition-all duration-200 bg-gray-50 dark:bg-slate-900 px-4 pr-12'
                                    />
                                    <EyeButton
                                        isVisible={showPassword}
                                        onToggle={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    />
                                </div>
                                <InputFieldError
                                    field='password'
                                    state={state}
                                />
                            </Field>

                            {/* Confirm Password */}
                            <Field className='md:col-span-2'>
                                <FieldLabel
                                    htmlFor='confirmPassword'
                                    className='text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2'
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
                                        placeholder='••••••••'
                                        className='h-12 rounded-xl border-2 border-gray-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-500/10 transition-all duration-200 bg-gray-50 dark:bg-slate-900 px-4 pr-12'
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
                        </div>

                        {/* Submit Button */}
                        <Button
                            type='submit'
                            disabled={isPending}
                            className='w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 hover:from-emerald-700 hover:via-cyan-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed md:col-span-2'
                        >
                            {isPending ? (
                                <span className='flex items-center justify-center gap-2'>
                                    <svg
                                        className='w-5 h-5 animate-spin'
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
                                            opacity='0.3'
                                        ></circle>
                                        <path
                                            stroke='currentColor'
                                            strokeWidth='2'
                                            d='M4 12a8 8 0 018-8v0m0 16a8 8 0 01-8-8'
                                            opacity='0.5'
                                        ></path>
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </Button>

                        {/* Sign In Link */}
                        <div className='pt-4 text-center border-t border-gray-200 dark:border-slate-700 md:col-span-2'>
                            <p className='text-gray-600 dark:text-gray-400 text-sm'>
                                Already have an account?{' '}
                                <a
                                    href='/login'
                                    className='font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors'
                                >
                                    Sign in here
                                </a>
                            </p>
                        </div>
                    </FieldGroup>
                </form>
            </div>
        </div>
    );
};
