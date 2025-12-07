'use client';

import ClearFiltersButton from '../../../common/ClearFiltersButton';
import RefreshButton from '../../../common/RefreshButton';
import SearchFilter from '../../../common/SearchFilter';

const AdminsFilter = () => {
    return (
        <div className='rounded-lg border bg-card p-4 shadow-sm space-y-3'>
            {/* Row 1: Email Search */}
            <div className='flex items-center gap-3'>
                <SearchFilter
                    paramName='email'
                    placeholder='Search by email...'
                />
            </div>

            {/* Row 2: Contact Search + Action Buttons */}
            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
                <div className='flex-1'>
                    <SearchFilter
                        paramName='contactNumber'
                        placeholder='Search by contact...'
                    />
                </div>

                <div className='flex items-center gap-2'>
                    <ClearFiltersButton />
                    <RefreshButton showLabel={false} />
                </div>
            </div>
        </div>
    );
};

export default AdminsFilter;
