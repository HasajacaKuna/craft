type Props = { id?: string; eyebrow?: string; title: string; lead?: string; children?: React.ReactNode }
export default function Section({ id, eyebrow, title, lead, children }: Props) {
  return (
    <section id={id} className="py-2 md:py-8">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow && <span className="text-xs uppercase tracking-widest text-gray-500">{eyebrow}</span>}
          <h2 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
          {lead && <p className="mt-4 text-lg text-gray-600">{lead}</p>}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}
