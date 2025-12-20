'use client';

import { Award, Calendar, Star, TrendingUp, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const StatsCard = () => {
    const [counts, setCounts] = useState({
        users: 0,
        events: 0,
        rating: 0,
        hosts: 0,
        satisfaction: 0,
    });
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Intersection Observer for scroll animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Animated counter
    useEffect(() => {
        if (!isVisible) return;

        const targetValues = {
            users: 1250,
            events: 3500,
            rating: 4.8,
            hosts: 850,
            satisfaction: 98,
        };

        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setCounts({
                users: Math.floor(targetValues.users * progress),
                events: Math.floor(targetValues.events * progress),
                rating: Number((targetValues.rating * progress).toFixed(1)),
                hosts: Math.floor(targetValues.hosts * progress),
                satisfaction: Math.floor(targetValues.satisfaction * progress),
            });

            if (currentStep >= steps) {
                setCounts(targetValues);
                clearInterval(timer);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [isVisible]);

    const stats = [
        {
            id: 'users',
            value: counts.users.toLocaleString(),
            suffix: '+',
            label: 'Active Users',
            icon: <Users className='w-6 h-6' />,
            gradient: 'from-blue-500 to-cyan-500',
            bgGlow: 'bg-blue-500/20',
            hoverGlow: 'group-hover:shadow-blue-500/50',
        },
        {
            id: 'events',
            value: counts.events.toLocaleString(),
            suffix: '+',
            label: 'Events Created',
            icon: <Calendar className='w-6 h-6' />,
            gradient: 'from-purple-500 to-pink-500',
            bgGlow: 'bg-purple-500/20',
            hoverGlow: 'group-hover:shadow-purple-500/50',
        },
        {
            id: 'rating',
            value: counts.rating,
            suffix: '',
            label: 'Average Rating',
            icon: <Star className='w-6 h-6 fill-current' />,
            gradient: 'from-yellow-500 to-orange-500',
            bgGlow: 'bg-yellow-500/20',
            hoverGlow: 'group-hover:shadow-yellow-500/50',
        },
        {
            id: 'hosts',
            value: counts.hosts.toLocaleString(),
            suffix: '+',
            label: 'Verified Hosts',
            icon: <Award className='w-6 h-6' />,
            gradient: 'from-emerald-500 to-teal-500',
            bgGlow: 'bg-emerald-500/20',
            hoverGlow: 'group-hover:shadow-emerald-500/50',
        },
        {
            id: 'satisfaction',
            value: counts.satisfaction,
            suffix: '%',
            label: 'User Satisfaction',
            icon: <TrendingUp className='w-6 h-6' />,
            gradient: 'from-rose-500 to-red-500',
            bgGlow: 'bg-rose-500/20',
            hoverGlow: 'group-hover:shadow-rose-500/50',
        },
    ];

    return (
        <div ref={cardRef} className='w-full p-4 sm:p-6 lg:p-8'>
            {/* Header Section */}
            <div className='text-center max-w-3xl mx-auto mb-12 animate-fade-in'>
                <div className='inline-block mb-4'>
                    <span className='px-4 py-2 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm font-semibold shadow-lg animate-pulse'>
                        Live Statistics
                    </span>
                </div>
                <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4'>
                    <span className='text-gray-900 dark:text-white'>
                        Platform{' '}
                    </span>
                    <span className='text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient'>
                        Statistics
                    </span>
                </h2>
                <p className='text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed'>
                    Discover key metrics that highlight our platform&apos;s{' '}
                    <span className='font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500'>
                        growth
                    </span>{' '}
                    and{' '}
                    <span className='font-semibold text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500'>
                        user satisfaction
                    </span>
                    .
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6'>
                {stats.map((stat, index) => (
                    <div
                        key={stat.id}
                        className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800
                            p-6 shadow-lg transition-all duration-500 hover:scale-105
                            ${stat.hoverGlow} hover:shadow-2xl
                            border border-gray-100 dark:border-slate-700`}
                        style={{
                            animationDelay: `${index * 100}ms`,
                            animation: isVisible
                                ? 'slideUp 0.6s ease-out forwards'
                                : 'none',
                            opacity: isVisible ? 1 : 0,
                        }}
                    >
                        {/* Animated Background Gradient */}
                        <div
                            className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`}
                        ></div>

                        {/* Floating Particles Effect */}
                        <div
                            className={`absolute -top-10 -right-10 w-32 h-32 ${stat.bgGlow} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-150`}
                        ></div>
                        <div
                            className={`absolute -bottom-10 -left-10 w-32 h-32 ${stat.bgGlow} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-150`}
                        ></div>

                        {/* Content */}
                        <div className='relative z-10'>
                            {/* Icon with gradient */}
                            <div
                                className={`inline-flex items-center justify-center w-14 h-14
                                bg-linear-to-br ${stat.gradient} rounded-xl mb-4 text-white
                                shadow-lg transform group-hover:rotate-12 group-hover:scale-110
                                transition-all duration-500`}
                            >
                                {stat.icon}
                            </div>

                            {/* Value with gradient text */}
                            <div className='mb-2 overflow-hidden'>
                                <span
                                    className={`text-4xl lg:text-5xl font-bold bg-linear-to-r ${stat.gradient}
                                    bg-clip-text text-transparent tabular-nums block
                                    transform group-hover:scale-110 transition-transform duration-500 origin-left`}
                                >
                                    {stat.value}
                                    {stat.suffix}
                                </span>
                            </div>

                            {/* Label */}
                            <p
                                className='text-sm font-semibold text-gray-600 dark:text-gray-400
                                group-hover:text-gray-900 dark:group-hover:text-gray-200
                                transition-colors duration-300'
                            >
                                {stat.label}
                            </p>
                        </div>

                        {/* Shine Effect on Hover */}
                        <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700'>
                            <div className='absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
                        </div>

                        {/* Bottom Accent Line */}
                        <div
                            className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${stat.gradient}
                            transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                        ></div>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes gradient {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }

                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </div>
    );
};

export default StatsCard;
