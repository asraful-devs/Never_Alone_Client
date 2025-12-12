'use client';

import Image from 'next/image';
import { ICarousel } from '../../../../types/carousel.interface';
import { Column } from '../../../common/ManagementTable';
import { DateCell } from '../../../common/cell/DateCell';

export const carouselsColumns: Column<ICarousel>[] = [
    {
        header: 'Title',
        accessor: (carousel) => (
            <span className='font-medium'>{carousel.title}</span>
        ),
        sortKey: 'title',
    },
    {
        header: 'Link',
        accessor: (carousel) =>
            carousel.linkUrl ? (
                <a
                    href={carousel.linkUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='text-sm text-primary hover:underline'
                >
                    {carousel.linkUrl}
                </a>
            ) : (
                <span className='text-sm text-muted-foreground'>—</span>
            ),
    },
    {
        header: 'Preview',
        accessor: (carousel) => (
            <div className='h-14 w-24 overflow-hidden rounded-md bg-muted flex items-center justify-center'>
                {carousel.imageUrl ? (
                    <Image
                        src={carousel.imageUrl}
                        alt={carousel.title}
                        className='h-full w-full object-cover'
                        width={96}
                        height={56}
                    />
                ) : (
                    <span className='text-xs text-muted-foreground'>
                        No image
                    </span>
                )}
            </div>
        ),
        className: 'w-[140px]',
    },
    {
        header: 'Created',
        accessor: (carousel) =>
            carousel.createdAt ? <DateCell date={carousel.createdAt} /> : '—',
        sortKey: 'createdAt',
        className: 'whitespace-nowrap',
    },
];
