'use client';

import { Button } from '@/components/ui/button';
import { PaginationMeta } from '@/types/event.interface';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface EventPaginationProps {
    meta: PaginationMeta;
}

const EventPagination = ({ meta }: EventPaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    };

    const canGoPrev = meta.page > 1;
    const canGoNext = meta.page < meta.totalPages;

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, meta.page - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(
            meta.totalPages,
            startPage + maxPagesToShow - 1
        );

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) {
                pages.push('...');
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < meta.totalPages) {
            if (endPage < meta.totalPages - 1) {
                pages.push('...');
            }
            pages.push(meta.totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className='flex items-center justify-center gap-2 mt-8 flex-wrap'>
            {/* Previous Button */}
            <Button
                variant='outline'
                size='sm'
                onClick={() => handlePageChange(meta.page - 1)}
                disabled={!canGoPrev}
                className='gap-1'
            >
                <ChevronLeft size={16} />
                <span className='hidden sm:inline'>Previous</span>
            </Button>

            {/* Page Numbers */}
            <div className='flex items-center gap-1 flex-wrap justify-center'>
                {pageNumbers.map((pageNum, idx) => (
                    <div key={idx}>
                        {pageNum === '...' ? (
                            <span className='px-2 py-1 text-muted-foreground'>
                                {pageNum}
                            </span>
                        ) : (
                            <Button
                                variant={
                                    pageNum === meta.page
                                        ? 'default'
                                        : 'outline'
                                }
                                size='sm'
                                onClick={() =>
                                    handlePageChange(pageNum as number)
                                }
                                className='min-w-10 h-10'
                            >
                                {pageNum}
                            </Button>
                        )}
                    </div>
                ))}
            </div>

            {/* Next Button */}
            <Button
                variant='outline'
                size='sm'
                onClick={() => handlePageChange(meta.page + 1)}
                disabled={!canGoNext}
                className='gap-1'
            >
                <span className='hidden sm:inline'>Next</span>
                <ChevronRight size={16} />
            </Button>

            {/* Info Text */}
            <div className='text-sm text-muted-foreground w-full text-center mt-4'>
                Page {meta.page} of {meta.totalPages} | Total Events:{' '}
                {meta.total}
            </div>
        </div>
    );
};

export default EventPagination;
