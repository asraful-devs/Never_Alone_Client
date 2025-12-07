import PublicFooter from '../../components/common/PublicFooter';
import PublicNavbar from '../../components/common/PublicNavbar';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=''>
            <PublicNavbar />
            <main className=''>{children}</main>
            <PublicFooter />
        </div>
    );
};

export default CommonLayout;
