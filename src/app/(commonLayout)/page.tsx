import Carousel from '../../components/modules/Home/Carousel';
import { FAQ } from '../../components/modules/Home/FAQ';
import Hero from '../../components/modules/Home/Hero';
import HowToUse from '../../components/modules/Home/HowToUse';
import NewEvents from '../../components/modules/Home/NewEvents';
import { getCarousels } from '../../service/admin/carouselManagement';
import { getEvents } from '../../service/events/eventsManagement';

export default async function HomePage() {
    const carouselData = await getCarousels();
    const eventsData = await getEvents();
    console.log(eventsData);

    return (
        <div className='space-y-8'>
            <Hero />

            {/* <Categories /> */}
            <NewEvents events={eventsData?.data?.data || []} />

            <div className='m-x-4 md:mx-8 lg:mx-12 xl:mx-16 2xl:mx-24 my-8'>
                <Carousel items={carouselData?.data || []} />
            </div>

            <HowToUse />
            <FAQ
                heading={'Frequently Asked Questions'}
                description={
                    'Find answers to common questions about joining events, hosting activities, payments, and connecting with others. Need more help? Our support team is here for you.'
                }
            />
        </div>
    );
}
