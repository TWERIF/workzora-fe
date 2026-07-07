import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { Post } from "@/features/posts/model/types";
import { TFunction } from "next-i18next";
import "swiper/css";
import "swiper/css/pagination";


interface PostProps {
    t: TFunction;
    imageSrc: string;
    title: string;
    description: string;
    minutesToRead: number;
}

const Post = ({
    t,
    imageSrc,
    title,
    description,
    minutesToRead,
}: PostProps) => {
    return (
        <div className="flex flex-col gap-4 max-w-[433px]">
            <div className="relative w-[433px] h-[273px] overflow-hidden rounded-[20px]">
                <Image
                    src={imageSrc}
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

                <div className="font-normal text-[16px] leading-[26px] text-text dark:text-text-muted" dangerouslySetInnerHTML={{ __html: description }} />

                <span className="font-normal text-[16px] leading-[26px] text-success">
                    {minutesToRead} {t("minutes")}
                </span>
            </div>
        </div>
    );
};

interface PostsListProps {
    t: TFunction;
    posts: Post[];
}

export default function PostsList({ t, posts }: PostsListProps) {
    return (
        <div className="w-full py-10 px-4">
            <style jsx global>{`
                .swiper-pagination-bullet-active {
                    background: #7ea310 !important;
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
                {posts.map((post) => (
                    <SwiperSlide
                        key={post.id}
                        className="flex justify-center"
                    >
                        <Post
                            t={t}
                            imageSrc={post.imageUrl}
                            title={post.title}
                            description={post.teaser}
                            minutesToRead={post.minutesToRead}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}