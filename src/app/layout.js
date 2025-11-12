import './globals.css';
import ThemeToggle from '../components/ThemeToggle';

export const metadata = {
  title: "Kalkulator Tabel Kebenaran",
  description: "Dibuat oleh Rifani Husni Mubarok 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 min-h-screen text-gray-900 dark:text-gray-100 relative">
        <ThemeToggle />
        <main className="max-w-3xl mx-auto py-10 px-4">{children}</main>
      </body>
    </html>
  );
}
