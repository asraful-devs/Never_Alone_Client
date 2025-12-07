'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import ManagementPageHeader from '../../../common/ManagementPageHeader';
import UserFormDialog from './UserFormDialog';

const UsersManagementHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogKey, setDialogKey] = useState(0);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleOpenDialog = () => {
        setDialogKey((prev) => prev + 1); // Force remount
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            {isDialogOpen && (
                <UserFormDialog
                    key={dialogKey}
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    onSuccess={handleSuccess}
                />
            )}

            <ManagementPageHeader
                title='Users Management'
                description='Manage platform users, view their details, and perform administrative actions.'
                action={{
                    label: 'Add User',
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </>
    );
};

export default UsersManagementHeader;
