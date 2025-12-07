'use client';

import { IUser } from '../../../../types/user.interface';
import { Column } from '../../../common/ManagementTable';
import { DateCell } from '../../../common/cell/DateCell';
import { StatusBadgeCell } from '../../../common/cell/StatusBadgeCell';
import { UserInfoCell } from '../../../common/cell/UserInfoCell';

export const usersColumns: Column<IUser>[] = [
    {
        header: 'User',
        accessor: (user) => (
            <UserInfoCell
                name={user.name}
                email={user.email}
                photo={user.profilePhoto}
            />
        ),
        sortKey: 'name',
    },
    {
        header: 'Contact',
        accessor: (user) => (
            <div className='flex flex-col'>
                <span className='text-sm'>{user.contactNumber}</span>
            </div>
        ),
    },
    {
        header: 'Status',
        accessor: (user) => <StatusBadgeCell isDeleted={user.isDeleted} />,
    },
    {
        header: 'Joined',
        accessor: (user) => <DateCell date={user.createdAt} />,
        sortKey: 'createdAt',
    },
];
