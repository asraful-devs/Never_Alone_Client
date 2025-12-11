'use client';

import { deleteEvent } from '@/service/events/eventsManagement';
import { Event } from '@/types/event.interface';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import DeleteConfirmationDialog from '../../../common/DeleteConfirmationDialog';
import ManagementTable from '../../../common/ManagementTable';
import EventFormDialog from './EventFormDialog';
import { eventsColumns } from './eventsColumn';
import EventViewDetailDialog from './EventViewDetailDialog';

interface EventsTableProps {
    events: Event[];
    categories: Array<{ id: string; name: string }>;
    hostData?: { id?: string | null } | null;
}

const EventsTable = ({ events, categories, hostData }: EventsTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
    const [viewingEvent, setViewingEvent] = useState<Event | null>(null);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (event: Event) => {
        setViewingEvent(event);
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
    };

    const handleDelete = (event: Event) => {
        setDeletingEvent(event);
    };

    const confirmDelete = async () => {
        if (!deletingEvent) return;

        setIsDeleting(true);
        const result = await deleteEvent(deletingEvent.id);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || 'Event deleted successfully');
            setDeletingEvent(null);
            handleRefresh();
        } else {
            toast.error(result.message || 'Failed to delete event');
        }
    };

    return (
        <>
            <ManagementTable
                data={events}
                columns={eventsColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(event) => event.id}
                emptyMessage='No events found'
            />

            {/* Edit Event Form Dialog */}
            <EventFormDialog
                open={!!editingEvent}
                onClose={() => setEditingEvent(null)}
                event={editingEvent!}
                onSuccess={() => {
                    setEditingEvent(null);
                    handleRefresh();
                }}
                categories={categories}
                hostData={hostData}
            />

            {/* View Event Detail Dialog */}
            <EventViewDetailDialog
                open={!!viewingEvent}
                onClose={() => setViewingEvent(null)}
                event={viewingEvent}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingEvent}
                onOpenChange={(open) => !open && setDeletingEvent(null)}
                onConfirm={confirmDelete}
                title='Delete Event'
                description={`Are you sure you want to delete "${deletingEvent?.title}"? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default EventsTable;
