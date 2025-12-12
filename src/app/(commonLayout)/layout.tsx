import PublicFooter from '../../components/common/PublicFooter';
import PublicNavbar from '../../components/common/PublicNavbar';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=''>
            <PublicNavbar />
            <main className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
                {children}
            </main>
            <PublicFooter />
        </div>
    );
};

export default CommonLayout;
