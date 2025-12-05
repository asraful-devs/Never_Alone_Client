import LoginForm from '../../../../components/modules/Auth/loginForm';

const LoginPage = async ({
    searchParams,
}: {
    searchParams?: Promise<{ redirect?: string }>;
}) => {
    const { redirect } = searchParams ? await searchParams : {};

    return (
        <div className=''>
            <section className=''>
                <LoginForm redirect={redirect} />
            </section>
        </div>
    );
};

export default LoginPage;
