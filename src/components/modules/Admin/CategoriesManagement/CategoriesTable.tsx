'use client';

import { ICategory } from '@/types/category.interface';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { deleteCategory } from '../../../../service/admin/CategoriesManagement';
import DeleteConfirmationDialog from '../../../common/DeleteConfirmationDialog';
import ManagementTable from '../../../common/ManagementTable';
import { categoriesColumns } from './CategoriesColumn';

interface CategoriesTableProps {
    categories: ICategory[];
}

const CategoriesTable = ({ categories }: CategoriesTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingCategory, setDeletingCategory] = useState<ICategory | null>(
        null
    );
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleDelete = (category: ICategory) => {
        setDeletingCategory(category);
    };

    const confirmDelete = async () => {
        if (!deletingCategory?.id) return;

        setIsDeleting(true);
        const result = await deleteCategory(deletingCategory.id);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || 'Category deleted successfully');
            setDeletingCategory(null);
            handleRefresh();
        } else {
            toast.error(result.message || 'Failed to delete category');
        }
    };

    return (
        <>
            <ManagementTable
                data={categories}
                columns={categoriesColumns}
                onDelete={handleDelete}
                getRowKey={(category) => category.id || category.name}
                emptyMessage='No categories found'
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingCategory}
                onOpenChange={(open) => !open && setDeletingCategory(null)}
                onConfirm={confirmDelete}
                title='Delete Category'
                description={`Are you sure you want to delete ${deletingCategory?.name}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default CategoriesTable;
