'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import ManagementPageHeader from '../../../common/ManagementPageHeader';
import CarouselFormDialog from './CarouselFormDialog';

const CarouselsManagementHeader = () => {
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
        setDialogKey((prev) => prev + 1); // Force remount to clear state
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            {isDialogOpen && (
                <CarouselFormDialog
                    key={dialogKey}
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    onSuccess={handleSuccess}
                />
            )}

            <ManagementPageHeader
                title='Carousels Management'
                description='Manage homepage banners'
                action={{
                    label: 'Add Carousel',
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </>
    );
};

export default CarouselsManagementHeader;
