"use client";

type TProps = {
  toggleTheme: () => void;
};

function ThemeToggle({ toggleTheme }: TProps) {
  return (
    <span
      onClick={toggleTheme}
      className="cursor-pointer md:hover:text-[#be4d4b] transition-colors"
    >
      {localStorage.getItem("theme") === "light"
        ? "Темная тема"
        : "Светлая тема"}
    </span>
  );
}

export default ThemeToggle;
