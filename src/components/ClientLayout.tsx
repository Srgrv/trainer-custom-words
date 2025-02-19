"use client";

import Link from "next/link";
import { Session } from "next-auth";

import { useSession } from "next-auth/react";

//icons
import { FaBars } from "react-icons/fa";

//providers
import { SessionProvider } from "next-auth/react";
import { GlobalProvider } from "@/context/GlobalContext";

//components
import ThemeToggle from "@/components/ThemeToggle";
import LogoutButton from "@/components/LogoutButton";

//shadcn
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "./ui/button";

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
    <GlobalProvider>
      <div className="bg-background text-foreground min-h-screen flex flex-col">
        <header className="bg-transparent text-foreground">
          <nav className="container mx-auto px-4 py-4">
            <ul className="flex flex-wrap justify-between items-center">
              <li className="text-2xl font-bold hover:text-secondary transition-colors cursor-pointer">
                <Link href="/">WordMaster</Link>
              </li>

              {/* Для мобильных устройств */}
              <li className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="focus:outline-none">
                      <FaBars className="w-6 h-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 mt-2 fixed right-0 top-0 transform translate-x-4 translate-y-2">
                    {/* Если нет сессии на мобильных устройствах */}
                    {!session ? (
                      <>
                        <DropdownMenuItem>
                          <Link href="/login">Вход</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/register">Регистрация</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ThemeToggle />
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem>
                          <Link href="/words">Слова</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/train">Тренировка</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ThemeToggle />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <LogoutButton />
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>

              {/* Для десктопных устройств */}
              <li className="hidden md:flex space-x-6 items-center">
                {/* Если нет сессии на десктопе */}
                {!session ? (
                  <>
                    <ThemeToggle />
                    <Link
                      href="/login"
                      className="hover:text-secondary transition-colors"
                    >
                      Вход
                    </Link>
                    <Link
                      href="/register"
                      className="hover:text-secondary transition-colors"
                    >
                      Регистрация
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/words"
                      className="hover:text-secondary transition-colors"
                    >
                      Слова
                    </Link>
                    <Link
                      href="/train"
                      className="hover:text-secondary transition-colors"
                    >
                      Тренировка
                    </Link>
                    <ThemeToggle />
                    <LogoutButton />
                  </>
                )}
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
    </GlobalProvider>
  );
}
