import { getAdminByEmail } from '../../../service/admin/adminsManagement';
import { getHostByEmail } from '../../../service/admin/hostsManagement';
import { getUserByEmail } from '../../../service/admin/usersManagement';
import { UserInfo } from '../../../types/user.interface';
import AdminProfileDetails from './AdminProfile';
import HostProfileDetails from './HostProfile';
import UserProfileDetails from './UserProfile';

const ADMIN = 'ADMIN';
const HOST = 'HOST';
const USER = 'USER';

const MyProfile = async ({ userInfo }: { userInfo: UserInfo }) => {
    const userRole = userInfo?.role;

    let profileData;

    switch (userRole) {
        case ADMIN:
            profileData = await getAdminByEmail(userInfo.email);
            return <AdminProfileDetails profile={profileData} />;

        case HOST:
            profileData = await getHostByEmail(userInfo.email);
            return <HostProfileDetails profile={profileData} />;

        case USER:
            profileData = await getUserByEmail(userInfo.email);
            return <UserProfileDetails profile={profileData} />;

        default:
            return <div>Invalid user role</div>;
    }
};

export default MyProfile;
