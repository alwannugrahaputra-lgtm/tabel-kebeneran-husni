import './globals.css'

export const metadata = {
  title: "Kalkulator Tabel Kebenaran",
  description: "Dibuat oleh Rifani Husni Mubarok 2025",
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="dark">
      <body>{children}</body>
    </html>
  )
}
