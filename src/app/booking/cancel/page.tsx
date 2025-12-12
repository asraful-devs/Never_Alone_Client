'use client';

import { Button } from '@/components/ui/button';
import { Calendar, Home, Mail, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentCancelPage() {
    const router = useRouter();

    return (
        <div className='min-h-screen bg-linear-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 flex items-center justify-center p-4'>
            <div className='max-w-md w-full'>
                <div className='bg-card border border-border rounded-2xl shadow-xl p-8 text-center'>
                    {/* Cancel Icon */}
                    <div className='mb-6 flex justify-center'>
                        <div className='bg-orange-100 dark:bg-orange-900/30 rounded-full p-4'>
                            <XCircle className='w-16 h-16 text-orange-600 dark:text-orange-400' />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className='text-3xl font-bold mb-3 text-foreground'>
                        Payment Cancelled
                    </h1>

                    <p className='text-muted-foreground mb-6 leading-relaxed'>
                        Your payment was cancelled. Don&apos;t worry, your
                        booking is still saved Only for 30 minutes. You can
                        complete the payment anytime from your email or bookings
                        page.
                    </p>

                    {/* Info Box */}
                    <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 text-left'>
                        <div className='flex items-start gap-3'>
                            <Mail className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0' />
                            <div className='text-sm text-blue-800 dark:text-blue-200'>
                                <p className='font-semibold mb-1'>
                                    Payment Link Sent
                                </p>
                                <p className='text-blue-700 dark:text-blue-300'>
                                    Check your email for the payment link. You
                                    can complete payment whenever you&apos;re
                                    ready.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='space-y-3'>
                        <Button
                            onClick={() =>
                                router.push('/user/dashboard/my-bookings')
                            }
                            className='w-full flex items-center justify-center gap-2 h-12'
                            size='lg'
                        >
                            <Calendar className='w-5 h-5' />
                            View My Bookings
                        </Button>

                        <Button
                            onClick={() => router.push('/')}
                            variant='outline'
                            className='w-full flex items-center justify-center gap-2 h-12'
                            size='lg'
                        >
                            <Home className='w-5 h-5' />
                            Back to Home
                        </Button>
                    </div>

                    {/* Footer Note */}
                    <p className='text-xs text-muted-foreground mt-6'>
                        Questions? Email us at support@neveralone.com
                    </p>
                </div>
            </div>
        </div>
    );
}
