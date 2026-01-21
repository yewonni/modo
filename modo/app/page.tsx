"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LikeButton } from "@/components/Button";
import { CATEGORIES } from "@/constants/categories";

const PRODUCTS = [
  {
    id: 1,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
  {
    id: 2,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
  {
    id: 3,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
  {
    id: 4,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
];

const TREND_PRODUCTS = [
  {
    id: 101,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
  {
    id: 102,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
  {
    id: 103,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
  {
    id: 104,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
  {
    id: 105,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
  {
    id: 106,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
  {
    id: 107,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
  {
    id: 108,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <main className="pt-22.5 px-4 sm:px-40">
        {/* Banner */}
        <div className="-mx-4 sm:-mx-40">
          <section className="relative w-full h-75 sm:h-auto sm:aspect-16/8">
            <Image
              src="/images/banner-1.png"
              alt="banner1"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-3 sm:bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-center justify-center rounded-full bg-black/30 px-3 py-1.5 text-[11px] sm:text-sm font-semibold text-white min-w-16 sm:min-w-27.5">
              <span>1</span>
              <span className="mx-1 sm:mx-2 opacity-70">/</span>
              <span>3</span>
            </div>
          </section>
        </div>

        {/* Categories */}
        <section className="py-18 sm:py-20">
          <ul className="mx-auto max-w-65 grid grid-cols-2 gap-x-6 gap-y-10 sm:max-w-180 sm:grid-cols-4">
            {CATEGORIES.map(({ key, label, href, icon, alt }) => (
              <li key={key}>
                <Link href={href} className="flex flex-col items-center gap-4">
                  <div className="relative w-full max-w-12.5 aspect-square">
                    <Image
                      src={icon}
                      alt={alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm sm:text-base font-semibold">{label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* New Arrivals */}
        <section className="pb-24 sm:pb-34">
          <div className="relative mb-5 sm:mb-10 flex items-center justify-between sm:justify-center">
            <h3 className="text-xl sm:text-2xl font-semibold">NEW ARRIVALS</h3>
            <button className="font-medium hover:underline sm:absolute sm:right-0">
              더보기
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {PRODUCTS.map(({ id, store, name, price, image }) => (
              <li key={id}>
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                  />
                </div>
                <div className="mt-3 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <p className="cursor-pointer font-bold hover:underline text-sm sm:text-base">
                        {store}
                      </p>
                      <img src="/icons/chevron-right.svg" alt="" aria-hidden />
                    </div>
                    <LikeButton />
                  </div>
                  <p className="text-sm sm:text-base">{name}</p>
                  <p className="text-sm sm:text-base font-bold">{price}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Trend */}
        <section className="pb-24 sm:pb-34">
          <div className="relative mb-5 sm:mb-10 flex items-center justify-between sm:justify-center">
            <h3 className="text-xl sm:text-2xl font-semibold">TREND</h3>
            <button className="font-medium hover:underline sm:absolute sm:right-0">
              더보기
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {TREND_PRODUCTS.map(({ id, store, name, price, image }) => (
              <li key={id}>
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                  />
                </div>
                <div className="mt-3 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="cursor-pointer font-bold hover:underline text-sm sm:text-base">
                        {store}
                      </p>
                      <img src="/icons/chevron-right.svg" alt="" aria-hidden />
                    </div>
                    <LikeButton />
                  </div>
                  <p className="text-sm sm:text-base">{name}</p>
                  <p className="text-sm sm:text-base font-bold">{price}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Promotional Images */}
        <div className="-mx-4 sm:-mx-40 mb-8 sm:mb-34">
          <section className="relative w-full aspect-video sm:aspect-16/8">
            <Image
              src="/images/lighting-bg.png"
              alt=""
              fill
              className="object-cover object-[center_45%]"
            />
            <div className="absolute bottom-10 left-6 sm:bottom-47 sm:left-20 flex flex-col text-white">
              <p className="text-xs sm:text-2xl">부드러운 빛, 공간의 분위기</p>
              <div className="mt-3 sm:mt-6 text-lg sm:text-[48px] font-bold leading-tight">
                <p>MODO 조명 시리즈로</p>
                <p>일상의 리듬을 바꾸는 시간</p>
              </div>
            </div>
            <div className="absolute bottom-10 right-10 sm:bottom-16 sm:right-20 flex items-center gap-2 cursor-pointer text-white transition-all duration-300 hover:gap-3 hover:opacity-80">
              <p className="font-medium text-xs sm:text-xl">조명 보러가기</p>
              <img
                src="/icons/arrow-right.svg"
                alt=""
                className="w-4 h-4 sm:w-7 sm:h-7"
              />
            </div>
          </section>
        </div>

        <div className="-mx-4 sm:-mx-40 mb-8 sm:mb-34">
          <section className="relative w-full aspect-video sm:aspect-16/8">
            <Image
              src="/images/textile-bg.png"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute bottom-10 left-6 text-left sm:top-20 sm:right-20 sm:bottom-auto sm:left-auto sm:text-right text-white">
              <p className="text-xs sm:text-2xl">손끝에 닿는 촉감</p>
              <div className="mt-3 sm:mt-6 text-lg sm:text-[44px] font-bold leading-tight mb-10">
                <p>러그와 쿠션, 블랭킷으로</p>
                <p>편안함을 더하는 집</p>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 sm:bottom-16 sm:left-20 flex items-center gap-2 cursor-pointer text-white transition-all duration-300 hover:gap-3 hover:opacity-80">
              <p className="font-medium text-xs sm:text-xl">패브릭 보러가기</p>
              <img
                src="/icons/arrow-right.svg"
                alt=""
                className="w-4 h-4 sm:w-7 sm:h-7"
              />
            </div>
          </section>
        </div>

        <div className="-mx-4 sm:-mx-40 mb-8 sm:mb-34">
          <section className="relative w-full aspect-video sm:aspect-16/8">
            <Image
              src="/images/furniture-bg.png"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute bottom-10 left-6 sm:bottom-47 sm:left-20 flex flex-col text-white">
              <div className="flex flex-col text-lg sm:text-[48px] font-bold mt-6">
                <p>공간의 중심 속</p>
                <p>오래 머물고 싶은 분위기</p>
              </div>
            </div>
            <div className="absolute bottom-10 right-10 sm:bottom-16 sm:right-20 flex items-center gap-2 cursor-pointer text-white transition-all duration-300 hover:gap-3 hover:opacity-80">
              <p className="font-medium text-xs sm:text-xl">가구 보러가기</p>
              <img
                src="/icons/arrow-right.svg"
                alt=""
                className="w-4 h-4 sm:w-7 sm:h-7"
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
