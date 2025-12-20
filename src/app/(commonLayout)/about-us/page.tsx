import StatsCard from '../../../components/common/StatsCard';
import AboutHeroSection from '../../../components/modules/About/AboutHero';
import Features from '../../../components/modules/About/Features';
import Journey from '../../../components/modules/About/Journey';

const AboutPage = () => {
    return (
        <div className='space-y-20'>
            <AboutHeroSection />

            <StatsCard />

            {/* Mission Section */}
            <section className='py-12 sm:py-16 lg:py-20 px-4 bg-white dark:bg-slate-800/50 rounded-2xl'>
                <div className='max-w-6xl mx-auto text-center'>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
                        Our Mission
                    </h2>
                    <p className='text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed'>
                        To create a platform where anyone can easily organize
                        events, build communities, and create meaningful
                        connections. Whether you&apos;re hosting a workshop,
                        organizing a sports match, or planning a meetup, we make
                        it simple and accessible for everyone.
                    </p>
                </div>
            </section>

            <Features />

            <Journey />
        </div>
    );
};

export default AboutPage;
