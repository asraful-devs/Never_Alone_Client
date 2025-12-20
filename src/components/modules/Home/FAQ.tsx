import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

interface FaqProps {
    heading: string;
    description: string;
    items?: FaqItem[];
}

const faqItems = [
    {
        id: 'faq-1',
        question: 'How do I join an event?',
        answer: "Browse events on the Explore page, click on any event that interests you, and hit the \"Join Event\" button. If there's a joining fee, you'll complete a secure payment before your spot is confirmed. You'll receive instant confirmation via email.",
    },
    {
        id: 'faq-2',
        question: 'Can I create my own events?',
        answer: "Absolutely! Switch to a Host account from your profile settings. Once you're a host, you can create unlimited events, set participation limits, add joining fees, manage attendees, and build your reputation through ratings and reviews.",
    },
    {
        id: 'faq-3',
        question: 'Is there a fee to use the platform?',
        answer: 'Creating an account and browsing events is completely free. Some events may have joining fees set by hosts to cover venue costs, equipment, or tickets. You only pay when joining paid events through our secure payment gateway.',
    },
    {
        id: 'faq-4',
        question: 'How do I know if an event is safe to attend?',
        answer: "All hosts have public profiles displaying ratings and reviews from past participants. Check the host's rating, read feedback from previous attendees, and view their event history. We recommend meeting in public places and sharing your plans with friends.",
    },
    {
        id: 'faq-5',
        question: 'What happens if an event gets cancelled?',
        answer: 'If a host cancels an event, all participants receive immediate email notifications. Any paid joining fees are automatically refunded to your original payment method within 5-7 business days. You can also view cancellation details in your dashboard.',
    },
    {
        id: 'faq-6',
        question: 'Can I leave an event after joining?',
        answer: "Yes, you can leave an event anytime from the event details page. For paid events, refund eligibility depends on the host's cancellation policy and how far in advance you cancel. Check the event's refund policy before joining.",
    },
    {
        id: 'faq-7',
        question: 'How does the rating system work?',
        answer: 'After attending an event, you can rate your experience from 1 to 5 stars and leave a detailed review for the host. These ratings appear on host profiles and help other users make informed decisions while encouraging hosts to maintain high-quality experiences.',
    },
    {
        id: 'faq-8',
        question: 'What payment methods are accepted?',
        answer: 'We accept all major credit cards, debit cards, and popular digital payment methods through our secure payment integration. Your payment information is encrypted and processed safely. We never store your complete card details.',
    },
    {
        id: 'faq-9',
        question: 'Can I message other participants before the event?',
        answer: "Once you join an event, you can view the list of confirmed participants and visit their profiles. This helps you connect with fellow attendees, coordinate transportation, or simply get to know who you'll be meeting.",
    },
    {
        id: 'faq-10',
        question: 'How do I become a verified host?',
        answer: 'Build your hosting reputation by creating quality events and receiving positive ratings from participants. Hosts with consistently high ratings and multiple successful events earn badges that appear on their profiles, increasing trust within the community.',
    },
];

const FAQ = ({
    heading = 'Frequently asked questions',
    description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
    items = faqItems,
}: FaqProps) => {
    return (
        <section className='py-20 md:px-10 px-5 border-2 rounded-2xl border-muted/50'>
            <div className='container space-y-16'>
                <div className='mx-auto flex max-w-7xl flex-col text-left md:text-center'>
                    <h2 className='mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl'>
                        {heading}
                    </h2>
                    <p className='text-muted-foreground lg:text-lg'>
                        {description}
                    </p>
                </div>
                <Accordion
                    type='single'
                    collapsible
                    className='mx-auto w-full lg:max-w-7xl'
                >
                    {items.map((item) => (
                        <AccordionItem key={item.id} value={item.id}>
                            <AccordionTrigger className='transition-opacity duration-200 hover:no-underline hover:opacity-60'>
                                <div className='font-medium sm:py-1 lg:py-2 lg:text-lg'>
                                    {item.question}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className='sm:mb-1 lg:mb-2'>
                                <div className='text-muted-foreground lg:text-lg'>
                                    {item.answer}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export { FAQ };
