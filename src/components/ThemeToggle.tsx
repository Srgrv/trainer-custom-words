"use client";

import { useEffect } from "react";

//context
import { useGlobal } from "@/context/GlobalContext";

function ThemeToggle() {
  const { theme, setTheme } = useGlobal();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <span
      onClick={toggleTheme}
      className="cursor-pointer hover:text-secondary transition-colors"
    >
      {theme ? "Темная тема" : "Светлая тема"}
    </span>
  );
}

export default ThemeToggle;
