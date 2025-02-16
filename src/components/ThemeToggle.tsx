"use client";

import { useState, useEffect } from "react";

import React from "react";

function ThemeToggle() {
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
    <span
      onClick={toggleTheme}
      className="cursor-pointer hover:text-secondary transition-colors"
    >
      {isDarkTheme ? "Темная тема" : "Светлая тема"}
    </span>
  );
}

export default ThemeToggle;
