"use client";

import Link from "next/link";

const SOCIALS = [
  {
    src: "/icons/insta.svg",
    alt: "인스타그램",
    href: "https://www.instagram.com",
  },
  {
    src: "/icons/facebook.svg",
    alt: "페이스북",
    href: "https://www.facebook.com",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#111111] w-full py-12 px-4 sm:px-20 md:px-40 flex flex-col gap-12 md:gap-20">
      <address className="flex flex-col gap-3 not-italic text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-7">
          <p className="text-3xl font-semibold">고객센터</p>
          <p className="text-2xl mt-1 sm:mt-0">
            <a href="tel:12345678">1234 - 5678</a>
          </p>
        </div>
        <p className="text-gray-300 text-sm sm:text-base">
          평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00 제외)
        </p>
      </address>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <p className="text-gray-300 text-sm sm:text-base">
          <a
            href="mailto:support@modo-living.com"
            className="hover:underline mr-5"
          >
            support@modo-living.com
          </a>
          <Link href="/privacy" className="hover:underline">
            개인정보처리방침
          </Link>
          <Link href="/terms" className="hover:underline">
            이용약관
          </Link>
        </p>

        <div className="flex gap-4 mt-2 sm:mt-0">
          {SOCIALS.map((social) => (
            <a
              href={social.href}
              key={social.alt}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={social.src} alt={social.alt} className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
