"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = (): void => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-background text-foreground min-h-screen ">
          <header className="bg-primary text-primary-foreground">
            <nav className="container mx-auto px-4 py-4">
              <ul className="flex flex-wrap justify-between items-center">
                <li className="text-2xl font-bold hover:text-secondary transition-colors cursor-pointer">
                  WordMaster
                </li>
                <li className="flex space-x-6">
                  <span
                    onClick={toggleTheme}
                    className="cursor-pointer hover:text-secondary transition-colors"
                  >
                    Поменять тему
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
      </body>
    </html>
  );
}
