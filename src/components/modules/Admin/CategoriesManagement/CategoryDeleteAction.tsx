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
import { deleteCategory } from '@/service/admin/CategoriesManagement';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

interface AdminActionsProps {
    categoryId: string;
    categoryName: string;
    onSuccess?: () => void;
}

export function CategoryDeleteAction({
    categoryId,
    categoryName,
    onSuccess,
}: AdminActionsProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSoftDelete = () => {
        startTransition(async () => {
            try {
                const result = await deleteCategory(categoryId);

                if (result.success) {
                    toast.success(
                        result.message || 'Category deleted successfully'
                    );
                    setShowDeleteDialog(false);
                    onSuccess?.();
                } else {
                    toast.error(result.message || 'Failed to delete category');
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
                            Delete Category
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>{categoryName}</strong>? This action cannot
                            be undone.
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

// Example usage in your category list
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CategoryRow({ category }: { category: any }) {
    const handleSuccess = () => {
        // This will be called after successful delete
        window.location.reload(); // or use router.refresh()
    };

    return (
        <div className='flex items-center justify-between p-4'>
            <div>
                <p>{category.name}</p>
                <p className='text-sm text-muted-foreground'>
                    {category.description}
                </p>
            </div>

            <CategoryDeleteAction
                categoryId={category.id}
                categoryName={category.name}
                onSuccess={handleSuccess}
            />
        </div>
    );
}
