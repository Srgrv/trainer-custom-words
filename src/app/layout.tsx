"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AuthProvider } from "@/components/AuthContext";
import { WordsProvider } from "@/context/WordsContexts";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkTheme]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <WordsProvider>
            <div className="bg-background text-foreground min-h-screen flex flex-col">
              <header className="bg-transparent text-foreground">
                <nav className="container mx-auto px-4 py-4">
                  <ul className="flex flex-wrap justify-between items-center">
                    <li className="text-2xl font-bold hover:text-secondary transition-colors cursor-pointer">
                      <Link href="/">WordMaster</Link>
                    </li>
                    <li className="flex space-x-6">
                      <span
                        onClick={toggleTheme}
                        className="cursor-pointer hover:text-secondary transition-colors"
                      >
                        {isDarkTheme ? "Темная тема" : "Светлая тема"}
                      </span>
                      <Link
                        href="/words"
                        className="cursor-pointer hover:text-secondary transition-colors"
                      >
                        Слова
                      </Link>
                      <Link
                        href="/train"
                        className="cursor-pointer hover:text-secondary transition-colors"
                      >
                        Тренировка
                      </Link>
                      <Link
                        href="/login"
                        className="cursor-pointer hover:text-secondary transition-colors"
                      >
                        Вход
                      </Link>
                      <Link
                        href="/register"
                        className="cursor-pointer hover:text-secondary transition-colors"
                      >
                        Регистрация
                      </Link>
                    </li>
                  </ul>
                </nav>
              </header>
              <main className="flex-grow container mx-auto px-4 py-8">
                {children}
              </main>
              <footer className="bg-primary text-primary-foreground text-center py-4">
                <p>&copy; 2025 WordMaster. Сергей Георгиев</p>
              </footer>
            </div>
          </WordsProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
