import Link from 'next/link'
import Image from 'next/image'

export default function Hero({
  title,
  tagline,           // nowy: mniejszy podtytuł pod kreską
  subtitle,
  ctaShop,
}: {
  title: string
  tagline?: string
  subtitle: string
  ctaShop: string
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="container grid gap-6 py-16 md:grid-cols-2 md:gap-10 md:py-20">
        {/* Lewa kolumna: tekst */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>

          {tagline ? (
            <>
              <div className="mt-3 h-[2px] w-16 bg-gray-300" />
              <div className="mt-3 text-xs uppercase tracking-[0.28em] text-gray-500 md:text-sm">
                {tagline}
              </div>
            </>
          ) : null}

          <p className="mt-4 text-lg text-gray-600">{subtitle}</p>

          <div className="mt-8">
            <Link
              href="/sklep"
              className="inline-flex items-center rounded-xl bg-black px-5 py-3 text-white hover:bg-gray-800"
            >
              {ctaShop}
            </Link>
          </div>
        </div>

        {/* Prawa kolumna: logo */}
        <div className="relative">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border bg-white">
            <Image
              src="/images/logoBig.png"
              alt="Craft Symphony — logo"
              fill
              className="object-contain p-6"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
