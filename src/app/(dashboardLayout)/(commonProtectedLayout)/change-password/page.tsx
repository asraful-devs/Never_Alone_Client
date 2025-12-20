import ChangePassword from '../../../../components/modules/ChangePassword';

// Dynamic SSR - authenticated page
export const dynamic = 'force-dynamic';

const ChangePasswordPage = () => {
    return (
        <div className='space-y-6'>
            <ChangePassword />
        </div>
    );
};

export default ChangePasswordPage;
