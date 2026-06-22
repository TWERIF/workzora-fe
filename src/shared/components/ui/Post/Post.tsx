import { TFunction } from 'i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';

interface PostProps {
    imageSrc: string;
    title: string;
    description: string;
    readTime: string;
}

const Post = ({ imageSrc, title, description, readTime }: PostProps) => {
    return (
        <div className="flex flex-col gap-4 max-w-[433px]">
            <div className="relative w-[433px] h-[273px] overflow-hidden rounded-[20px]">
                <Image
                    src={`/images/${imageSrc}`}
                    alt={title}
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-[18px] leading-[26px] text-text dark:text-text-dark">
                    {title}
                </h3>
                {/* Опис у темній темі робимо злегка приглушеним (text-text-muted) */}
                <p className="font-normal text-[16px] leading-[26px] text-text dark:text-text-muted">
                    {description}
                </p>
                <span className="font-normal text-[16px] leading-[26px] text-success">
                    {readTime}
                </span>
            </div>
        </div>
    );
};

export default function PostsList({ t }: { t: TFunction<"common", undefined> }) {
    const posts = [
        { id: 1, imageSrc: "post1.png" },
        { id: 2, imageSrc: "post2.png" },
        { id: 3, imageSrc: "post3.png" }
    ];

    return (
        <div className="w-full py-10 px-4">
            <style jsx global>{`
                /* Стилі для пагінації Swiper беруть вашsuccess колір */
                .swiper-pagination-bullet-active {
                    background: #7EA310 !important;
                }
            `}</style>
            
            <Swiper
                modules={[Pagination]}
                spaceBetween={32}
                slidesPerView={1}
                pagination={{ clickable: true }}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="max-w-[1400px] !pb-12"
            >
                {posts.map((post, index) => (
                    <SwiperSlide key={post.id} className="flex justify-center">
                        <Post
                            imageSrc={post.imageSrc}
                            title={t(`posts.${index}.title`)}
                            description={t(`posts.${index}.description`)}
                            readTime={t(`posts.${index}.readTime`)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}