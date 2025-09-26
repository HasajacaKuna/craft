// Nie wymaga hooków – może być server component
import { MessageCircle } from 'lucide-react'

interface Props {
  phone: string // w formacie międzynarodowym, np. +48 500 600 700
  defaultMessage?: string
  title?: string
  subtitle?: string
  note?: string
  showQr?: boolean
}

export default function WhatsAppContact({
  phone,
  defaultMessage = 'Cześć! Chcę zapytać o paski Craft Symphony.',
  title = 'Masz pytania? Napisz na WhatsApp',
  subtitle = 'Doradzimy rozmiar, klamrę i wykończenie. Szybka odpowiedź.',
  note = 'Pon–Pt 9:00–18:00 • Odpowiadamy zwykle w 15–30 min',
  showQr = false,
}: Props) {
  const digits = phone.replace(/\D/g, '')
  const waUrl = `https://wa.me/${digits}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border bg-white/70 p-8 shadow-sm backdrop-blur md:p-12 dark:border-gray-800 dark:bg-gray-900/50">
          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
            {/* Tekst + CTA */}
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">{subtitle}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg ring-1 ring-black/10 bg-gradient-to-r from-black to-neutral-800 transition hover:brightness-110 active:translate-y-px"
                >
                  <MessageCircle className="h-5 w-5" />
                  Napisz na WhatsApp
                </a>

                <a
                  href={`tel:${digits}`}
                  className="inline-flex items-center rounded-full border px-5 py-3 text-sm font-semibold transition hover:bg-black hover:text-white dark:border-gray-700"
                >
                  Zadzwoń
                </a>
              </div>

              {note ? (
                <p className="mt-4 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{note}</p>
              ) : null}
            </div>

            {/* Bok z akcentem / QR */}
            <div className="hidden justify-self-end md:block">
              {showQr ? (
                // Prosty QR przez zewnętrzny generator – jeśli nie chcesz, ustaw showQr={false}
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(waUrl)}`}
                  alt="Zeskanuj i napisz na WhatsApp"
                  className="rounded-2xl shadow-sm"
                />
              ) : (
                <div className="rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 p-6 text-emerald-900">
                  <p className="text-sm leading-relaxed">
                    Ręcznie szyte w Polsce. Skóra premium, mosiężne okucia. Jeśli masz pytanie – napisz, odpiszemy szybko.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
