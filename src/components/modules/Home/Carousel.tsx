/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { Button } from '@/components/ui/button';
import {
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    Carousel as UiCarousel,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { ICarousel } from '@/types/carousel.interface';
import { useEffect, useMemo, useState } from 'react';

interface HomeCarouselProps {
    items: ICarousel[];
    className?: string;
}

const indicatorBaseClasses =
    'h-2 w-2 rounded-full transition-all duration-300 ease-in-out';

const HomeCarousel = ({ items = [], className }: HomeCarouselProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const slides = useMemo(() => (Array.isArray(items) ? items : []), [items]);

    useEffect(() => {
        // Reset index if items change
        setActiveIndex(0);
    }, [slides.length]);

    if (!slides.length) {
        return null;
    }

    return (
        <section className={cn('relative', className)} aria-label='Featured'>
            <UiCarousel
                className='w-full'
                opts={{ align: 'start', loop: true }}
                setApi={(api) => {
                    api?.on('select', () => {
                        setActiveIndex(api.selectedScrollSnap());
                    });
                }}
            >
                <CarouselContent>
                    {slides.map((slide) => (
                        <CarouselItem key={slide.id || slide.imageUrl}>
                            <div className='relative aspect-video w-full overflow-hidden rounded-xl border bg-muted'>
                                {slide.imageUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={slide.imageUrl}
                                        alt={slide.title}
                                        className='h-full w-full object-cover'
                                        loading='lazy'
                                    />
                                ) : (
                                    <div className='flex h-full w-full items-center justify-center text-muted-foreground'>
                                        No image
                                    </div>
                                )}

                                {/* Gradient overlay */}
                                <div className='pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent' />

                                {/* Content overlay */}
                                <div className='absolute inset-x-6 bottom-6 flex max-w-3xl flex-col gap-3 text-white'>
                                    <h3 className='text-xl font-semibold drop-shadow-sm md:text-2xl'>
                                        {slide.title}
                                    </h3>
                                    {slide.linkUrl && (
                                        <div className='pointer-events-auto'>
                                            <Button
                                                asChild
                                                size='sm'
                                                className='bg-white/90 text-black hover:bg-white'
                                            >
                                                <a href={slide.linkUrl}>
                                                    Learn more
                                                </a>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Controls */}
                <CarouselPrevious className='-left-4 md:-left-12 bg-background/80 backdrop-blur-sm' />
                <CarouselNext className='-right-4 md:-right-12 bg-background/80 backdrop-blur-sm' />

                {/* Indicators */}
                <div className='absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 md:bottom-4'>
                    {slides.map((s, i) => (
                        <span
                            key={s.id || s.imageUrl}
                            aria-hidden='true'
                            className={cn(
                                indicatorBaseClasses,
                                i === activeIndex
                                    ? 'bg-white w-4'
                                    : 'bg-white/60'
                            )}
                        />
                    ))}
                </div>
            </UiCarousel>
        </section>
    );
};

export default HomeCarousel;
