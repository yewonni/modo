"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LikeButton } from "@/components/Button";
import { CATEGORIES } from "@/constants/categories";
import BannerSlider from "@/components/BannerSlider";

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
        <BannerSlider />

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
            <Link
              href="/products/new"
              className="font-medium hover:underline sm:absolute sm:right-0"
            >
              더보기
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {PRODUCTS.map(({ id, store, name, price, image }) => (
              <li key={id}>
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="mt-3 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <p className="font-bold">{store}</p>
                    <LikeButton />
                  </div>
                  <p>{name}</p>
                  <p className="font-bold">{price}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Trend */}
        <section className="pb-24 sm:pb-34">
          <div className="relative mb-5 sm:mb-10 flex items-center justify-between sm:justify-center">
            <h3 className="text-xl sm:text-2xl font-semibold">TREND</h3>
            <Link
              href="/products/trend"
              className="font-medium hover:underline sm:absolute sm:right-0"
            >
              더보기
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {TREND_PRODUCTS.map(({ id, store, name, price, image }) => (
              <li key={id}>
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="mt-3 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <p className="font-bold">{store}</p>
                    <LikeButton />
                  </div>
                  <p>{name}</p>
                  <p className="font-bold">{price}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Promotional Banners */}
        {[
          {
            image: "/images/lighting-bg.png",
            subtitle: "부드러운 빛, 공간의 분위기",
            title: ["MODO 조명 시리즈로", "일상의 리듬을 바꾸는 시간"],
          },
          {
            image: "/images/textile-bg.png",
            subtitle: "손끝에 닿는 촉감",
            title: ["러그와 쿠션, 블랭킷으로", "편안함을 더하는 집"],
          },
          {
            image: "/images/furniture-bg.png",
            subtitle: "",
            title: ["공간의 중심 속", "오래 머물고 싶은 분위기"],
          },
        ].map((banner, index) => (
          <div key={index} className="-mx-4 sm:-mx-40 mb-20 sm:mb-34">
            <section className="relative w-full aspect-4/3 sm:aspect-16/8 overflow-hidden">
              <motion.div
                initial={{ y: 28 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={banner.image}
                  alt=""
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  delay: 0.18,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-6 sm:bottom-10 left-6 sm:left-20 text-white"
              >
                {banner.subtitle && (
                  <p className="text-xs sm:text-2xl">{banner.subtitle}</p>
                )}
                <div className="mt-3 sm:mt-6 text-lg sm:text-[48px] font-bold leading-tight">
                  {banner.title.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </motion.div>
            </section>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}
