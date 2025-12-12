/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { createCarousel } from '../../../../service/admin/carouselManagement';
import InputFieldError from '../../../common/InputFieldError';

interface CarouselFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CarouselFormDialog = ({
    open,
    onClose,
    onSuccess,
}: CarouselFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prevStateRef = useRef<any>(null);

    const [state, formAction, isPending] = useActionState(createCarousel, null);

    useEffect(() => {
        if (!state || state === prevStateRef.current) {
            return;
        }

        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message || 'Carousel created successfully');
            formRef.current?.reset();
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            onSuccess();
            onClose();
        } else if (state?.message && state.success === false) {
            toast.error(state.message);
        }
    }, [state]);

    useEffect(() => {
        if (!open) {
            prevStateRef.current = null;
        }
    }, [open]);

    const handleClose = () => {
        formRef.current?.reset();
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        prevStateRef.current = null;
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className='max-h-[90vh] flex flex-col p-0'>
                <DialogHeader className='px-6 pt-6 pb-4'>
                    <DialogTitle>Add New Carousel</DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className='flex flex-col flex-1 min-h-0'
                >
                    <div className='flex-1 overflow-y-auto px-6 space-y-4 pb-4'>
                        <Field>
                            <FieldLabel htmlFor='title'>
                                Title <span className='text-red-500'>*</span>
                            </FieldLabel>
                            <Input
                                id='title'
                                name='title'
                                placeholder='Enter carousel title'
                                defaultValue={state?.formData?.title || ''}
                                required
                            />
                            <InputFieldError field='title' state={state} />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor='linkUrl'>Link URL</FieldLabel>
                            <Input
                                id='linkUrl'
                                name='linkUrl'
                                placeholder='https://example.com'
                                defaultValue={state?.formData?.linkUrl || ''}
                                type='url'
                            />
                            <p className='text-xs text-gray-500'>
                                Optional link for the banner CTA.
                            </p>
                            <InputFieldError field='linkUrl' state={state} />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor='file'>
                                Upload Image{' '}
                                <span className='text-red-500'>*</span>
                            </FieldLabel>
                            <Input
                                ref={fileInputRef}
                                id='file'
                                name='file'
                                type='file'
                                accept='image/*'
                                required
                            />
                            <p className='text-xs text-gray-500'>
                                Recommended: landscape image for best fit.
                            </p>
                        </Field>
                    </div>

                    <div className='flex justify-end gap-2 px-6 py-4 border-t'>
                        <Button
                            type='button'
                            variant='outline'
                            onClick={handleClose}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button type='submit' disabled={isPending}>
                            {isPending ? 'Saving...' : 'Create Carousel'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CarouselFormDialog;
