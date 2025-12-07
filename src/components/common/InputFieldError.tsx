/* eslint-disable @typescript-eslint/no-explicit-any */

interface InputFieldErrorProps {
    field: string;
    state: any;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
    // Handle null/undefined state
    if (!state) return null;

    // Case 1: errors as object { email: "Error message", password: "Error message" }
    if (
        state.errors &&
        typeof state.errors === 'object' &&
        !Array.isArray(state.errors)
    ) {
        const errorMessage = state.errors[field];
        if (errorMessage) {
            return (
                <p className='text-xs text-red-600 dark:text-red-400 mt-1'>
                    {errorMessage}
                </p>
            );
        }
    }

    // Case 2: errors as array [{ field: "email", message: "Error" }, ...]
    if (Array.isArray(state.errors)) {
        const errorObj = state.errors.find((err: any) => err.field === field);
        if (errorObj && errorObj.message) {
            return (
                <p className='text-xs text-red-600 dark:text-red-400 mt-1'>
                    {errorObj.message}
                </p>
            );
        }
    }

    return null;
};

export default InputFieldError;
