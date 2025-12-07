'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { softDeleteUser } from '../../../../service/admin/usersManagement';
import { IUser } from '../../../../types/user.interface';
import DeleteConfirmationDialog from '../../../common/DeleteConfirmationDialog';
import ManagementTable from '../../../common/ManagementTable';
import UserFormDialog from './UserFormDialog';
import { usersColumns } from './usersColumns';
import UserViewDetailDialog from './UserViewDetailDialog';

interface UsersTableProps {
    users: IUser[];
}

const UsersTable = ({ users }: UsersTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingUser, setDeletingUser] = useState<IUser | null>(null);
    const [viewingUser, setViewingUser] = useState<IUser | null>(null);
    const [editingUser, setEditingUser] = useState<IUser | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (user: IUser) => {
        setViewingUser(user);
    };

    const handleEdit = (user: IUser) => {
        setEditingUser(user);
    };

    const handleDelete = (user: IUser) => {
        setDeletingUser(user);
    };

    const confirmDelete = async () => {
        if (!deletingUser) return;

        setIsDeleting(true);
        const result = await softDeleteUser(deletingUser!.id!);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || 'User deleted successfully');
            setDeletingUser(null);
            handleRefresh();
        } else {
            toast.error(result.message || 'Failed to delete user');
        }
    };

    return (
        <>
            <ManagementTable
                data={users}
                columns={usersColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(user) => user.id!}
                emptyMessage='No users found'
            />

            {/* Edit User Form Dialog */}
            <UserFormDialog
                open={!!editingUser}
                onClose={() => setEditingUser(null)}
                user={editingUser!}
                onSuccess={() => {
                    setEditingUser(null);
                    handleRefresh();
                }}
            />

            {/* View User Detail Dialog */}
            <UserViewDetailDialog
                open={!!viewingUser}
                onClose={() => setViewingUser(null)}
                user={viewingUser!}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingUser}
                onOpenChange={(open) => !open && setDeletingUser(null)}
                onConfirm={confirmDelete}
                title='Delete User'
                description={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default UsersTable;
