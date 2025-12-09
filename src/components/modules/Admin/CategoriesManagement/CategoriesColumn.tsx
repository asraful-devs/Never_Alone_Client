'use client';

import { ICategory } from '@/types/category.interface';
import { Column } from '../../../common/ManagementTable';
import { DateCell } from '../../../common/cell/DateCell';

export const categoriesColumns: Column<ICategory>[] = [
    {
        header: 'Category',
        accessor: (category) => (
            <span className='font-medium'>{category.name}</span>
        ),
        sortKey: 'name',
    },
    {
        header: 'Slug',
        accessor: (category) => (
            <span className='text-sm text-muted-foreground'>
                {category.slug || '—'}
            </span>
        ),
    },
    {
        header: 'Icon',
        accessor: (category) => (
            <span className='text-2xl'>{category.icon || '—'}</span>
        ),
    },
    {
        header: 'Created',
        accessor: (category) =>
            category.createdAt ? <DateCell date={category.createdAt} /> : '—',
        sortKey: 'createdAt',
    },
];
