"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
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

  const pathName = usePathname();

  const isActive = (path: string) => {
    return pathName === path;
  };

  return (
    <GlobalProvider>
      <div className="bg-dark-gradient text-foreground min-h-screen  flex flex-col">
        <header className=" border-b-2 border-red-600">
          <nav className="container mx-auto px-4 py-4 ">
            <ul className="flex flex-wrap justify-between items-center">
              <li className="text-2xl font-bold  md:dark:hover:text-[#be4d4b] transition-colors cursor-pointer">
                <Link href="/">WordMaster</Link>
              </li>

              {/* Для мобильных устройств */}
              <li className="md:hidden ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="focus:outline-none  ">
                      <FaBars className="w-6 h-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 mt-2 fixed right-0 top-0 transform translate-x-4 translate-y-2">
                    {/* Если нет сессии на мобильных устройствах */}
                    {!session ? (
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/"
                            className={`cursor-pointer ${
                              isActive("/") ? "text-red-400" : ""
                            }`}
                          >
                            Главная
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/login"
                            className={`cursor-pointer ${
                              isActive("/login") ? "text-red-400" : ""
                            }`}
                          >
                            Вход
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link
                            href="/register"
                            className={`cursor-pointer ${
                              isActive("/register") ? "text-red-400" : ""
                            }`}
                          >
                            Регистрация
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ThemeToggle />
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/"
                            className={`cursor-pointer ${
                              isActive("/") ? "text-red-400" : ""
                            }`}
                          >
                            Главная
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/words"
                            className={`cursor-pointer ${
                              isActive("/words") ? "text-red-400" : ""
                            }`}
                          >
                            Слова
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/train"
                            className={`cursor-pointer ${
                              isActive("/train") ? "text-red-400" : ""
                            }`}
                          >
                            Тренировка
                          </Link>
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
                      className={`md:dark:hover:text-[#be4d4b] ${
                        isActive("/login") ? "text-red-400" : ""
                      }`}
                    >
                      Вход
                    </Link>
                    <Link
                      href="/register"
                      className={`md:dark:hover:text-[#be4d4b] ${
                        isActive("/register") ? "text-red-400" : ""
                      }`}
                    >
                      Регистрация
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/words"
                      className={`md:dark:hover:text-[#be4d4b] ${
                        isActive("/words") ? "text-red-400" : ""
                      }`}
                    >
                      Слова
                    </Link>
                    <Link
                      href="/train"
                      className={`md:dark:hover:text-[#be4d4b] ${
                        isActive("/train") ? "text-red-400" : ""
                      }`}
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
        <footer className="bg-black text-white text-center py-4">
          <p>&copy; 2025 WordMaster. Сергей Георгиев</p>
        </footer>
      </div>
      <Toaster />
    </GlobalProvider>
  );
}
