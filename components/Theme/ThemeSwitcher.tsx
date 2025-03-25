"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react"; // Using ShadCN icons

export default function ThemeToggle({myClass}:{myClass:string}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={`p-2 rounded-lg border border-gray-300 dark:border-gray-700 ${myClass}`}>
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
