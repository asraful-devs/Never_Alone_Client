'use client';

import { IHost } from '../../../../types/host.interface';
import { Column } from '../../../common/ManagementTable';
import { DateCell } from '../../../common/cell/DateCell';
import { StatusBadgeCell } from '../../../common/cell/StatusBadgeCell';
import { UserInfoCell } from '../../../common/cell/UserInfoCell';

export const hostsColumns: Column<IHost>[] = [
    {
        header: 'Host',
        accessor: (host) => (
            <UserInfoCell
                name={host.name}
                email={host.email}
                photo={host.profilePhoto}
            />
        ),
        sortKey: 'name',
    },
    {
        header: 'Rating',
        accessor: (host) => (
            <div className='flex flex-col'>
                <span className='text-sm'>
                    {host.rating ? `${host.rating} ` : 'N/A'}
                </span>
            </div>
        ),
    },
    {
        header: 'Contact',
        accessor: (host) => (
            <div className='flex flex-col'>
                <span className='text-sm'>{host.contactNumber || 'N/A'}</span>
            </div>
        ),
    },
    // {
    //     header: 'Address',
    //     accessor: (user) => (
    //         <div className='flex flex-col'>
    //             <span className='text-sm line-clamp-2'>
    //                 {user.address || 'N/A'}
    //             </span>
    //         </div>
    //     ),
    // },
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
