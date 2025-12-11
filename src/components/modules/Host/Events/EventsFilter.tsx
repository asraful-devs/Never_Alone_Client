'use client';

import ClearFiltersButton from '../../../common/ClearFiltersButton';
import RefreshButton from '../../../common/RefreshButton';
import SearchFilter from '../../../common/SearchFilter';
import SelectFilter from '../../../common/SelectFilter';

interface EventsFilterProps {
    categories?: Array<{ id: string; name: string }>;
}

const EventsFilter = ({ categories = [] }: EventsFilterProps) => {
    return (
        <div className='rounded-lg border bg-card p-4 shadow-sm space-y-3'>
            {/* Row 1: Title Search + Category Filter */}
            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
                <div className='flex-1'>
                    <SearchFilter
                        paramName='searchTerm'
                        placeholder='Search by title or location...'
                    />
                </div>

                {categories.length > 0 && (
                    <div className='w-full sm:w-48'>
                        <SelectFilter
                            paramName='category'
                            placeholder='Filter by category'
                            options={categories.map((cat) => ({
                                value: cat.id,
                                label: cat.name,
                            }))}
                        />
                    </div>
                )}
            </div>

            {/* Row 2: Action Buttons */}
            <div className='flex items-center gap-2 justify-end'>
                <ClearFiltersButton />
                <RefreshButton showLabel={false} />
            </div>
        </div>
    );
};

export default EventsFilter;
