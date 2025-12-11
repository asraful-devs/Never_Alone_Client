'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import ManagementPageHeader from '../../../common/ManagementPageHeader';
import EventFormDialog from './EventFormDialog';

interface EventsManagementHeaderProps {
    categories: Array<{ id: string; name: string }>;
    hostData?: { id?: string | null } | null;
}

const EventsManagementHeader = ({
    categories,
    hostData,
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
            {isDialogOpen && (
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
                title='My Events'
                description='Create, manage, and track your events'
                action={{
                    label: 'Create Event',
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </>
    );
};

export default EventsManagementHeader;
