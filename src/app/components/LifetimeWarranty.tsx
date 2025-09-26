'use client'

import React from 'react'

type Props = {
  title?: string
  text1?: string
  text2?: string
  ctaLabel?: string
  ctaHref?: string
  image: string
  imageAlt?: string
  /** Ustaw true, aby zamienić strony: zdjęcie po prawej, treść po lewej */
  reverse?: boolean
  /** Czy rysować cienką linię nad sekcją */
  withDivider?: boolean
}

export default function LifetimeWarranty({
  title = 'Dożywotnia gwarancja',
  text1 =
    'Stawiamy wszystko na jakość. Każdy pasek szyjemy ręcznie z najlepszych skór licowych — wolno garbowanych, o gęstym włóknie. Zwracamy uwagę na detale: krawędzie są wyoblone, barwione i woskowane, a szwy prowadzone gęsto i równo.',
  text2 =
    'Używamy okuć z litego mosiądzu lub stali nierdzewnej. Dzięki temu paski przechodzą próbę czasu: nie pękają, nie rozwarstwiają się i pięknie się starzeją. Dlatego udzielamy dożywotniej gwarancji na wykonanie.',
  ctaLabel = 'NA SERIO — SPRAWDŹ',
  ctaHref = '/gwarancja',
  image,
  imageAlt = 'Rzemiosło i najwyższa jakość materiałów — Craft Symphony',
  reverse = false,
  withDivider = true,
}: Props) {
  return (
    <section className={`${withDivider ? '' : ''} py-14 md:py-20`}>
      <div className="container">
        <div className={`grid items-center gap-10 md:grid-cols-2 ${reverse ? 'md:[&>div:first-child]:order-2' : ''}`}>
          {/* Zdjęcie */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt}
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-sm"
              loading="lazy"
            />
          </div>

          {/* Tekst */}
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
            <p className="mt-6 text-gray-700 dark:text-gray-300">{text1}</p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">{text2}</p>
            <div className="mt-8">
              <a
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-semibold uppercase tracking-wider shadow-sm transition hover:bg-black hover:text-white dark:border-gray-700"
              >
                {ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
