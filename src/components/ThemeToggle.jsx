"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 bg-white/70 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-xl shadow-md backdrop-blur hover:scale-105 hover:shadow-lg"
    >
      {theme === "light" ? "🌙 Gelap" : "☀️ Terang"}
    </button>
  );
}
