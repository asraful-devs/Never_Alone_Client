'use client';

import { Quote, Star } from 'lucide-react';
import Image from 'next/image';

interface ReviewCardProps {
    name: string;
    role: string;
    image: string;
    rating: number;
    text: string;
    index: number;
}

const ReviewCard = ({
    name,
    role,
    image,
    rating,
    text,
    index,
}: ReviewCardProps) => {
    // Gradient colors for each card
    const gradients = [
        'from-blue-500/10 to-purple-500/10',
        'from-green-500/10 to-teal-500/10',
        'from-orange-500/10 to-red-500/10',
        'from-pink-500/10 to-rose-500/10',
    ];

    const borderGradients = [
        'from-blue-500 to-purple-500',
        'from-green-500 to-teal-500',
        'from-orange-500 to-red-500',
        'from-pink-500 to-rose-500',
    ];

    const iconColors = [
        'text-blue-500',
        'text-green-500',
        'text-orange-500',
        'text-pink-500',
    ];

    const gradient = gradients[index % gradients.length];
    const borderGradient = borderGradients[index % borderGradients.length];
    const iconColor = iconColors[index % iconColors.length];

    return (
        <div className='group relative'>
            {/* Animated background gradient */}
            <div
                className={`absolute -inset-0.5 bg-linear-to-r ${borderGradient} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200`}
            />

            <div
                className={`relative rounded-2xl border border-border/50 bg-linear-to-br ${gradient} backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
            >
                {/* Quote Icon */}
                <div className='absolute top-4 right-4 opacity-10'>
                    <Quote className={`h-16 w-16 ${iconColor}`} />
                </div>

                {/* User Info */}
                <div className='relative flex items-center gap-4 mb-4'>
                    <div className='relative'>
                        {/* Animated ring */}
                        <div
                            className={`absolute -inset-1 bg-linear-to-r ${borderGradient} rounded-full opacity-0 group-hover:opacity-75 blur-sm transition duration-500`}
                        />
                        <div className='relative'>
                            <Image
                                src={image}
                                alt={name}
                                width={56}
                                height={56}
                                className='w-14 h-14 rounded-full object-cover border-2 border-background shadow-lg'
                            />
                            {/* Online indicator */}
                            <div
                                className={`absolute -bottom-1 -right-1 w-4 h-4 bg-linear-to-r ${borderGradient} rounded-full border-2 border-background animate-pulse`}
                            />
                        </div>
                    </div>

                    <div className='flex-1 min-w-0'>
                        <h4 className='font-bold text-foreground text-base mb-0.5 truncate'>
                            {name}
                        </h4>
                        <p className='text-sm text-muted-foreground truncate'>
                            {role}
                        </p>
                    </div>
                </div>

                {/* Rating Stars */}
                <div className='flex gap-1 mb-4'>
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 transition-all duration-300 ${
                                i < rating
                                    ? `fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] animate-[starPop_0.5s_ease-out_${
                                          i * 100
                                      }ms_both]`
                                    : 'fill-muted text-muted'
                            }`}
                            style={{
                                animation: `starPop 0.5s ease-out ${
                                    i * 0.1
                                }s both`,
                            }}
                        />
                    ))}
                </div>

                {/* Review Text */}
                <p className='text-sm text-foreground/90 leading-relaxed line-clamp-4'>
                    {text}
                </p>

                {/* Decorative bottom gradient */}
                <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${borderGradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
            </div>
        </div>
    );
};

export default ReviewCard;
