'use client';

import { MessageCircle } from 'lucide-react';
import ReviewCard from './ReviewCard';

const ReviewSection = () => {
    const reviews = [
        {
            name: 'Rafiq Ahmed',
            role: 'Event Organizer',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
            rating: 5,
            text: 'This platform has revolutionized how I organize community events. The interface is intuitive and my attendees love how easy it is to join events!',
        },
        {
            name: 'Nusrat Jahan',
            role: 'Workshop Host',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
            rating: 5,
            text: "I've hosted over 20 workshops through this platform. The payment system is seamless and participant management features are exactly what I needed.",
        },
        {
            name: 'Karim Hassan',
            role: 'Sports Coordinator',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
            rating: 5,
            text: 'Managing football tournaments has never been easier. Real-time updates, easy communication with players, and instant notifications make everything smooth.',
        },
        {
            name: 'Tasnia Rahman',
            role: 'Community Leader',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
            rating: 5,
            text: "The best platform for building communities! I've connected with amazing people and organized memorable. Highly recommended for anyone!",
        },
        {
            name: 'Sabbir Ahmed',
            role: 'Tech Meetup Organizer',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
            rating: 5,
            text: 'As a tech community organizer, I needed something reliable. This platform delivers! Easy event creation, smooth ticketing, and great analytics.',
        },
        {
            name: 'Fariha Islam',
            role: 'Art Exhibition Curator',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
            rating: 5,
            text: 'Organizing art exhibitions requires attention to detail. This platform handles everything beautifully - from invitations to visitor management.',
        },
    ];

    return (
        <section className='relative py-16 sm:py-20 lg:py-24 overflow-hidden'>
            {/* Animated background elements */}
            <div className='absolute inset-0 -z-10'>
                <div className='absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse' />
                <div
                    className='absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse'
                    style={{ animationDelay: '1s' }}
                />
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Section Header */}
                <div className='text-center mb-12 lg:mb-16'>
                    <div className='inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary/10 to-purple-500/10 border border-primary/20 px-4 py-2 text-sm font-medium text-primary mb-6 backdrop-blur-sm'>
                        <MessageCircle className='h-4 w-4' />
                        Testimonials
                    </div>

                    <h2 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6'>
                        <span className='bg-linear-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent'>
                            What Our Community
                        </span>
                        <br />
                        <span className='bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                            Says About Us
                        </span>
                    </h2>

                    <p className='text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
                        Real stories from real people who are making amazing
                        events happen every day
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12'>
                    {reviews.map((review, index) => (
                        <ReviewCard key={index} {...review} index={index} />
                    ))}
                </div>

                {/* Call to Action */}
                {/* <div className='text-center'>
                    <div className='inline-flex flex-col sm:flex-row gap-4 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 backdrop-blur-sm p-6 sm:p-8'>
                        <div className='text-center sm:text-left'>
                            <p className='text-lg font-semibold text-foreground mb-1'>
                                Want to share your experience?
                            </p>
                            <p className='text-sm text-muted-foreground'>
                                Join thousands of happy users and create amazing
                                events
                            </p>
                        </div>
                        <button className='group shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-purple-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-105'>
                            Get Started
                            <MessageCircle className='h-4 w-4 transition-transform duration-300 group-hover:rotate-12' />
                        </button>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default ReviewSection;
