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
import Image from 'next/image';
import { useActionState, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
    createAdmin,
    updateAdmin,
} from '../../../../service/admin/adminsManagement';
import { IAdmin } from '../../../../types/admin.interface';
import EyeButton from '../../../common/EyeButton';
import InputFieldError from '../../../common/InputFieldError';

interface IAdminFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    admin?: IAdmin;
}

const AdminFormDialog = ({
    open,
    onClose,
    onSuccess,
    admin,
}: IAdminFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isEdit = !!admin?.id;

    // Track previous state to prevent infinite loop
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prevStateRef = useRef<any>(null);

    const [state, formAction, isPending] = useActionState(
        isEdit ? updateAdmin.bind(null, admin?.id as string) : createAdmin,
        null
    );
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    // Handle success/error from server - FIXED VERSION
    useEffect(() => {
        // Skip if state is null or same as previous
        if (!state || state === prevStateRef.current) {
            return;
        }

        // Update previous state reference
        prevStateRef.current = state;

        // Handle success case
        if (state?.success) {
            toast.success(state.message || 'Operation successful');

            // Reset form
            if (formRef.current) {
                formRef.current.reset();
            }

            setSelectedFile(null);

            // Call callbacks
            onSuccess();
            onClose();
        }
        // Handle error case
        else if (state?.message && state.success === false) {
            toast.error(state.message);

            // Restore file to input after error
            if (selectedFile && fileInputRef.current) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(selectedFile);
                fileInputRef.current.files = dataTransfer.files;
            }
        }
    }, [state]); // Only depend on state, but use ref to prevent loops

    // Reset previous state when dialog closes
    useEffect(() => {
        if (!open) {
            prevStateRef.current = null;
        }
    }, [open]);

    const handleClose = () => {
        setSelectedFile(null);
        formRef.current?.reset();
        prevStateRef.current = null; // Reset ref on manual close
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className='max-h-[90vh] flex flex-col p-0'>
                <DialogHeader className='px-6 pt-6 pb-4'>
                    <DialogTitle>
                        {isEdit ? 'Edit Admin' : 'Add New Admin'}
                    </DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className='flex flex-col flex-1 min-h-0'
                >
                    <div className='flex-1 overflow-y-auto px-6 space-y-4 pb-4'>
                        {/* Create Mode Fields */}
                        {!isEdit && (
                            <>
                                {/* Name Field */}
                                <Field>
                                    <FieldLabel htmlFor='name'>Name</FieldLabel>
                                    <Input
                                        id='name'
                                        name='name'
                                        placeholder='John Doe'
                                        defaultValue={
                                            state?.formData?.name || ''
                                        }
                                    />
                                    <InputFieldError
                                        field='name'
                                        state={state}
                                    />
                                </Field>

                                {/* Email Field */}
                                <Field>
                                    <FieldLabel htmlFor='email'>
                                        Email
                                    </FieldLabel>
                                    <Input
                                        id='email'
                                        name='email'
                                        type='email'
                                        placeholder='admin@example.com'
                                        defaultValue={
                                            state?.formData?.email || ''
                                        }
                                    />
                                    <InputFieldError
                                        field='email'
                                        state={state}
                                    />
                                </Field>

                                {/* Password Field */}
                                <Field>
                                    <FieldLabel htmlFor='password'>
                                        Password
                                    </FieldLabel>
                                    <div className='relative'>
                                        <Input
                                            id='password'
                                            name='password'
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder='Enter password'
                                            defaultValue={
                                                state?.formData?.password || ''
                                            }
                                            className='pr-12'
                                        />
                                        <EyeButton
                                            isVisible={showPassword}
                                            onToggle={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    </div>
                                    <InputFieldError
                                        field='password'
                                        state={state}
                                    />
                                </Field>

                                {/* Confirm Password Field */}
                                <Field>
                                    <FieldLabel htmlFor='confirmPassword'>
                                        Confirm Password
                                    </FieldLabel>
                                    <div className='relative'>
                                        <Input
                                            id='confirmPassword'
                                            name='confirmPassword'
                                            type={
                                                showConfirmPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder='Confirm your password'
                                            defaultValue={
                                                state?.formData
                                                    ?.confirmPassword || ''
                                            }
                                            className='pr-12'
                                        />
                                        <EyeButton
                                            isVisible={showConfirmPassword}
                                            onToggle={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        />
                                    </div>
                                    <InputFieldError
                                        field='confirmPassword'
                                        state={state}
                                    />
                                </Field>
                            </>
                        )}

                        {/* Edit Mode Fields */}
                        {isEdit && (
                            <>
                                {/* Name Field */}
                                <Field>
                                    <FieldLabel htmlFor='name'>Name</FieldLabel>
                                    <Input
                                        id='name'
                                        name='name'
                                        placeholder='John Doe'
                                        defaultValue={
                                            state?.formData?.name ||
                                            admin?.name ||
                                            ''
                                        }
                                    />
                                    <InputFieldError
                                        field='name'
                                        state={state}
                                    />
                                </Field>

                                {/* Email Field (Read-only) */}
                                <Field>
                                    <FieldLabel htmlFor='email'>
                                        Email
                                    </FieldLabel>
                                    <Input
                                        id='email'
                                        name='email'
                                        type='email'
                                        placeholder='admin@example.com'
                                        defaultValue={admin?.email || ''}
                                        disabled={true}
                                    />
                                </Field>

                                {/* Contact Number Field */}
                                <Field>
                                    <FieldLabel htmlFor='contactNumber'>
                                        Contact Number
                                    </FieldLabel>
                                    <Input
                                        id='contactNumber'
                                        name='contactNumber'
                                        placeholder='+1234567890'
                                        defaultValue={
                                            state?.formData?.contactNumber ||
                                            admin?.contactNumber ||
                                            ''
                                        }
                                    />
                                    <InputFieldError
                                        field='contactNumber'
                                        state={state}
                                    />
                                </Field>

                                {/* Profile Photo Field */}
                                <Field>
                                    <FieldLabel htmlFor='file'>
                                        Profile Photo
                                    </FieldLabel>
                                    {selectedFile && (
                                        <div className='mb-2'>
                                            <Image
                                                src={URL.createObjectURL(
                                                    selectedFile
                                                )}
                                                alt='Profile Photo Preview'
                                                width={50}
                                                height={50}
                                                className='rounded-full object-cover'
                                            />
                                        </div>
                                    )}
                                    {!selectedFile && admin?.profilePhoto && (
                                        <div className='mb-2'>
                                            <Image
                                                src={admin.profilePhoto}
                                                alt='Current Profile Photo'
                                                width={50}
                                                height={50}
                                                className='rounded-full object-cover'
                                            />
                                        </div>
                                    )}

                                    <Input
                                        ref={fileInputRef}
                                        id='file'
                                        name='file'
                                        type='file'
                                        accept='image/*'
                                        onChange={handleFileChange}
                                    />
                                    <p className='text-xs text-gray-500 mt-1'>
                                        Upload a profile photo for the admin
                                    </p>
                                    <InputFieldError
                                        field='profilePhoto'
                                        state={state}
                                    />
                                </Field>
                            </>
                        )}
                    </div>

                    {/* Form Actions */}
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
                            {isPending
                                ? 'Saving...'
                                : isEdit
                                ? 'Update Admin'
                                : 'Create Admin'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AdminFormDialog;
