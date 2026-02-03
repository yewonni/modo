import "./globals.css";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import AuthInitializer from "./components/common/AuthInitializer";
import HeaderWrapper from "./components/common/HeaderWrapper";
import AuthProvider from "./components/common/AuthProvider";
import LikeFetcher from "./components/common/LikeFetcher";
import { getHeaderCategories } from "./lib/getHeaderCategories";
import ConfirmModal from "./components/common/ConfirmModal";

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
        <AuthProvider>
          <AuthInitializer />
          <HeaderWrapper categories={categories} />
          <LikeFetcher />

          {children}

          <ConfirmModal />
          <Toaster />
        </AuthProvider>

        <Toaster />
      </body>
    </html>
  );
}
