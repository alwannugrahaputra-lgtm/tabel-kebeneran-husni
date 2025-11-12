import './globals.css';

export const metadata = {
  title: "Kalkulator Tabel Kebenaran",
  description: "Dibuat oleh Rifani Husni Mubarok 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gradient-to-br from-teal-500 to-cyan-600 min-h-screen text-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
