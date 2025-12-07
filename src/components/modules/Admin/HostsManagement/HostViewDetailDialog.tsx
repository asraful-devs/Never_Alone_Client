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
import {
    Calendar,
    Mail,
    MapPin,
    Phone,
    Shield,
    Star,
    User,
} from 'lucide-react';
import { IHost } from '../../../../types/host.interface';
import InfoRow from '../../../common/InoRow';

interface IHostViewDialogProps {
    open: boolean;
    onClose: () => void;
    host: IHost | null;
}

const HostViewDetailDialog = ({
    open,
    onClose,
    host,
}: IHostViewDialogProps) => {
    if (!host) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='min-w-5xl max-h-[90vh] flex flex-col p-0'>
                <DialogHeader className='px-6 pt-6 pb-4'>
                    <DialogTitle>Host Profile</DialogTitle>
                </DialogHeader>

                <div className='flex-1 overflow-y-auto px-6 pb-6'>
                    {/* Host Profile Header */}
                    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg mb-6 shadow-sm'>
                        <Avatar className='h-24 w-24 border-4 border-white shadow-lg'>
                            <AvatarImage
                                src={host?.profilePhoto || ''}
                                alt={host?.name}
                            />
                            <AvatarFallback className='text-2xl bg-linear-to-br from-purple-500 to-pink-600 text-white'>
                                {getInitials(host?.name || '')}
                            </AvatarFallback>
                        </Avatar>
                        <div className='flex-1 text-center sm:text-left'>
                            <h2 className='text-3xl font-bold mb-1 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                                {host?.name}
                            </h2>
                            <p className='text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2'>
                                <Mail className='h-4 w-4' />
                                {host?.email}
                            </p>
                            <div className='flex flex-wrap gap-2 justify-center sm:justify-start'>
                                <Badge
                                    variant={
                                        host?.isDeleted
                                            ? 'destructive'
                                            : 'default'
                                    }
                                    className='text-sm'
                                >
                                    {host?.isDeleted ? 'Inactive' : 'Active'}
                                </Badge>
                                <Badge
                                    variant={
                                        host?.isVerified
                                            ? 'default'
                                            : 'secondary'
                                    }
                                    className='text-sm'
                                >
                                    <Shield className='h-3 w-3 mr-1' />
                                    {host?.isVerified
                                        ? 'Verified'
                                        : 'Not Verified'}
                                </Badge>
                                {host?.rating !== undefined && (
                                    <Badge
                                        variant='outline'
                                        className='text-sm'
                                    >
                                        <Star className='h-3 w-3 mr-1 fill-yellow-400 text-yellow-400' />
                                        {host.rating}/5
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
                                            host?.contactNumber ||
                                            'Not provided'
                                        }
                                    />
                                </div>
                                <div className='flex items-start gap-3'>
                                    <Mail className='h-4 w-4 mt-1 text-muted-foreground' />
                                    <InfoRow
                                        label='Email'
                                        value={host?.email || 'Not provided'}
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Host Information */}
                        <div>
                            <div className='flex items-center gap-2 mb-4'>
                                <User className='h-5 w-5 text-green-600' />
                                <h3 className='font-semibold text-lg'>
                                    Host Information
                                </h3>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg'>
                                <div className='flex items-start gap-3'>
                                    <User className='h-4 w-4 mt-1 text-muted-foreground' />
                                    <InfoRow
                                        label='Full Name'
                                        value={host?.name || 'Not provided'}
                                    />
                                </div>
                                <div className='flex items-start gap-3'>
                                    <Star className='h-4 w-4 mt-1 text-muted-foreground' />
                                    <InfoRow
                                        label='Rating'
                                        value={
                                            host?.rating !== undefined
                                                ? `${host.rating}/5`
                                                : 'Not rated yet'
                                        }
                                    />
                                </div>
                                {host?.address && (
                                    <div className='flex items-start gap-3 md:col-span-2'>
                                        <MapPin className='h-4 w-4 mt-1 text-muted-foreground' />
                                        <InfoRow
                                            label='Address'
                                            value={host.address}
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
                                            host?.createdAt || ''
                                        )}
                                    />
                                </div>
                                <div className='flex items-start gap-3'>
                                    <Calendar className='h-4 w-4 mt-1 text-muted-foreground' />
                                    <InfoRow
                                        label='Last Updated'
                                        value={formatDateTime(
                                            host?.updatedAt || ''
                                        )}
                                    />
                                </div>
                                <div className='flex items-start gap-3'>
                                    <Shield className='h-4 w-4 mt-1 text-muted-foreground' />
                                    <InfoRow label='Role' value='Host' />
                                </div>
                                <div className='flex items-start gap-3'>
                                    <User className='h-4 w-4 mt-1 text-muted-foreground' />
                                    <InfoRow
                                        label='Account Status'
                                        value={
                                            host?.isDeleted
                                                ? 'Inactive'
                                                : 'Active'
                                        }
                                    />
                                </div>
                                <div className='flex items-start gap-3'>
                                    <Shield className='h-4 w-4 mt-1 text-muted-foreground' />
                                    <InfoRow
                                        label='Verification Status'
                                        value={
                                            host?.isVerified
                                                ? 'Verified'
                                                : 'Not Verified'
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

export default HostViewDetailDialog;
