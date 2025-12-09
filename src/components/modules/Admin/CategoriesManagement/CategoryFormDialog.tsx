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
import { Textarea } from '@/components/ui/textarea';
import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { createCategory } from '../../../../service/admin/CategoriesManagement';
import InputFieldError from '../../../common/InputFieldError';

interface ICategoryFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CategoryFormDialog = ({
    open,
    onClose,
    onSuccess,
}: ICategoryFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    // Track previous state to prevent infinite loop
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prevStateRef = useRef<any>(null);

    const [state, formAction, isPending] = useActionState(createCategory, null);

    // Handle success/error from server
    useEffect(() => {
        // Skip if state is null or same as previous
        if (!state || state === prevStateRef.current) {
            return;
        }

        // Update previous state reference
        prevStateRef.current = state;

        // Handle success case
        if (state?.success) {
            toast.success(state.message || 'Category created successfully');

            // Reset form
            formRef.current?.reset();

            // Call callbacks
            onSuccess();
            onClose();
        }
        // Handle error case
        else if (state?.message && state.success === false) {
            toast.error(state.message);
        }
    }, [state]); // Only depend on state, but use ref to prevent loops

    // Reset previous state when dialog closes
    useEffect(() => {
        if (!open) {
            prevStateRef.current = null;
        }
    }, [open]);

    const handleClose = () => {
        formRef.current?.reset();
        prevStateRef.current = null; // Reset ref on manual close
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className='max-h-[90vh] flex flex-col p-0'>
                <DialogHeader className='px-6 pt-6 pb-4'>
                    <DialogTitle>Add New Category</DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className='flex flex-col flex-1 min-h-0'
                >
                    <div className='flex-1 overflow-y-auto px-6 space-y-4 pb-4'>
                        {/* Required Field: Category Name */}
                        <Field>
                            <FieldLabel htmlFor='name'>
                                Category Name{' '}
                                <span className='text-red-500'>*</span>
                            </FieldLabel>
                            <Input
                                id='name'
                                name='name'
                                placeholder='Enter category name'
                                defaultValue={state?.formData?.name || ''}
                                required
                            />
                            <InputFieldError field='name' state={state} />
                        </Field>

                        {/* Optional Field: Description */}
                        <Field>
                            <FieldLabel htmlFor='description'>
                                Description
                            </FieldLabel>
                            <Textarea
                                id='description'
                                name='description'
                                placeholder='Enter category description (optional)'
                                defaultValue={
                                    state?.formData?.description || ''
                                }
                                className='resize-none'
                                rows={3}
                            />
                            <InputFieldError
                                field='description'
                                state={state}
                            />
                        </Field>

                        {/* Optional Field: Icon */}
                        <Field>
                            <FieldLabel htmlFor='icon'>Icon</FieldLabel>
                            <Input
                                id='icon'
                                name='icon'
                                placeholder='Enter icon name or emoji (optional)'
                                defaultValue={state?.formData?.icon || ''}
                            />
                            <p className='text-xs text-gray-500'>
                                Example: heart, star, game, etc.
                            </p>
                            <InputFieldError field='icon' state={state} />
                        </Field>

                        {/* Optional Field: Color */}
                        <Field>
                            <FieldLabel htmlFor='color'>Color</FieldLabel>
                            <div className='flex items-center gap-2'>
                                <Input
                                    id='color'
                                    name='color'
                                    type='color'
                                    defaultValue={
                                        state?.formData?.color || '#000000'
                                    }
                                    className='h-10 w-20 cursor-pointer'
                                />
                                <Input
                                    type='text'
                                    placeholder='Or enter hex color code'
                                    defaultValue={state?.formData?.color || ''}
                                    onChange={(e) => {
                                        const colorInput =
                                            document.getElementById(
                                                'color'
                                            ) as HTMLInputElement;
                                        if (colorInput) {
                                            colorInput.value = e.target.value;
                                        }
                                    }}
                                    className='flex-1'
                                />
                            </div>
                            <p className='text-xs text-gray-500'>
                                Select a color for the category (optional)
                            </p>
                            <InputFieldError field='color' state={state} />
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
                            {isPending ? 'Saving...' : 'Create Category'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CategoryFormDialog;
