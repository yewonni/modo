"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Banner {
  image: string;
  subtitle: string;
  title: string[];
  cta: string;
  ctaLink: string;
}

interface BannerSectionProps {
  banners: Banner[];
}

export default function BannerSection({ banners }: BannerSectionProps) {
  return (
    <>
      {banners.map((banner, index) => (
        <div key={index} className="-mx-4 sm:-mx-40 mb-20 sm:mb-34">
          <section className="relative w-full aspect-4/3 sm:aspect-16/8 overflow-hidden">
            <motion.div
              initial={{ y: 28 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                priority={index === 0}
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

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-6 right-6 sm:bottom-16 sm:right-20 flex items-center gap-2 cursor-pointer text-white transition-all duration-300 hover:gap-3 hover:opacity-80"
            >
              <Link
                href={banner.ctaLink}
                className="absolute bottom-10 right-10 sm:bottom-16 sm:right-20"
              >
                <div className="flex items-center gap-2 px-3 py-1 rounded transition-all duration-300 hover:gap-3 hover:opacity-80 min-w-22.5">
                  <span className="font-medium text-xs sm:text-xl flex-none">
                    {banner.cta}
                  </span>
                  <img
                    src="/icons/arrow-right.svg"
                    alt=""
                    className="w-4 h-4 sm:w-7 sm:h-7 flex-none"
                  />
                </div>
              </Link>
            </motion.div>
          </section>
        </div>
      ))}
    </>
  );
}
