import {
    getInputFieldError,
    IInputErrorState,
} from '../../lib/getInputFieldError';
import { FieldDescription } from '../ui/field';

interface InputFieldErrorProps {
    field: string;
    state: IInputErrorState;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
    if (getInputFieldError(field, state)) {
        return (
            <FieldDescription className='text-red-500 dark:text-red-400 font-medium text-xs mt-2 flex items-center gap-1'>
                <svg
                    className='w-4 h-4 flex-shrink-0'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                >
                    <path
                        fillRule='evenodd'
                        d='M18.101 12.93a1 1 0 00-1.414-1.414L10 15.586 3.314 8.9a1 1 0 00-1.414 1.414l7.07 7.07a1 1 0 001.414 0l8.101-8.101z'
                        clipRule='evenodd'
                    />
                </svg>
                {getInputFieldError(field, state)}
            </FieldDescription>
        );
    }

    return null;
};

export default InputFieldError;
