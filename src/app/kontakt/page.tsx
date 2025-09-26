export const metadata = { title: 'Kontakt — Twoja Marka' }

export default function ContactPage() {
  return (
    <section className="py-12">
      <div className="container max-w-2xl">
        <h1 className="text-3xl font-bold">Kontakt</h1>
        <p className="mt-2 text-gray-600">Napisz do nas, a wrócimy z odpowiedzią.</p>
        <form className="mt-6 grid gap-4">
          <input className="w-full rounded-xl border px-4 py-3" placeholder="Imię i nazwisko" />
          <input className="w-full rounded-xl border px-4 py-3" type="email" placeholder="Adres e-mail" />
          <textarea className="w-full rounded-xl border px-4 py-3" rows={5} placeholder="Wiadomość" />
          <button className="rounded-xl bg-black px-5 py-3 text-white hover:bg-gray-800" type="button">
            Wyślij
          </button>
        </form>
      </div>
    </section>
  )
}
