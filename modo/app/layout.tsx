import "./globals.css";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import HeaderWrapper from "./components/common/HeaderWrapper";
import AuthProvider from "./components/common/AuthProvider";
import LikeFetcher from "./components/common/LikeFetcher";
import { getHeaderCategories } from "./lib/getHeaderCategories";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const categories = await getHeaderCategories();

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased pb-16 md:pb-0`}>
        <HeaderWrapper categories={categories} />

        <AuthProvider>
          <LikeFetcher />
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
