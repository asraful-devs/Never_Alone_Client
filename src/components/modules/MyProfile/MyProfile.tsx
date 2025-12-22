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
            return profileData?.data ? (
                <AdminProfileDetails profile={profileData} />
            ) : (
                <div>Profile not found</div>
            );

        case HOST:
            profileData = await getHostByEmail(userInfo.email);
            return profileData?.data ? (
                <HostProfileDetails profile={profileData} />
            ) : (
                <div>Profile not found</div>
            );

        case USER:
            profileData = await getUserByEmail(userInfo.email);
            return profileData?.data ? (
                <UserProfileDetails profile={profileData} />
            ) : (
                <div>Profile not found</div>
            );

        default:
            return <div>Invalid user role</div>;
    }
};

export default MyProfile;
