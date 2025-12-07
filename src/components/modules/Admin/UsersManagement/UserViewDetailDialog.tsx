import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { formatDateTime, getInitials } from '@/lib/formatters';
import { Calendar, Mail, MapPin, Phone, Shield, User } from 'lucide-react';
import { IUser } from '../../../../types/user.interface';
import InfoRow from '../../../common/InoRow';

interface IUserViewDialogProps {
    open: boolean;
    onClose: () => void;
    user: IUser | null;
}

const UserViewDetailDialog = ({
    open,
    onClose,
    user,
}: IUserViewDialogProps) => {
    if (!user) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='min-w-5xl max-h-[90vh] flex flex-col p-0'>
                <DialogHeader className='px-6 pt-6 pb-4'>
                    <DialogTitle>User Profile</DialogTitle>
                </DialogHeader>

                <div className='flex-1 overflow-y-auto px-6 pb-6'>
                    {/* User Profile Header */}
                    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-6 shadow-sm'>
                        <Avatar className='h-24 w-24 border-4 border-white shadow-lg'>
                            <AvatarImage
                                src={user?.profilePhoto || ''}
                                alt={user?.name}
                            />
                            <AvatarFallback className='text-2xl bg-linear-to-br from-blue-500 to-indigo-600 text-white'>
                                {getInitials(user?.name || '')}
                            </AvatarFallback>
                        </Avatar>
                        <div className='flex-1 text-center sm:text-left'>
                            <h2 className='text-3xl font-bold mb-1 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                                {user?.name}
                            </h2>
                            <p className='text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2'>
                                <Mail className='h-4 w-4' />
                                {user?.email}
                            </p>
                            <div className='flex flex-wrap gap-2 justify-center sm:justify-start'>
                                <Badge
                                    variant={
                                        user?.isDeleted
                                            ? 'destructive'
                                            : 'default'
                                    }
                                    className='text-sm'
                                >
                                    {user?.isDeleted ? 'Inactive' : 'Active'}
                                </Badge>
                                <Badge variant='secondary' className='text-sm'>
                                    <Shield className='h-3 w-3 mr-1' />
                                    User
                                </Badge>
                                {user?.age && (
                                    <Badge
                                        variant='outline'
                                        className='text-sm'
                                    >
                                        Age: {user.age}
                                    </Badge>
                                )}
                                {user?.address && (
                                    <Badge
                                        variant='outline'
                                        className='text-sm'
                                    >
                                        <MapPin className='h-3 w-3 mr-1' />
                                        {user.address}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Information Grid */}
                    <div className='space-y-6'>
                        {/* Contact Information */}
                        <div>
                            <div className='flex items-center gap-2 mb-4'>
                                <Phone className='h-5 w-5 text-purple-600' />
                                <h3 className='font-semibold text-lg'>
                                    Contact Information
                                </h3>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
                                <div className='flex items-start gap-3'>
                                    <Phone className='h-4 w-4 mt-1 text-muted-foreground' />
                                    <InfoRow
                                        label='Contact Number'
                                        value={
                                            user?.contactNumber ||
                                            'Not provided'
                                        }
                                    />
                                </div>
                                <div className='flex items-start gap-3'>
                                    <Mail className='h-4 w-4 mt-1 text-muted-foreground' />
                                    <InfoRow
                                        label='Email'
                                        value={user?.email || 'Not provided'}
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Personal Information */}
                        <div>
                            <div className='flex items-center gap-2 mb-4'>
                                <User className='h-5 w-5 text-green-600' />
                                <h3 className='font-semibold text-lg'>
                                    Personal Information
                                </h3>
                            </div>
                            <div className='grid grid-cols-1 gap-4 bg-muted/50 p-4 rounded-lg'>
                                <div className='flex items-start gap-3'>
                                    <User className='h-4 w-4 mt-1 text-muted-foreground' />
                                    <InfoRow
                                        label='Full Name'
                                        value={user?.name || 'Not provided'}
                                    />
                                </div>
                                <div className='flex items-start gap-3'>
                                    <Calendar className='h-4 w-4 mt-1 text-muted-foreground' />
                                    <InfoRow
                                        label='Age'
                                        value={
                                            user?.age?.toString() ||
                                            'Not provided'
                                        }
                                    />
                                </div>
                                {user?.address && (
                                    <div className='flex items-start gap-3'>
                                        <MapPin className='h-4 w-4 mt-1 text-muted-foreground' />
                                        <InfoRow
                                            label='Address'
                                            value={user.address}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <Separator />

                        {/* Account Information */}
                        <div>
                            <div className='flex items-center gap-2 mb-4'>
                                <Shield className='h-5 w-5 text-orange-600' />
                                <h3 className='font-semibold text-lg'>
                                    Account Information
                                </h3>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
                                <div className='flex items-start gap-3'>
                                    <Calendar className='h-4 w-4 mt-1 text-muted-foreground' />
                                    <InfoRow
                                        label='Created On'
                                        value={formatDateTime(
                                            user?.createdAt || ''
                                        )}
                                    />
                                </div>
                                <div className='flex items-start gap-3'>
                                    <Calendar className='h-4 w-4 mt-1 text-muted-foreground' />
                                    <InfoRow
                                        label='Last Updated'
                                        value={formatDateTime(
                                            user?.updatedAt || ''
                                        )}
                                    />
                                </div>
                                <div className='flex items-start gap-3'>
                                    <Shield className='h-4 w-4 mt-1 text-muted-foreground' />
                                    <InfoRow label='Role' value='User' />
                                </div>
                                <div className='flex items-start gap-3'>
                                    <User className='h-4 w-4 mt-1 text-muted-foreground' />
                                    <InfoRow
                                        label='Account Status'
                                        value={
                                            user?.isDeleted
                                                ? 'Inactive'
                                                : 'Active'
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserViewDetailDialog;
