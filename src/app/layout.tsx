import type { Metadata } from "next";
import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "WordMaster - Тренажер английских слов",
  description: "Изучайте английские слова эффективно и весело",
};

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout session={session}>{children}</ClientLayout>
      </body>
    </html>
  );
}
