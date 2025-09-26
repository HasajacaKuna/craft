'use client'

// Duże kafelki "Dla niego / Dla niej" jako osobny komponent
// Użycie: <GenderTiles /> albo <GenderTiles left={{...}} right={{...}} />

import React from 'react'

type Tile = {
  href: string
  title: string
  subtitle?: string
  image: string
  alt?: string
}

export default function GenderTiles({
  left = {
    href: '/sklep?dla=niego',
    title: 'DLA NIEGO',
    subtitle: 'do jeansów',
    image: '/images/man.jpg',
    alt: 'Paski dla niego – do jeansów',
  },
  right = {
    href: '/sklep?dla=niej',
    title: 'DLA NIEJ',
    subtitle: 'ozdobne klamry',
    image: '/images/woman.jpg',
    alt: 'Paski dla niej – ozdobne klamry',
  },
}: {
  left?: Tile
  right?: Tile
}) {
  return (
    <section className="py-2 md:py-2">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2">
          <TileCard tile={left} />
          <TileCard tile={right} />
        </div>
      </div>
    </section>
  )
}

function TileCard({ tile }: { tile: Tile }) {
  return (
    <a href={tile.href} className="group relative overflow-hidden rounded-3xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tile.image}
        alt={tile.alt || tile.title}
        className="aspect-[16/10] md:aspect-[2/2] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0 grid place-items-center p-6 text-center">
        <div className="text-white">
          <div className="text-3xl font-extrabold tracking-[0.08em] md:text-5xl">
            {tile.title}
          </div>
          {tile.subtitle ? (
            <div className="mt-2 text-base opacity-90 md:text-lg">{tile.subtitle}</div>
          ) : null}
        </div>
      </div>
    </a>
  )
}
