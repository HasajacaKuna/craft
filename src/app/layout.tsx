import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import { Nunito } from 'next/font/google'

// 400/600/700 wystarczą na start; 'latin-ext' = polskie znaki
const nunito = Nunito({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Twoja Marka — Strona wizytówka + Sklep',
  description: 'Nowoczesna strona wizytówka z wbudowanym sklepem na Next.js'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      {/* dodaj zmienną fontu i zostaw tailwindowe "font-sans" */}
      <body className={`${nunito.variable} font-sans`}>
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between">
            <div className="font-semibold">Nazwa</div>
            <nav className="flex gap-6 text-sm">
              <Link href="/" className="hover:underline">xxx</Link>
              <Link href="/sklep" className="hover:underline">Sklep</Link>
              <Link href="/kontakt" className="hover:underline">Kontakt</Link>
            </nav>
          </div>
        </header>
        <main className="container py-10">{children}</main>
        <footer className="border-t">
          <div className="container py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} Craft Symphony - leather & wood. Wszelkie prawa zastrzeżone.
          </div>
        </footer>
      </body>
    </html>
  )
}
