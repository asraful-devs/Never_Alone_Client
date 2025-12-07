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
import Image from 'next/image';
import { useActionState, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
    createUser,
    updateUser,
} from '../../../../service/admin/usersManagement';
import { IUser } from '../../../../types/user.interface';
import EyeButton from '../../../common/EyeButton';
import InputFieldError from '../../../common/InputFieldError';

interface IUserFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    user?: IUser;
}

const UserFormDialog = ({
    open,
    onClose,
    onSuccess,
    user,
}: IUserFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isEdit = !!user?.id;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prevStateRef = useRef<any>(null);

    const [state, formAction, isPending] = useActionState(
        isEdit ? updateUser.bind(null, user?.id as string) : createUser,
        null
    );
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    useEffect(() => {
        if (!state || state === prevStateRef.current) {
            return;
        }

        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message || 'Operation successful');

            if (formRef.current) {
                formRef.current.reset();
            }

            setSelectedFile(null);
            onSuccess();
            onClose();
        } else if (state?.message && state.success === false) {
            toast.error(state.message);

            if (selectedFile && fileInputRef.current) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(selectedFile);
                fileInputRef.current.files = dataTransfer.files;
            }
        }
    }, [state]);

    useEffect(() => {
        if (!open) {
            prevStateRef.current = null;
        }
    }, [open]);

    const handleClose = () => {
        setSelectedFile(null);
        formRef.current?.reset();
        prevStateRef.current = null;
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className='max-h-[90vh] flex flex-col p-0'>
                <DialogHeader className='px-6 pt-6 pb-4'>
                    <DialogTitle>
                        {isEdit ? 'Edit User' : 'Add New User'}
                    </DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className='flex flex-col flex-1 min-h-0'
                >
                    <div className='flex-1 overflow-y-auto px-6 space-y-4 pb-4'>
                        {/* CREATE MODE FIELDS */}
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
                                        placeholder='user@example.com'
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

                        {/* EDIT MODE FIELDS */}
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
                                            user?.name ||
                                            ''
                                        }
                                    />
                                    <InputFieldError
                                        field='name'
                                        state={state}
                                    />
                                </Field>

                                {/* Age Field */}
                                <Field>
                                    <FieldLabel htmlFor='age'>Age</FieldLabel>
                                    <Input
                                        id='age'
                                        name='age'
                                        type='number'
                                        placeholder='25'
                                        defaultValue={
                                            state?.formData?.age ||
                                            user?.age ||
                                            ''
                                        }
                                    />
                                    <InputFieldError
                                        field='age'
                                        state={state}
                                    />
                                </Field>

                                {/* Address Field */}
                                <Field>
                                    <FieldLabel htmlFor='address'>
                                        Address
                                    </FieldLabel>
                                    <Textarea
                                        id='address'
                                        name='address'
                                        placeholder='Enter full address'
                                        rows={3}
                                        defaultValue={
                                            state?.formData?.address ||
                                            user?.address ||
                                            ''
                                        }
                                    />
                                    <InputFieldError
                                        field='address'
                                        state={state}
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
                                            user?.contactNumber ||
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
                                                width={80}
                                                height={80}
                                                className='rounded-full object-cover border-2 border-gray-200'
                                            />
                                        </div>
                                    )}
                                    {!selectedFile && user?.profilePhoto && (
                                        <div className='mb-2'>
                                            <Image
                                                src={user.profilePhoto}
                                                alt='Current Profile Photo'
                                                width={80}
                                                height={80}
                                                className='rounded-full object-cover border-2 border-gray-200'
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
                                        Upload a profile photo (optional)
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
                                ? 'Update User'
                                : 'Create User'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserFormDialog;
