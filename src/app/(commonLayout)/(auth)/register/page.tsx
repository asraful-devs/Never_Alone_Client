import RegisterForm from '../../../../components/modules/Auth/registerForm';

const RegisterPage = () => {
    return (
        <div className='min-h-screen w-full bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center overflow-hidden py-8 sm:py-12'>
            {/* Decorative Elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                <div className='absolute top-0 left-1/3 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
                <div className='absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
                <div className='absolute top-1/2 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
            </div>

            <div className='relative z-10 w-full px-4 sm:px-6 lg:px-8'>
                <div className='max-w-6xl mx-auto'>
                    <div>
                        {/* Form */}
                        <div className='w-full max-w-2xl mx-auto lg:mx-0'>
                            <div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/20 dark:border-slate-700/20'>
                                {/* Header */}
                                <div className='mb-8'>
                                    <div className='inline-block mb-4'>
                                        <div className='w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 flex items-center justify-center'>
                                            <svg
                                                className='w-6 h-6 text-white'
                                                fill='currentColor'
                                                viewBox='0 0 24 24'
                                            >
                                                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z' />
                                            </svg>
                                        </div>
                                    </div>
                                    <h1 className='text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-3'>
                                        Join Us Today
                                    </h1>
                                    <p className='text-gray-600 dark:text-gray-300 text-lg'>
                                        Create your account and start your
                                        amazing journey with us
                                    </p>
                                </div>

                                {/* Form */}
                                <RegisterForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
