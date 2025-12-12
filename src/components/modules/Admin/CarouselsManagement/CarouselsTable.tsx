'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { deleteCarousel } from '../../../../service/admin/carouselManagement';
import { ICarousel } from '../../../../types/carousel.interface';
import DeleteConfirmationDialog from '../../../common/DeleteConfirmationDialog';
import ManagementTable from '../../../common/ManagementTable';
import { carouselsColumns } from './CarouselsColumn';

interface CarouselsTableProps {
    carousels: ICarousel[];
}

const CarouselsTable = ({ carousels }: CarouselsTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingCarousel, setDeletingCarousel] = useState<ICarousel | null>(
        null
    );
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleDelete = (carousel: ICarousel) => {
        setDeletingCarousel(carousel);
    };

    const confirmDelete = async () => {
        if (!deletingCarousel?.id) return;

        setIsDeleting(true);
        const result = await deleteCarousel(deletingCarousel.id);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || 'Carousel deleted successfully');
            setDeletingCarousel(null);
            handleRefresh();
        } else {
            toast.error(result.message || 'Failed to delete carousel');
        }
    };

    return (
        <>
            <ManagementTable
                data={carousels}
                columns={carouselsColumns}
                onDelete={handleDelete}
                getRowKey={(carousel) => carousel.id || carousel.title}
                emptyMessage='No carousels found'
            />

            <DeleteConfirmationDialog
                open={!!deletingCarousel}
                onOpenChange={(open) => !open && setDeletingCarousel(null)}
                onConfirm={confirmDelete}
                title='Delete Carousel'
                description={`Are you sure you want to delete ${deletingCarousel?.title}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default CarouselsTable;
