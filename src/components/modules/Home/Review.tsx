import { Star } from 'lucide-react';
import Image from 'next/image';

const Review = () => {
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
            text: "The best platform for building communities! I've connected with amazing people and organized memorable meetups. Highly recommended for anyone!",
        },
    ];

    return (
        <div>
            {/* Reviews Section */}
            <section className='py-12 sm:py-16 lg:py-20 px-4'>
                <div className='max-w-6xl mx-auto'>
                    <div className='text-center mb-12'>
                        <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                            What Our Community Says
                        </h2>
                        <p className='text-lg text-gray-600 dark:text-gray-400'>
                            Real experiences from real people
                        </p>
                    </div>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className='bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all'
                            >
                                <div className='flex items-center gap-3 mb-4'>
                                    <Image
                                        src={review.image}
                                        alt={review.name}
                                        className='w-14 h-14 rounded-full object-cover'
                                        width={56}
                                        height={56}
                                    />
                                    <div>
                                        <h4 className='font-bold text-gray-900 dark:text-white'>
                                            {review.name}
                                        </h4>
                                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                                            {review.role}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex gap-1 mb-3'>
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className='w-4 h-4 fill-yellow-400 text-yellow-400'
                                        />
                                    ))}
                                </div>
                                <p className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed'>
                                    {review.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Review;
