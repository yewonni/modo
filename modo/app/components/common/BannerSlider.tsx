"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import Image from "next/image";

const banners = [
  {
    image: "/images/banner-1.png",
    sub: "MODO CURATION",
    title: ["일상을 위한", "라이프스타일 셀렉션"],
  },
  {
    image: "/images/banner-2.png",
    sub: "LIGHTING",
    title: ["기본에 충실한", "가구 라인업"],
  },
  {
    image: "/images/banner-3.png",
    sub: "FURNITURE",
    title: ["공간에 딱 맞는", "MODO 조명 컬렉션"],
  },
];

export default function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="-mx-4 sm:-mx-40">
      <section className="relative w-full h-85 sm:h-auto sm:aspect-16/8">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop
          onSlideChange={(swiper: any) => setCurrentIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {banners.map((banner, idx) => (
            <SwiperSlide key={idx} className="relative w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={banner.image}
                  alt={`banner-${idx + 1}`}
                  fill
                  priority={idx === 0}
                  className="object-cover object-top-left"
                />
                <div className="absolute left-[10%] sm:left-[11%] bottom-10 sm:bottom-45 text-white">
                  <p className="text-xs sm:text-sm tracking-widest opacity-80 mb-2">
                    {banner.sub}
                  </p>
                  <div className="text-lg sm:text-[44px] font-semibold leading-tight">
                    {banner.title.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-3 sm:bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-center justify-center rounded-full bg-black/30 px-3 py-1.5 text-[11px] sm:text-sm font-semibold text-white min-w-16 sm:min-w-27.5">
          <span>{currentIndex + 1}</span>
          <span className="mx-1 sm:mx-2 opacity-70">/</span>
          <span>{banners.length}</span>
        </div>
      </section>
    </div>
  );
}
