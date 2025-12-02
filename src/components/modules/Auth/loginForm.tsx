'use client';

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

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
            {/* Left Side - Animation */}
            <div className='hidden lg:flex items-center justify-center'>
                <div className='w-full max-w-sm'>
                    <div className='bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20 dark:border-slate-700/20'>
                        <div className='aspect-square'>
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
                <form action={formAction} className='space-y-6'>
                    {redirect && (
                        <input type='hidden' name='redirect' value={redirect} />
                    )}
                    <FieldGroup className='space-y-6'>
                        <div className='grid grid-cols-1 gap-6'>
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
                                    className='h-12 rounded-xl border-2 border-gray-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/10 transition-all duration-200 bg-gray-50 dark:bg-slate-900 px-4'
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
                                        className='h-12 rounded-xl border-2 border-gray-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/10 transition-all duration-200 bg-gray-50 dark:bg-slate-900 px-4 pr-12'
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
                        </div>

                        {/* Forgot Password Link */}
                        <div className='flex justify-end'>
                            <a
                                href='/forget-password'
                                className='text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors'
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type='submit'
                            disabled={isPending}
                            className='w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
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
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </Button>

                        {/* Sign Up Link */}
                        <div className='pt-4 text-center border-t border-gray-200 dark:border-slate-700'>
                            <p className='text-gray-600 dark:text-gray-400 text-sm'>
                                Don&apos;t have an account?{' '}
                                <a
                                    href='/register'
                                    className='font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors'
                                >
                                    Create one now
                                </a>
                            </p>
                        </div>
                    </FieldGroup>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
