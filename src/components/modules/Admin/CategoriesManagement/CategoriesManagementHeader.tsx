'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import ManagementPageHeader from '../../../common/ManagementPageHeader';
import CategoryFormDialog from './CategoryFormDialog';

const AdminsManagementHeader = () => {
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
                <CategoryFormDialog
                    key={dialogKey}
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    onSuccess={handleSuccess}
                />
            )}

            <ManagementPageHeader
                title='Categories Management'
                description='Manage platform categories'
                action={{
                    label: 'Add Category',
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </>
    );
};

export default AdminsManagementHeader;
