"use client";
import TruthTable from "../components/TruthTable";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-500">
      <div className="bg-white/90 dark:bg-gray-900 rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center backdrop-blur-md">
        <h1 className="text-4xl font-extrabold text-teal-700 dark:text-teal-300 mb-6 animate-fade-in">
          🧠 Kalkulator Tabel Kebenaran
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Masukkan ekspresi logika untuk menghasilkan tabel kebenaran.
        </p>

        <TruthTable />

        <footer className="mt-10 text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Rifani Husni Mubarok • Dibuat dengan ❤️ dan Next.js
        </footer>
      </div>
    </div>
  );
}
