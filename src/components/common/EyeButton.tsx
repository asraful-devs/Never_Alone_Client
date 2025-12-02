'use client';

import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';

interface EyeButtonProps {
    isVisible: boolean;
    onToggle: () => void;
}

const EyeButton = ({ isVisible, onToggle }: EyeButtonProps) => {
    return (
        <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={onToggle}
            className='absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-slate-700 hover:rounded-lg text-gray-600 dark:text-gray-400 transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400'
            aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
            {isVisible ? (
                <Eye className='h-5 w-5 transition-transform duration-200' />
            ) : (
                <EyeOff className='h-5 w-5 transition-transform duration-200' />
            )}
        </Button>
    );
};

export default EyeButton;
