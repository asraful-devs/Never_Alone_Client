/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import InputFieldError from '@/components/common/InputFieldError';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createEvent, updateEvent } from '@/service/events/eventsManagement';
import { Event } from '@/types/event.interface';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useActionState, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface IEventFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    event?: Event;
    categories: Array<{ id: string; name: string }>;
    hostData?: { id?: string | null } | null;
}

const EventFormDialog = ({
    open,
    onClose,
    onSuccess,
    event,
    categories,
    hostData,
}: IEventFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isEdit = !!event?.id;
    const hostId = hostData?.id ?? '';

    const prevStateRef = useRef<any>(null);
    const [state, formAction, isPending] = useActionState<any, FormData>(
        async (prevState: any, formData: FormData) => {
            try {
                // console.log('=== FORM SUBMISSION START ===');
                // console.log('IsEdit:', isEdit);

                // Log form data contents
                const formEntries: any = {};
                formData.forEach((value, key) => {
                    if (value instanceof File) {
                        formEntries[
                            key
                        ] = `File: ${value.name} (${value.size} bytes)`;
                    } else {
                        formEntries[key] = value;
                    }
                });
                // console.log('Form Data Sent:', formEntries);

                let result;
                if (isEdit) {
                    // console.log('Calling updateEvent with eventId:', event!.id);
                    result = await updateEvent(event!.id, prevState, formData);
                } else {
                    // console.log('Calling createEvent');
                    result = await createEvent(null, formData);
                }

                // console.log('Response Received:', result);
                // console.log('=== FORM SUBMISSION END ===');

                return result;
            } catch (error: any) {
                console.error('Form Submission Error:', error);
                return {
                    success: false,
                    message: error.message || 'Something went wrong',
                };
            }
        },
        null
    );

    const [imagePreview, setImagePreview] = useState<string>(
        event?.eventImage || ''
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(event?.eventImage || '');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
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

            // Reset preview on success
            setTimeout(() => {
                setImagePreview(event?.eventImage || '');
            }, 0);

            onSuccess();
            onClose();
        } else if (state?.message && state.success === false) {
            toast.error(state.message);
        }
    }, [state, event?.eventImage, onClose, onSuccess]);

    useEffect(() => {
        // Reset image preview when event changes or dialog opens
        if (open && event?.eventImage) {
            setImagePreview(event.eventImage);
        } else if (!open) {
            prevStateRef.current = null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, event?.id]);

    const handleClose = () => {
        setImagePreview(event?.eventImage || '');
        formRef.current?.reset();
        prevStateRef.current = null;
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className='max-h-[90vh] flex flex-col p-0 max-w-2xl'>
                <DialogHeader className='px-6 pt-6 pb-4'>
                    <DialogTitle>
                        {isEdit ? 'Edit Event' : 'Create New Event'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? 'Update your event details and save changes.'
                            : 'Fill in the details below to publish your event.'}
                    </DialogDescription>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className='flex flex-col flex-1 min-h-0'
                >
                    {/* Hidden hostId field to ensure backend receives host id */}
                    <input type='hidden' name='hostId' value={hostId} />

                    <div className='flex-1 overflow-y-auto px-6 space-y-4 pb-4'>
                        {/* Event Image Upload */}
                        <div className='space-y-2'>
                            <Label
                                htmlFor='eventImage'
                                className='text-base font-semibold'
                            >
                                Event Image
                            </Label>
                            <div className='space-y-3'>
                                {imagePreview && (
                                    <div className='relative w-full h-48 rounded-lg overflow-hidden border-2 border-border bg-muted'>
                                        <Image
                                            src={imagePreview}
                                            alt='Preview'
                                            className='w-full h-full object-cover'
                                            width={800}
                                            height={400}
                                        />
                                        <button
                                            type='button'
                                            onClick={handleRemoveImage}
                                            className='absolute top-2 right-2 bg-destructive text-white rounded-full p-1 hover:bg-destructive/90'
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                )}
                                <div className='relative'>
                                    <input
                                        ref={fileInputRef}
                                        type='file'
                                        id='eventImage'
                                        name='file'
                                        accept='image/*'
                                        onChange={handleFileChange}
                                        className='hidden'
                                    />
                                    <Button
                                        type='button'
                                        variant='outline'
                                        className='w-full'
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                    >
                                        <Upload className='h-4 w-4 mr-2' />
                                        {imagePreview
                                            ? 'Change Image'
                                            : 'Upload Image'}
                                    </Button>
                                </div>
                            </div>
                            <InputFieldError field='eventImage' state={state} />
                        </div>

                        {/* Event Title */}
                        <Field>
                            <Label
                                htmlFor='title'
                                className='text-base font-semibold'
                            >
                                Event Title
                            </Label>
                            <Input
                                id='title'
                                name='title'
                                placeholder='Enter event title'
                                defaultValue={
                                    state?.formData?.title || event?.title || ''
                                }
                            />
                            <InputFieldError field='title' state={state} />
                        </Field>

                        {/* Description */}
                        <Field>
                            <Label
                                htmlFor='description'
                                className='text-base font-semibold'
                            >
                                Description
                            </Label>
                            <Textarea
                                id='description'
                                name='description'
                                placeholder='Describe your event'
                                rows={4}
                                defaultValue={
                                    state?.formData?.description ||
                                    event?.description ||
                                    ''
                                }
                            />
                            <InputFieldError
                                field='description'
                                state={state}
                            />
                        </Field>

                        {/* Category */}
                        <Field>
                            <Label
                                htmlFor='categoryId'
                                className='text-base font-semibold'
                            >
                                Category
                            </Label>
                            <select
                                id='categoryId'
                                name='categoryId'
                                defaultValue={
                                    state?.formData?.categoryId ||
                                    event?.categoryId ||
                                    ''
                                }
                                className='w-full px-3 py-2 border border-input rounded-md bg-background text-foreground'
                            >
                                <option value=''>Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <InputFieldError field='categoryId' state={state} />
                        </Field>

                        {/* Location */}
                        <Field>
                            <Label
                                htmlFor='location'
                                className='text-base font-semibold'
                            >
                                Location
                            </Label>
                            <Input
                                id='location'
                                name='location'
                                placeholder='Event location'
                                defaultValue={
                                    state?.formData?.location ||
                                    event?.location ||
                                    ''
                                }
                            />
                            <InputFieldError field='location' state={state} />
                        </Field>

                        {/* Fee */}
                        <Field>
                            <Label
                                htmlFor='fee'
                                className='text-base font-semibold'
                            >
                                Ticket Fee ($)
                            </Label>
                            <Input
                                id='fee'
                                name='fee'
                                type='number'
                                placeholder='Enter ticket price'
                                defaultValue={
                                    state?.formData?.fee || event?.fee || ''
                                }
                            />
                            <InputFieldError field='fee' state={state} />
                        </Field>

                        {/* Seats */}
                        <Field>
                            <Label
                                htmlFor='seats'
                                className='text-base font-semibold'
                            >
                                Total Seats
                            </Label>
                            <Input
                                id='seats'
                                name='seats'
                                type='number'
                                placeholder='Number of seats available'
                                defaultValue={
                                    state?.formData?.seats || event?.seats || ''
                                }
                            />
                            <InputFieldError field='seats' state={state} />
                        </Field>

                        {/* Start Date Time */}
                        <Field>
                            <Label
                                htmlFor='startDateTime'
                                className='text-base font-semibold'
                            >
                                Start Date & Time
                            </Label>
                            <Input
                                id='startDateTime'
                                name='startDateTime'
                                type='datetime-local'
                                defaultValue={
                                    state?.formData?.startDateTime ||
                                    (event?.startDateTime
                                        ? new Date(event.startDateTime)
                                              .toISOString()
                                              .slice(0, 16)
                                        : '')
                                }
                            />
                            <InputFieldError
                                field='startDateTime'
                                state={state}
                            />
                        </Field>

                        {/* End Date Time */}
                        <Field>
                            <Label
                                htmlFor='endDateTime'
                                className='text-base font-semibold'
                            >
                                End Date & Time
                            </Label>
                            <Input
                                id='endDateTime'
                                name='endDateTime'
                                type='datetime-local'
                                defaultValue={
                                    state?.formData?.endDateTime ||
                                    (event?.endDateTime
                                        ? new Date(event.endDateTime)
                                              .toISOString()
                                              .slice(0, 16)
                                        : '')
                                }
                            />
                            <InputFieldError
                                field='endDateTime'
                                state={state}
                            />
                        </Field>
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
                                ? 'Update Event'
                                : 'Create Event'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EventFormDialog;
