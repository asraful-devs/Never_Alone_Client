const FormField = ({
    label,
    value,
    onChange,
    type = 'text',
}: {
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    type?: string;
}) => {
    return (
        <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:border-blue-400 outline-none transition-all'
            />
        </div>
    );
};

export default FormField;
