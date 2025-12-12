'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { deleteReview } from '@/service/review/reviewManagement';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Review {
    id: string;
    hostId?: string;
    hostName?: string;
    rating: number;
    comment?: string;
    createdAt?: string;
    host?: {
        name: string;
    };
}

interface MyReviewsListProps {
    reviews: Review[];
}

const MyReviewsList = ({ reviews }: MyReviewsListProps) => {
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [reviewsState, setReviewsState] = useState<Review[]>(reviews);

    const handleDeleteReview = async (id: string) => {
        try {
            setIsDeleting(id);
            const result = await deleteReview(id);

            if (result.success) {
                setReviewsState(reviewsState.filter((r) => r.id !== id));
                toast.success('Review deleted successfully');
            } else {
                toast.error(result.message || 'Failed to delete review');
            }
        } catch (error) {
            toast.error('Failed to delete review');
            console.error('Delete error:', error);
        } finally {
            setIsDeleting(null);
        }
    };

    const renderStars = (rating: number) => {
        return (
            <div className='flex gap-1'>
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        className={
                            i < rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-300'
                        }
                    />
                ))}
            </div>
        );
    };

    if (reviewsState.length === 0) {
        return (
            <div className='text-center py-12'>
                <p className='text-muted-foreground'>
                    No reviews yet. Start by booking an event and reviewing the
                    host!
                </p>
            </div>
        );
    }

    return (
        <div className='space-y-4'>
            {reviewsState.map((review) => (
                <Card key={review.id} className='p-6'>
                    <div className='flex items-start justify-between gap-4'>
                        <div className='flex-1'>
                            <div className='flex items-center gap-3 mb-2'>
                                <h3 className='text-lg font-semibold'>
                                    {review.host?.name ||
                                        review.hostName ||
                                        'Unknown Host'}
                                </h3>
                                {renderStars(review.rating)}
                            </div>

                            {review.comment && (
                                <p className='text-sm text-foreground mb-3'>
                                    {review.comment}
                                </p>
                            )}

                            <div className='flex items-center gap-2 flex-wrap'>
                                <Badge variant='outline'>
                                    {review.rating} out of 5 stars
                                </Badge>
                                {review.createdAt && (
                                    <span className='text-xs text-muted-foreground'>
                                        {new Date(
                                            review.createdAt
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* <DeleteConfirmationDialog
                            open={isDeleting === review.id}
                            onOpenChange={(open) => {
                                if (!open) setIsDeleting(null);
                            }}
                            title='Delete Review'
                            description='Are you sure you want to delete this review? This action cannot be undone.'
                            onConfirm={() => handleDeleteReview(review.id)}
                            isDeleting={isDeleting === review.id}
                            trigger={
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    className='text-red-600 hover:text-red-700 hover:bg-red-50'
                                    disabled={isDeleting === review.id}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            }
                        /> */}
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default MyReviewsList;
