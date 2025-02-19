"use client";

import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";

import { useSession } from "next-auth/react";

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>("light");
  const { data: session } = useSession();

  useEffect(() => {
    // Загружаем текущую тему при монтировании компонента
    const fetchTheme = async () => {
      if (!session) return;

      try {
        const response = await fetch("/api/theme", { method: "GET" });
        if (response.ok) {
          const themeData = await response.json();
          setTheme(themeData.theme); // Сохраняем тему из базы
        }
      } catch (error) {
        console.error("Error fetching theme:", error);
      }
    };

    fetchTheme();
  }, [session]);

  const updateTheme = async (newTheme: string) => {
    if (!session) return;

    try {
      const response = await fetch("/api/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: newTheme }),
      });
      if (response.ok) {
        setTheme(newTheme);
      } else {
        console.error("Error updating theme:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
