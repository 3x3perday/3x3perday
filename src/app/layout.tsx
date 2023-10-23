import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeadMeta from "@/components/HeadMeta";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "3X3 PER DAY",
  description: "매일 3가지의 성취를 경험하세요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <HeadMeta />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
