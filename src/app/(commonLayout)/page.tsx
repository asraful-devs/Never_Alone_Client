import StatsCard from '../../components/common/StatsCard';
import Carousel from '../../components/modules/Home/Carousel';
import { FAQ } from '../../components/modules/Home/FAQ';
import Hero from '../../components/modules/Home/Hero';
import HowToUse from '../../components/modules/Home/HowToUse';
import NewEvents from '../../components/modules/Home/NewEvents';
import Review from '../../components/modules/Home/ReviewSection';
import { getCarousels } from '../../service/admin/carouselManagement';
import { getEvents } from '../../service/events/eventsManagement';

export default async function HomePage() {
    const carouselData = await getCarousels();
    const eventsData = await getEvents();
    // console.log(eventsData);

    return (
        <div className='space-y-20'>
            <Hero />

            {/* <Categories /> */}
            <NewEvents events={eventsData?.data?.data || []} />

            <Carousel items={carouselData?.data || []} />

            <HowToUse />
            <StatsCard />
            <FAQ
                heading={'Frequently Asked Questions'}
                description={
                    'Find answers to questions about joining events, hosting activities, payments, and connecting with others. Need more help? Our support team is here for you.'
                }
            />

            <Review />
        </div>
    );
}
