'use client';

import { IAdmin } from '@/types/admin.interface';
import { Column } from '../../../common/ManagementTable';
import { DateCell } from '../../../common/cell/DateCell';
import { StatusBadgeCell } from '../../../common/cell/StatusBadgeCell';
import { UserInfoCell } from '../../../common/cell/UserInfoCell';

export const adminsColumns: Column<IAdmin>[] = [
    {
        header: 'Admin',
        accessor: (admin) => (
            <UserInfoCell
                name={admin.name}
                email={admin.email}
                photo={admin.profilePhoto}
            />
        ),
        sortKey: 'name',
    },
    {
        header: 'Contact',
        accessor: (admin) => (
            <div className='flex flex-col'>
                <span className='text-sm'>{admin.contactNumber}</span>
            </div>
        ),
    },
    {
        header: 'Status',
        accessor: (admin) => <StatusBadgeCell isDeleted={admin.isDeleted} />,
    },
    {
        header: 'Joined',
        accessor: (admin) => <DateCell date={admin.createdAt} />,
        sortKey: 'createdAt',
    },
];
