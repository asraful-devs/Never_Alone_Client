'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { softDeleteUser } from '../../../../service/admin/usersManagement';

interface UserActionsProps {
    userId: string;
    userName: string;
    onSuccess?: () => void;
}

export function UserDeleteAction({
    userId,
    userName,
    onSuccess,
}: UserActionsProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSoftDelete = () => {
        startTransition(async () => {
            try {
                const result = await softDeleteUser(userId);

                if (result.success) {
                    toast.success(
                        result.message || 'User deleted successfully'
                    );
                    setShowDeleteDialog(false);
                    onSuccess?.();
                } else {
                    toast.error(result.message || 'Failed to delete user');
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(error.message || 'Something went wrong');
            }
        });
    };

    return (
        <>
            <Button
                variant='destructive'
                size='sm'
                onClick={() => setShowDeleteDialog(true)}
            >
                <Trash2 className='h-4 w-4 mr-1' />
                Delete
            </Button>

            <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='flex items-center gap-2'>
                            <AlertTriangle className='h-5 w-5 text-destructive' />
                            Delete User
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>{userName}</strong>? This action can be
                            undone later (soft delete).
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleSoftDelete}
                            disabled={isPending}
                            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        >
                            {isPending ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

// Example usage in your user table/list
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UserTableRow({ user }: { user: any }) {
    const handleSuccess = () => {
        // This will be called after successful delete
        // You can refresh the list here if needed
        window.location.reload(); // or use router.refresh()
    };

    return (
        <div className='flex items-center justify-between p-4'>
            <div>
                <p>{user.name}</p>
                <p className='text-sm text-muted-foreground'>{user.email}</p>
            </div>

            <UserDeleteAction
                userId={user.id}
                userName={user.name}
                onSuccess={handleSuccess}
            />
        </div>
    );
}
