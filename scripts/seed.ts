import { dbConnect } from '../src/lib/mongodb'
import { Product } from '../src/models/Product'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const data = [
  // KATEGORIA 1
  { title: 'Chianti Classico DOCG 2020', price: 59, image: 'https://placehold.co/600x600?text=Chianti', category: 'kategoria-1' },
  { title: 'Barolo DOCG 2018',          price: 159, image: 'https://placehold.co/600x600?text=Barolo',  category: 'kategoria-1' },
  { title: 'Brunello di Montalcino 2017', price: 219, image: 'https://placehold.co/600x600?text=Brunello', category: 'kategoria-1' },
  { title: 'Montepulciano d’Abruzzo 2021', price: 49, image: 'https://placehold.co/600x600?text=Montepulciano', category: 'kategoria-1' },

  // KATEGORIA 2
  { title: 'Pinot Grigio delle Venezie 2022', price: 39, image: 'https://placehold.co/600x600?text=Pinot+Grigio', category: 'kategoria-2' },
  { title: 'Prosecco Superiore DOCG Extra Dry', price: 55, image: 'https://placehold.co/600x600?text=Prosecco', category: 'kategoria-2' },
  { title: 'Soave Classico 2021', price: 44, image: 'https://placehold.co/600x600?text=Soave', category: 'kategoria-2' },
  { title: 'Verdicchio dei Castelli di Jesi 2021', price: 46, image: 'https://placehold.co/600x600?text=Verdicchio', category: 'kategoria-2' },

  // KATEGORIA 3
  { title: 'Amarone della Valpolicella 2017', price: 249, image: 'https://placehold.co/600x600?text=Amarone', category: 'kategoria-3' },
  { title: 'Nero d’Avola Sicilia 2020', price: 52, image: 'https://placehold.co/600x600?text=Nero+d%27Avola', category: 'kategoria-3' },
  { title: 'Lambrusco di Sorbara', price: 35, image: 'https://placehold.co/600x600?text=Lambrusco', category: 'kategoria-3' },
  { title: 'Franciacorta Brut NV', price: 129, image: 'https://placehold.co/600x600?text=Franciacorta', category: 'kategoria-3' }
]

async function run() {
  await dbConnect()
  for (const p of data) {
    const doc = { ...p, slug: slugify(p.title), active: true }
    await Product.updateOne({ slug: doc.slug }, { $setOnInsert: doc }, { upsert: true })
  }
  const total = await Product.countDocuments()
  console.log('Zasiano. Liczba produktów w kolekcji:', total)
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
