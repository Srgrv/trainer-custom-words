"use client";

import { AuthProvider } from "@/components/AuthContext";
import { WordsProvider } from "@/context/WordsContexts";
import { Toaster } from "@/components/ui/toaster";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import { useSession } from "next-auth/react";

interface ClientLayoutProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function ClientLayout({ children, session }: ClientLayoutProps) {
  return (
    <SessionProvider session={session}>
      <LayoutWithSession>{children}</LayoutWithSession>
      <Toaster />
    </SessionProvider>
  );
}

export function LayoutWithSession({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();

  return (
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
                  {session ? (
                    <>
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
                      <LogoutButton />
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                  <ThemeToggle />
                </li>
              </ul>
            </nav>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
            {children}
          </main>
          <footer className="bg-primary text-primary-foreground text-center py-4">
            <p>&copy; 2025 WordMaster. Сергей Георгиев</p>
          </footer>
        </div>
        <Toaster />
      </WordsProvider>
    </AuthProvider>
  );
}
