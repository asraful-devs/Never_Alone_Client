'use client';
import { useDebounce } from '@/hooks/useDebounce';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { Input } from '../ui/input';

interface SearchFilterProps {
    placeholder?: string;
    paramName?: string;
}

const SearchFilter = ({
    placeholder = 'Search...',
    paramName = 'searchTerm',
}: SearchFilterProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const urlValue = searchParams.get(paramName) || '';
    const [value, setValue] = useState('');
    const isInitialized = useRef(false);
    const debouncedValue = useDebounce(value, 500);

    // Initialize value from URL on mount
    useEffect(() => {
        if (!isInitialized.current) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setValue(urlValue);
            isInitialized.current = true;
        }
    }, [urlValue]);

    // Update URL when debounced value changes
    useEffect(() => {
        // Only update if debounced value is different from URL param
        if (debouncedValue === urlValue) {
            return;
        }

        const params = new URLSearchParams(searchParams.toString());

        if (debouncedValue) {
            params.set(paramName, debouncedValue);
            params.set('page', '1');
        } else {
            params.delete(paramName);
            params.set('page', '1');
        }

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    }, [debouncedValue, urlValue, paramName, router, searchParams]);

    return (
        <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
                placeholder={placeholder}
                className='pl-10'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={isPending}
            />
        </div>
    );
};

export default SearchFilter;
