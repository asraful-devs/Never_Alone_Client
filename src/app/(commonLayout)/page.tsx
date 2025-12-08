import Categories from '../../components/modules/Home/Categories';
import { FAQ } from '../../components/modules/Home/FAQ';
import Hero from '../../components/modules/Home/Hero';
import HowToUse from '../../components/modules/Home/HowToUse';

export default function HomePage() {
    return (
        <div className=''>
            <Hero />

            <Categories />

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
