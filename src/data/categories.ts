export type ProductUI = {
  _id: string
  title: string
  slug: string
  price: number
  image?: string
}
export type CategoryUI = { key: string; title: string; products: ProductUI[] }

const DEFAULT_IMG = '/images/6.jpg'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function belt(title: string, price: number, img: string): ProductUI {
  const slug = slugify(title)
  return {
    _id: `belt_${slug}`,
    title,
    slug,
    price,
    image: img || DEFAULT_IMG,
  }
}

export const categories: CategoryUI[] = [
  {
    key: 'paski',
    title: 'Paski handmade',
    products: [
      belt('Pasek Classic Black 40 mm', 170, '/images/image1.jpg'),
      belt('Pasek Classic Brown 40 mm', 170, '/images/image2.jpg'),
      belt('Pasek Honey Tan 35 mm', 160, '/images/image3.jpg'),
      belt('Pasek Espresso 40 mm', 190, '/images/image4.jpg'),
      belt('Pasek Natural Veg 30 mm', 150, '/images/image5.jpg'),
      belt('Pasek Cognac 35 mm', 180, '/images/image6.jpg'),
      belt('Pasek Dark Chocolate 40 mm', 200, '/images/image1.jpg'),
      belt('Pasek Chestnut 35 mm', 175, '/images/image2.jpg'),
      belt('Pasek Sand 30 mm', 150, '/images/image3.jpg'),
      belt('Pasek Olive 35 mm', 170, '/images/image4.jpg'),
      belt('Pasek Navy 35 mm', 175, '/images/image5.jpg'),
      belt('Pasek Burgundy 40 mm', 210, '/images/image6.jpg'),
      belt('Pasek Coal 30 mm', 160, '/images/image1.jpg'),
      belt('Pasek Caramel 35 mm', 185, '/images/image2.jpg'),
      belt('Pasek Rustic Brown 40 mm', 195, '/images/image3.jpg'),
      belt('Pasek Matte Black 30 mm', 165, '/images/image4.jpg'),
      belt('Pasek Grey 35 mm', 170, '/images/image5.jpg'),
      belt('Pasek Walnut 40 mm', 205, '/images/image6.jpg'),
      belt('Pasek Whisky 35 mm', 190, '/images/image1.jpg'),
      belt('Pasek Desert 30 mm', 155, '/images/image2.jpg'),
    ],
  },
]
