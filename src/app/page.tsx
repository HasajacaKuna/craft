'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState, useEffect, useCallback } from 'react'
import Hero from './components/Hero'
import Section from './components/Section'
import GenderTiles from './components/GenderTiles'
import LifetimeWarranty from './components/LifetimeWarranty'
import WhatsAppContact from './components/WhatsAppContact'
import { categories } from '@/data/categories'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// === Typy (TS) ===
export type Product = {
  _id: string
  slug?: string
  title: string
  price: number | string
  image?: string
}

type Category = {
  products: Product[]
  // w razie potrzeby dodaj: name?: string; slug?: string; etc.
}

// Duży kafelek: zdjęcie + NAZWA + CENA
function BigTileCard({ product }: { product: Product }) {
  const pricePLN = useMemo(() => {
    const n = typeof product.price === 'number' ? product.price : Number(product.price ?? 0)
    const safe = Number.isFinite(n) ? n : 0
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(safe)
  }, [product.price])

  const title = product.title

  return (
    <Link href={`/produkt/${product.slug || product._id}`} className="group block">
      <div className="overflow-hidden rounded-3xl bg-gray-100 shadow-sm dark:bg-gray-800">
        {product.image ? (
          <div className="relative aspect-[3/4] md:aspect-[4/5]">
            <Image
              src={product.image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="aspect-[3/4] md:aspect-[4/5] flex items-center justify-center text-sm text-gray-500">
            Brak zdjęcia
          </div>
        )}
      </div>
      <div className="mt-3 text-center">
        <div className="text-sm font-semibold md:text-base">{title}</div>
        <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">{pricePLN}</div>
      </div>
    </Link>
  )
}

// Karuzela: 4 kafelki widoczne (RWD 1/2/3/4), do 12 elementów, bez białych fade'ów po bokach
function ProductCarousel({
  title = 'Wybierz coś dla siebie',
  products = [] as Product[],
}: {
  title?: string
  products?: Product[]
}) {
  const MAX_ITEMS = 12
  const items = products.slice(0, MAX_ITEMS)

  const [perView, setPerView] = useState<number>(4)
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      if (w < 640) setPerView(1)
      else if (w < 1024) setPerView(2)
      else if (w < 1280) setPerView(3)
      else setPerView(4)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const pages = useMemo(() => {
    const out: Product[][] = []
    if (items.length === 0 || perView <= 0) return out
    for (let i = 0; i < items.length; i += perView) out.push(items.slice(i, i + perView))
    return out
  }, [items, perView])

  const [page, setPage] = useState(0)
  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(0, pages.length - 1)))
  }, [pages.length])

  const prev = useCallback(() => setPage((p) => Math.max(0, p - 1)), [])
  const next = useCallback(() => setPage((p) => Math.min(pages.length - 1, p + 1)), [pages.length])

  const denom = Math.max(1, pages.length)

  return (
    <Section id="produkty" title="">
      {/* Wycentrowany nagłówek sekcji */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
        <div className="mx-auto mt-3 h-[2px] w-16 bg-gray-300" />
        <div className="mt-3 text-xs uppercase tracking-[0.28em] text-gray-500">
          RĘCZNIE ROBIONE PASKI
        </div>
      </div>

      {items.length ? (
        <div className="relative">
          {/* Tor slajdów */}
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500"
              style={{ width: `${pages.length * 100}%`, transform: `translateX(-${page * (100 / denom)}%)` }}
            >
              {pages.map((group, i) => (
                <div key={i} className="shrink-0" style={{ width: `${100 / denom}%` }}>
                  <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${perView}, minmax(0, 1fr))` }}>
                    {group.map((p) => (
                      <BigTileCard key={p._id} product={p} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {pages.length > 1 && (
            <>
              <button
                onClick={prev}
                disabled={page === 0}
                aria-label="Poprzednie"
                className="absolute left-3 top-1/2 z-50 -translate-y-1/2 rounded-lg shadow-md p-2 sm:p-3 text-white
                           hover:bg-black/30
                           transition-colors duration-200 cursor-pointer disabled:opacity-40"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={next}
                disabled={page >= pages.length - 1}
                aria-label="Następne"
                className="absolute right-3 top-1/2 z-50 -translate-y-1/2 rounded-lg shadow-md p-2 sm:p-3 text-white
                           hover:bg-black/30 
                           transition-colors duration-200 cursor-pointer disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4 sm:w-8 sm:h-8" />
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="mx-auto max-w-md rounded-2xl border p-6 text-center dark:border-gray-800">
          <h3 className="text-lg font-semibold">Brak produktów</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Dodaj paski, aby wyświetlić je na stronie głównej.
          </p>
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          href="/sklep"
          className="relative inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg ring-1 ring-black/10 bg-gradient-to-r from-black to-neutral-800 hover:brightness-110 active:translate-y-px"
        >
          Zobacz więcej <span aria-hidden>→</span>
        </Link>
      </div>
    </Section>
  )
}

// ————— Nowa sekcja: opis + 2 zdjęcia + przycisk —————
function WorkshopSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Tekst */}
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Nasza pracownia</h2>
            <p className="mt-6 text-gray-700 dark:text-gray-300">
              W Craft Symphony każdy pasek powstaje <span className="font-semibold">ręcznie</span> – od pierwszego cięcia, przez barwienie i
              wyoblone krawędzie, po woskowanie i polerowanie. Używamy wyłącznie skóry wysokiej jakości i zwracamy uwagę na detale,
              których nie widać na pierwszy rzut oka – właśnie one decydują o trwałości i charakterze produktu.
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              To krótkie serie i indywidualne wykończenia: dobierzesz kolor, szerokość, klamrę i długość. Rzemiosło zamiast masówki –
              tworzone z dokładnością i starannością, jakiej oczekujesz od rzeczy premium.
            </p>
            <div className="mt-8">
              <Link
                href="/sklep"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold shadow-sm transition hover:bg-black hover:text-white dark:border-gray-700"
              >
                Zobacz sklep <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Dwa zdjęcia */}
          <div className="grid grid-cols-2 gap-6">
            <div className="relative aspect-[3/4]">
              <Image
                src="/images/workshop1.jpg"
                alt="Pracownia Craft Symphony – stojak z paskami i akcesoriami"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="rounded-3xl object-cover shadow-sm"
                loading="lazy"
              />
            </div>
            <div className="relative aspect-[3/4]">
              <Image
                src="/images/workshop2.jpg"
                alt="Detal rzemiosła – klamry i narzędzia w pracowni"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="rounded-3xl object-cover shadow-sm"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const allProducts = useMemo(
    () => (categories as unknown as Category[]).flatMap((c) => c.products),
    []
  )

  return (
    <>
      {/* Górny baner */}
      <Hero
        title="Craft Symphony"
        tagline="leather & wood"
        subtitle="Wyjątkowy produkt, ręczne wykonanie z najlepszych skór i okuć. Perfekcyjne wykończenie i wieloletnia gwarancja jakości."
        ctaShop="Przejdź do sklepu"
      />
      <GenderTiles />

      {/* Duże kafelki + karuzela (4 na widok, do 12 łącznie) */}
      <ProductCarousel title="Nowości" products={allProducts} />

      {/* Opis pracowni + 2 zdjęcia */}
      <WorkshopSection />

      <LifetimeWarranty image="/images/warranty.jpg" />
      <WhatsAppContact phone="+48 500 600 700" />
    </>
  )
}
