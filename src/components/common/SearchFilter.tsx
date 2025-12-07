'use client';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { Button } from '../ui/button';
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
    const [value, setValue] = useState(urlValue);
    const prevUrlValueRef = useRef(urlValue);

    // Sync input with URL only when URL changes externally (e.g., Clear Filters)
    useEffect(() => {
        // Only update if URL changed AND it's different from current input
        if (urlValue !== prevUrlValueRef.current) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setValue(urlValue);
            prevUrlValueRef.current = urlValue;
        }
    }, [urlValue]);

    // Manual search function
    const handleSearch = () => {
        const trimmedValue = value.trim();

        // Skip if no change
        if (trimmedValue === urlValue) {
            return;
        }

        const params = new URLSearchParams(searchParams.toString());

        if (trimmedValue) {
            params.set(paramName, trimmedValue);
            params.set('page', '1');
        } else {
            params.delete(paramName);
            params.set('page', '1');
        }

        startTransition(() => {
            router.push(`?${params.toString()}`);
            prevUrlValueRef.current = trimmedValue;
        });
    };

    // Handle Enter key press
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='relative flex items-center gap-2 w-full'>
            <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                    placeholder={placeholder}
                    className='pl-10'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isPending}
                />
            </div>
            <Button
                onClick={handleSearch}
                disabled={isPending || value.trim() === urlValue}
                size='default'
                className='whitespace-nowrap'
            >
                <Search className='h-4 w-4 mr-2' />
                Search
            </Button>
        </div>
    );
};

export default SearchFilter;
