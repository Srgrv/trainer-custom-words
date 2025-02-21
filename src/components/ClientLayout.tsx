"use client";

// shadcn
import { Toaster } from "@/components/ui/toaster";

// componenets
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type TProps = {
  session: Session | null;
  children: React.ReactNode;
};

export default function ClientLayoutProps({ session, children }: TProps) {
  const [isLoading, setIsLoading] = useState(true);

  const updateTheme = (newTheme: string) => {
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (session) {
      fetch("/api/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: newTheme }),
      }).catch((error) =>
        console.error("Ошибка при обновлении темы на сервере:", error)
      );
    }
  };

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    updateTheme(newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      updateTheme(savedTheme);
    } else {
      updateTheme("light");
    }

    setIsLoading(false);
  }, [session, updateTheme]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  return (
    <SessionProvider session={session}>
      <div className="bg-dark-gradient text-foreground min-h-screen  flex flex-col">
        <Header toggleTheme={toggleTheme} />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
          {children}
        </main>
        <Footer />
      </div>
      <Toaster />
    </SessionProvider>
  );
}
