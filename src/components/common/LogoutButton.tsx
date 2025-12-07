'use client';

import { logoutUser } from '../../service/auth/logoutUser';

const LogoutButton = () => {
    const handleLogout = async () => {
        await logoutUser();
    };
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default LogoutButton;
