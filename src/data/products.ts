import { dbConnect } from '@/lib/mongodb'
import { Product } from '@/models/Product'

export async function getFeaturedProducts(limit = 6) {
  await dbConnect()
  const items = await Product.find({ active: true }).sort({ createdAt: -1 }).limit(limit).lean()
  return items.map((p: any) => ({
    _id: String(p._id),
    title: p.title,
    slug: p.slug,
    price: Number(p.price ?? 0),
    image: p.image ?? ''
  }))
}

export async function getProductsByCategory(category: string, limit = 12) {
  await dbConnect()
  const items = await Product.find({ active: true, category }).sort({ createdAt: -1 }).limit(limit).lean()
  return items.map((p: any) => ({
    _id: String(p._id),
    title: p.title,
    slug: p.slug,
    price: Number(p.price ?? 0),
    image: p.image ?? ''
  }))
}
