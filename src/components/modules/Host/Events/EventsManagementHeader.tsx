'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import ManagementPageHeader from '../../../common/ManagementPageHeader';
import EventFormDialog from './EventFormDialog';

interface EventsManagementHeaderProps {
    categories: Array<{ id: string; name: string }>;
    hostData?: { id?: string | null } | null;
    title?: string;
    description?: string;
    enableCreate?: boolean;
}

const EventsManagementHeader = ({
    categories,
    hostData,
    title = 'My Events',
    description = 'Create, manage, and track your events',
    enableCreate = true,
}: EventsManagementHeaderProps) => {
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
        setDialogKey((prev) => prev + 1);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            {enableCreate && isDialogOpen && (
                <EventFormDialog
                    key={dialogKey}
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    onSuccess={handleSuccess}
                    categories={categories}
                    hostData={hostData}
                />
            )}

            <ManagementPageHeader
                title={title}
                description={description}
                action={
                    enableCreate
                        ? {
                              label: 'Create Event',
                              icon: Plus,
                              onClick: handleOpenDialog,
                          }
                        : undefined
                }
            />
        </>
    );
};

export default EventsManagementHeader;
