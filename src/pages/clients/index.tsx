'use client';

import TrustedBy from "@/features/main/ui/TrustedBy";
import DogImage from "@/shared/components/svg/DogImage";
import IconArrow from "@/shared/components/svg/IconArrow";
import StarIcon from "@/shared/components/svg/StarIcon";
import Breadcrumbs from "@/shared/components/ui/BreadCrumbs";
import InfoCard from "@/shared/components/ui/Card/InfoCard";
import ProfileCard from "@/shared/components/ui/Card/ProfileCard";
import Image from 'next/image';

// Використовуємо оригінальні зображення
import OBJECTS1_Image from '../../../public/images/OBJECTS (1).png';
import OBJECTS_Image from '../../../public/images/OBJECTS.png';
import DESIGN_Image from '../../../public/images/design-example.png';

export const mockClients = [
    {
        id: '1',
        name: 'TechFlow Solutions',
        role: 'Enterprise Client',
        avatar: '/images/profileIcon.png',
        rating: 5.0,
        jobsCount: 450,
        pricePerHour: 0,
        skills: ['Long-term', 'High-budget', 'Verified'],
        isVerified: true,
    },
    {
        id: '2',
        name: 'Sarah Jenkins',
        role: 'Startup Founder',
        avatar: '/images/profileIcon.png',
        rating: 4.9,
        jobsCount: 12,
        pricePerHour: 0,
        skills: ['Web Development', 'React', 'Quick Feedback'],
        isVerified: true,
    },
    {
        id: '3',
        name: 'Global Media Group',
        role: 'Regular Employer',
        avatar: '/images/profileIcon.png',
        rating: 4.7,
        jobsCount: 1240,
        pricePerHour: 0,
        skills: ['Video Editing', 'Marketing', 'Ongoing'],
        isVerified: false,
    }
];

export default function ClientsPage() {
    return (
        <div className="bg-white text-[#333] dark:bg-[#333333] dark:text-white transition-colors duration-300">

            {/* Hero Section — використовуємо той самий градієнт #7EA310 */}
            <section className="relative min-h-[600px] md:min-h-[750px] flex items-center text-white py-12">
                <div className="absolute inset-0 bg-[url('/images/bg-freelancers.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-[linear-gradient(90.2deg,_#7EA310_28.71%,_rgba(126,163,16,0.1)_79.83%)]" />

                <div className="absolute top-0 left-0 w-full z-10">
                    <div className="container mx-auto px-4 pt-6">
                        <Breadcrumbs />
                    </div>
                </div>

                <div className="relative container mx-auto px-4 flex flex-col justify-center h-full z-10">
                    <div className="max-w-[650px] flex flex-col gap-5 md:gap-6 text-center md:text-left mt-8 md:mt-12">
                        <h1 className="text-3xl sm:text-4xl md:text-[55px] leading-tight md:leading-[1.15] font-bold">
                            {" Work with the world's most reputable clients"}
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg opacity-90 leading-relaxed max-w-[520px] mx-auto md:mx-0">
                            Find reliable partners for your freelance career. We connect top talent with clients who value quality work and timely payments.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-2">
                            <button className="bg-white text-black hover:bg-gray-200 transition-colors rounded-2xl px-6 sm:px-8 py-4 font-bold w-full sm:w-auto shadow-lg">
                                Find Your Next Client
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <TrustedBy />

            <section className="py-10 lg:py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl lg:text-[55px] font-bold mb-8 lg:mb-10 text-[#333] dark:text-white leading-tight">
                        Top-rated clients on Workzora
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                        <div className="flex flex-col gap-10 lg:gap-12">
                            <div className="flex flex-col gap-6">
                                {mockClients.map((client) => (
                                    <ProfileCard profile={client} key={client.id} />
                                ))}
                            </div>

                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                <h3 className="text-xl md:text-2xl font-bold text-[#333] dark:text-white mb-3 md:mb-4">
                                    Why work with our verified clients?
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg mb-6">
                                    Every client on this list has undergone a verification process. We ensure they have a history of fair payments and clear communication.
                                </p>
                                <Image
                                    src={OBJECTS1_Image}
                                    alt="objects image"
                                    width={310}
                                    height={215}
                                    className="w-full max-w-[310px] h-auto object-contain"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-10 lg:gap-12">
                            <div className="prose prose-slate dark:prose-invert max-w-none flex flex-col gap-6">
                                <Image
                                    src={OBJECTS_Image}
                                    alt="objects image"
                                    width={650}
                                    height={270}
                                    className="w-full max-w-[650px] h-auto object-contain"
                                />
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-[#333] dark:text-white mb-3 md:mb-4">
                                        Secure Milestone Payments
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                                        Clients on Workzora use our milestone system. This means your funds are secured before you even start working.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                {mockClients.slice(0, 3).map((client, idx) => (
                                    <ProfileCard profile={client} key={`right-${idx}`} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto mt-12 lg:mt-16 flex items-center justify-center gap-2 group cursor-pointer w-fit p-2">
                        <span className="text-sm font-semibold text-[#7EA310] group-hover:underline transition-all">
                            See more active clients
                        </span>
                        <div className="transform group-hover:translate-x-1 transition-transform flex items-center">
                            <IconArrow color="#7EA310" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Rating Section — використовуємо темний фон #333333 як у фрілансерів */}
            <section className="relative container rounded-3xl bg-[#333333] text-white overflow-hidden shadow-lg mx-4 lg:mx-auto">
                <div className="px-6 py-8 md:px-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8 relative">
                    <div className="flex flex-col gap-4 z-10 text-center md:text-left relative w-full">
                        <h2 className="text-4xl md:text-5xl lg:text-[55px] font-bold max-w-[650px] leading-tight">
                            Freelancers love these clients
                        </h2>
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <StarIcon key={s} w={26} h={28} />
                                ))}
                            </div>
                            <p className="text-sm md:text-base opacity-60 tracking-wide mt-1">
                                Based on average client rating of 4.9/5 from millions of completed contracts.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Section */}
            <section className="mx-auto container px-4 mt-16 md:mt-24 flex flex-col lg:flex-row gap-12 lg:gap-16">
                <div className="flex-1">
                    <h2 className="text-3xl md:text-[40px] font-bold leading-tight text-black dark:text-white transition-colors">
                        Build Long-Term Relationships with <span className="text-[#7EA310]">Premium Clients</span>
                    </h2>

                    <div className="flex flex-col gap-5 py-8 md:py-12 text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg transition-colors">
                        <div>Finding the right client is just as important as having the right skills. A good client provides clear requirements, respects your time, and pays promptly.</div>

                        <h3 className="text-black dark:text-white font-bold text-xl mt-4">What makes a great client?</h3>
                        <ul className="list-disc ml-5 space-y-2 text-[#333] dark:text-gray-300">
                            <li>Comprehensive project briefs with clear goals;</li>
                            <li>Responsive communication and feedback loops;</li>
                            <li>Realistic budgets and deadlines;</li>
                            <li>{"Respect for the freelancer's professional expertise;"}</li>
                            <li>Consistent payment history.</li>
                        </ul>

                        <div>At Workzora, we provide you with all the data you need to vet a client before you even place a bid.</div>
                    </div>
                </div>

                <div className="flex flex-col gap-8 lg:gap-10 w-full lg:w-1/3 xl:w-[400px] shrink-0">
                    <InfoCard />
                    <InfoCard />
                    <div className="mx-auto flex items-center justify-center gap-2 group cursor-pointer w-fit p-2">
                        <span className="text-sm font-semibold text-[#7EA310] group-hover:underline transition-all">
                            Browse Categories
                        </span>
                        <div className="transform group-hover:translate-x-1 transition-transform flex items-center">
                            <IconArrow color="#7EA310" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section — використовуємо клас bg-success (#7EA310) */}
            <section className="relative bg-[#7EA310] mb-10 md:mb-20 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 py-12 md:py-16">
                    <div className="shrink-0">
                        <DogImage w={217} h={360} />
                    </div>
                    <div className="flex flex-col gap-5 text-center md:text-left items-center md:items-start max-w-xl text-white">
                        <h2 className="text-4xl md:text-5xl lg:text-[55px] leading-tight font-bold tracking-tight">
                            Ready to find <br className="hidden sm:block" />
                            your next <span className="text-black">big project</span>?
                        </h2>
                        <p className="opacity-90 text-lg">
                            Join thousands of freelancers who have found their perfect long-term partners.
                        </p>
                        <button className="bg-white text-black hover:bg-gray-200 transition-colors rounded-2xl px-6 sm:px-8 py-4 font-bold w-full sm:w-auto shadow-lg mt-2">
                            Start Searching Now
                        </button>
                    </div>
                </div>
            </section>

            <section className="mx-auto container px-4 pt-10 md:pt-16 mb-16 md:mb-24">
                <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight mb-8 text-[#333] dark:text-white transition-colors">
                    Top projects from our clients
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col bg-white dark:bg-[#222222]">
                            <div className="relative w-full h-[200px] overflow-hidden shrink-0">
                                <Image src={DESIGN_Image} alt="design example" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="p-4 flex flex-col justify-between grow gap-2">
                                <h3 className="text-lg font-semibold text-[#333] dark:text-white transition-colors">
                                    Enterprise Web Design
                                </h3>
                                <div className="text-[#7EA310] mt-auto font-medium">Budget: $2000+</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}