'use client';

import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle2, Home } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get('session_id');

    return (
        <div className='min-h-screen bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 flex items-center justify-center p-4'>
            <div className='max-w-md w-full'>
                <div className='bg-card border border-border rounded-2xl shadow-xl p-8 text-center'>
                    {/* Success Icon */}
                    <div className='mb-6 flex justify-center'>
                        <div className='bg-green-100 dark:bg-green-900/30 rounded-full p-4'>
                            <CheckCircle2 className='w-16 h-16 text-green-600 dark:text-green-400' />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className='text-3xl font-bold mb-3 text-foreground'>
                        Payment Successful!
                    </h1>

                    <p className='text-muted-foreground mb-6 leading-relaxed'>
                        Your booking has been confirmed successfully. A
                        confirmation email has been sent to your inbox.
                    </p>

                    {/* Transaction ID */}
                    {sessionId && (
                        <div className='bg-muted/50 rounded-lg p-4 mb-6 border border-border'>
                            <p className='text-xs text-muted-foreground mb-1'>
                                Transaction ID
                            </p>
                            <p className='font-mono text-sm text-foreground break-all'>
                                {sessionId.slice(0, 40)}...
                            </p>
                        </div>
                    )}

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
                        Need help? Contact support at support@neveralone.com
                    </p>
                </div>
            </div>
        </div>
    );
}
