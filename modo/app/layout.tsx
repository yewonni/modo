import "./globals.css";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import ConditionalBottomNav from "@/components/ConditionalBottomNav";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased pb-16 md:pb-0`}>
        <AuthProvider>
          {children}
          <ConditionalBottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
