"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Banner {
  image: string;
  subtitle: string;
  title: string[];
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
              <Image src={banner.image} alt="" fill className="object-cover" />
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
    </>
  );
}
